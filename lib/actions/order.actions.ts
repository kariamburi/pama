"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

import Bookmark from "../database/models/bookmark.model"
import Product from "../database/models/product.model"
import Order from "../database/models/order.model"
import { ObjectId } from "mongodb";
import Delivery from "../database/models/delivery.model"
import axios from "axios"
import mongoose, { Types } from "mongoose"
import { auth, clerkClient } from "@clerk/nextjs/server"
import User from "../database/models/user.model"
import SaleReversal from "../database/models/sale-reversal.model"
import AdminOrderDeletion from "../database/models/admin-order-deletion.model"

const populateAd = (query: any) => {
  return query
    .populate({ path: 'shippingId', model: Delivery, select: '_id method location areas price note' })
    .populate({
      path: 'productId',
      model: Product,
      select: `
      productName
      description
      category
      subCategory
      occasion
      material
      genderAgeGroup
      features
      color
      buyprice
      price
      discount
      stockQuantity
      tags
      trendingStatus
      featuredInDeals
      customizationOptions
      imageUrls
      fabricCareInstructions
      sku
      availability
    `
    });
};



interface CreateOrderParams {
  order: {
    productId: string;
    userId: string;
    [key: string]: any; // To accommodate additional order fields
  };
  path: string;
}

export const createOrder = async ({ order, path }: CreateOrderParams) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Define query conditions to check for existing orders
    const conditions = { $and: [{ productId: order.productId }, { userId: order.userId }, { size: order.size }] };

    // Find an existing order matching the conditions
    const existingOrder = await Order.findOne(conditions);

    // Declare variables for new order and response message
    let newOrder;
    let response = "Order already exists";

    // Create a new order or update the existing one
    if (!existingOrder) {
      newOrder = await Order.create({ ...order });
      response = "Added to Cart";
    } else {
      newOrder = await Order.findByIdAndUpdate(
        existingOrder._id,
        { ...order },
        { new: true } // Return the updated document
      );
      response = "Cart updated";
    }

    // Revalidate the path for Next.js caching
    await revalidatePath(path);

    // Return the response message
    return response;
  } catch (error) {
    // Handle errors gracefully
    handleError(error);
    throw new Error("Failed to create or update order");
  }
};

export const ProductSold = async ({ order, path }: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const qty = Number(order.qty ?? 1);
    const selectedSize = String(order.size ?? "").trim();

    if (!order.productId || !order.userId || !selectedSize) {
      throw new Error("Missing product, user, or size");
    }
    if (!Number.isInteger(qty) || qty < 1) {
      throw new Error("Invalid quantity");
    }
    if (!Number.isFinite(Number(order.price)) || Number(order.price) <= 0) {
      throw new Error("Invalid sold price");
    }

    // $elemMatch checks stock and size ON THE SAME feature entry.
    // The positional $ will decrement only the matching size.
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: order.productId,
        features: {
          $elemMatch: {
            size: selectedSize,
            stock: { $gte: qty },
          },
        },
      },
      {
        $inc: { "features.$.stock": -qty },
      },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error(
        `Insufficient stock, or size ${selectedSize} was not found`
      );
    }

    // Store exactly the same normalized size used for the stock update.
    let newOrder;
    try {
      newOrder = await Order.create({
        ...order,
        size: selectedSize,
        qty,
        price: Number(order.price),
        saleSource: "manual_product_sold",
        stockSizeVerified: true,
      });
    } catch (orderError) {
      // Best-effort compensation if order creation fails after deduction.
      // True all-or-nothing guarantees require a MongoDB transaction.
      try {
        await Product.updateOne(
          {
            _id: order.productId,
            features: { $elemMatch: { size: selectedSize } },
          },
          { $inc: { "features.$.stock": qty } }
        );
      } catch (rollbackError) {
        console.error("Stock rollback failed:", rollbackError);
      }
      throw orderError;
    }

    const updatedFeature = updatedProduct.features.find(
      (feature: { size: string; stock: number }) =>
        feature.size === selectedSize
    );

    // An invalid revalidation path should not turn a completed sale
    // into an apparent failure that someone may retry.
    try {
      revalidatePath(path);
    } catch (revalidateError) {
      console.error("Sold stock revalidation failed:", revalidateError);
    }

    return {
      ok: true,
      message: `Size ${selectedSize} sold successfully`,
      order: JSON.parse(JSON.stringify(newOrder)),
      newStock: updatedFeature?.stock ?? 0,
    };
  } catch (error) {
    console.error("ProductSold failed:", error);
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to mark size sold",
    };
  }
};

// Only manually recorded, completed sales can be reversed.
// Legacy manual sales created before the fixed stock-matching query used
// ORDER_ identifiers. Do NOT include normal website/customer orders.
function isReversibleManualSale(sale: any): boolean {
  if (!sale || sale.status !== "completed" || sale.shippingId) return false;
  // Both IDs are issued by the manual Mark Sold component, not by checkout.
  const hasManualIds =
    /^ORDER_/.test(String(sale.orderId || "")) &&
    /^ORDER_/.test(String(sale.referenceId || ""));
  return hasManualIds && (
    sale.saleSource === "manual_product_sold" || !sale.saleSource
  );
}

// SERVER-SIDE permission, not the userId passed from the browser.
// This implementation uses Clerk user -> Mongo User.clerkId and limits
// reversal to the product organizer/owner. Adapt if your app uses another
// auth provider or staff permissions model.
async function requireProductOwner(productId: string): Promise<string> {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Sign in to manage sales.");
  }

  // 1. Find the logged-in user
  const user = await User.findOne({ clerkId })
    .select("_id")
    .exec();

  if (!user) {
    throw new Error("User account was not found.");
  }

  const dbUserId = String(user._id);

  // 2. Verify that the user owns this product
  const product = await Product.findOne({
    _id: productId,
    organizer: user._id,
  })
    .select("_id")
    .exec();

  if (!product) {
    throw new Error(
      "You do not have permission to reverse sales for this product."
    );
  }

  return dbUserId;
}

export async function getReversibleManualSales({
  productId,
  size,
}: {
  productId: string;
  size: string;
}) {
  try {
    if (!Types.ObjectId.isValid(productId) || !size?.trim()) {
      throw new Error("A valid product and size are required.");
    }
    await connectToDatabase();
    await requireProductOwner(productId);

    const records = await Order.find({
      productId,
      size: size.trim(),
      status: "completed",
      $or: [
        { saleSource: "manual_product_sold" },
        {
          saleSource: { $exists: false },
          orderId: /^ORDER_/,
          referenceId: /^ORDER_/,
          shippingId: null,
        },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(25)
      .select("_id productId size qty price createdAt orderId referenceId saleSource stockSizeVerified shippingId status")
      .lean();

    return {
      ok: true as const,
      sales: records.filter(isReversibleManualSale).map((sale: any) => ({
        _id: String(sale._id),
        size: String(sale.size),
        qty: Number(sale.qty),
        price: Number(sale.price),
        date: sale.createdAt ? new Date(sale.createdAt).toISOString() : "",
        legacy: sale.stockSizeVerified !== true,
        reference: String(sale.referenceId || sale.orderId || ""),
      })),
    };
  } catch (error) {
    console.error("getReversibleManualSales failed:", error);
    return {
      ok: false as const,
      sales: [],
      message: error instanceof Error ? error.message : "Failed to fetch manual sales.",
    };
  }
}

export async function reverseManualSale({
  saleId,
  productId,
  originalSize,
  restoreSize,
  reason,
  path,
}: {
  saleId: string;
  productId: string;
  originalSize: string;
  restoreSize?: string;
  reason: string;
  path: string;
}) {
  let session: mongoose.ClientSession | null = null;
  try {
    if (!Types.ObjectId.isValid(saleId) || !Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid sale or product identifier.");
    }
    if (!originalSize?.trim() || !reason?.trim()) {
      throw new Error("Sale size and reversal reason are required.");
    }
    await connectToDatabase();
    // Recheck permission server-side for every request.
    const actorId = await requireProductOwner(productId);
    let restoredSize = "";
    let restoredQty = 0;
    let newStock = 0;
    let currentStocks: Array<{ size: string; stock: number }> = [];

    // A transaction ensures both stock restore and order removal succeed,
    // or neither changes. Requires MongoDB replica set / Atlas.
    session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const sale = await Order.findOne({
        _id: saleId,
        productId,
        size: originalSize.trim(),
      }).session(session!);
      if (!isReversibleManualSale(sale)) {
        throw new Error("This manual sale no longer exists or cannot be reversed.");
      }
      const qty = Number(sale.qty);
      restoredQty = qty;
      if (!Number.isInteger(qty) || qty < 1) {
        throw new Error("The recorded sale has an invalid quantity.");
      }
      const isLegacy = sale.stockSizeVerified !== true;
      restoredSize = isLegacy ? String(restoreSize || "").trim() : String(sale.size);
      if (!restoredSize) {
        throw new Error("For an older sale, select the size that actually lost stock.");
      }
      if (!isLegacy && restoreSize && restoreSize !== String(sale.size)) {
        throw new Error("Verified sales must be restored to the recorded size.");
      }

      // Never create new sizes by accident. Restore only an existing entry.
      const product = await Product.findOne({
        _id: productId,
        organizer: actorId,
      }).session(session!);
      if (!product) throw new Error("Product not found or access denied.");
      if (!product.features.some((f: any) => String(f.size) === restoredSize)) {
        throw new Error(`Size ${restoredSize} no longer exists on this product.`);
      }

      // Deleting the exact order inside the transaction removes it from
      // normal sales totals, order history and profit calculations.
      const deleted = await Order.deleteOne({
        _id: sale._id,
        productId,
        status: "completed",
      }).session(session!);
      if (deleted.deletedCount !== 1) {
        throw new Error("Sale already reversed. Refresh and try again.");
      }

      const updated = await Product.findOneAndUpdate(
        {
          _id: productId,
          features: { $elemMatch: { size: restoredSize } },
        },
        { $inc: { "features.$.stock": qty } },
        { new: true, session: session! }
      );
      if (!updated) throw new Error("Unable to restore stock.");
      newStock = Number(
        updated.features.find((f: any) => String(f.size) === restoredSize)?.stock
      );
      // Sync every variant to the database, including legacy corrections
      // where the recorded size and deducted size did not match.
      currentStocks = updated.features.map((f: any) => ({
        size: String(f.size),
        stock: Number(f.stock),
      }));

      // Save a correction audit, but not a counted sale.
      await SaleReversal.create([{
        originalSaleId: sale._id,
        productId: sale.productId,
        originalSize: String(sale.size),
        restoredSize,
        qty,
        price: Number(sale.price),
        orderId: String(sale.orderId || ""),
        reversedBy: actorId,
        reason: reason.trim(),
        legacy: isLegacy,
        originalSaleDate: sale.createdAt || null,
      }], { session: session! });
    });

    try { revalidatePath(path); } catch (error) {
      console.error("Reversal path revalidation failed:", error);
    }
    return {
      ok: true as const,
      message: `Sale removed. Restored ${restoredQty} item(s) to size ${restoredSize}.`,
      restoredSize,
      newStock,
      currentStocks,
    };
  } catch (error) {
    console.error("reverseManualSale failed:", error);
    return {
      ok: false as const,
      message: error instanceof Error ? error.message : "Unable to reverse this sale.",
    };
  } finally {
    if (session) await session.endSession();
  }
}

export async function updateOrdersByIds(
  ids: string[], // Array of _id strings
  orderId: string,
  referenceId: string,
  contact: string,
  firstname: string,
  lastname: string,
  phone: string,
  shippingId: string
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Perform the batch update
    const updateResponse = await Order.updateMany(
      { _id: { $in: ids } },
      { $set: { orderId, referenceId, contact, phone, firstname, lastname, shippingId } }
    );
    return updateResponse; // Return the response from MongoDB
  } catch (error: any) {
    console.error("Error updating orders:", error.message);
    throw error; // Re-throw error to be handled by the caller
  }
}
export async function updatePendingOrdersToSuccessful(orderId: string, phone: string) {
  try {
    // Connect to the database

    await connectToDatabase();

    // Update orders with status "pending" and matching orderId
    const result = await Order.updateMany(
      { orderId, status: "pending" }, // Matching condition
      { $set: { status: "successful" } } // Fields to update
    );
    // console.log("result: "+result)
    const message = "Your have a new order placed on pama.co.ke."
    const smsUrl = `http://107.20.199.106/sms/1/text/query?username=Ezeshatrans&password=5050Martin.com&from=Ezesha&text=${encodeURIComponent(
      message
    )}&to=${phone}`;

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    await axios.get(smsUrl, { headers: requestHeaders });

    return JSON.parse(JSON.stringify(result)); // Return the update result for further processing
  } catch (error) {
    console.error("Error updating orders:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}


export async function updateProductStock(orderId: string) {
  try {
    // Step 1: Connect to the database
    await connectToDatabase();
    // Step 2: Fetch the order details
    // const conditions = {
    //   $and: [
    //    { orderId: orderId },
    //   { status: { $in: ["completed", "successful"] } }, // Match completed or successful status
    // ],
    // };
    const conditions = {
      $and: [
        { orderId: orderId },
        { status: "pending" }, // Match completed or successful status
      ],
    };
    // Step 2: Fetch all orders with the same orderId
    const orders = await Order.find(conditions);
    if (orders.length === 0) {
      console.log("No orders found with the provided orderId");
    }

    // Step 3: Process each order
    for (const order of orders) {
      const { productId, size, qty } = order;

      // Step 4: Fetch the product using productId
      const product = await Product.findById(productId);
      if (!product) {
        console.log(`Product not found for productId: ${productId}`);
        continue; // Skip to the next order if the product doesn't exist
      }
      //  console.log("product: "+product)
      // Step 5: Update the stock for the specific size in the features array
      const featureIndex = product.features.findIndex(
        (feature: any) => feature.size === size
      );
      //  console.log("featureIndex: "+featureIndex)
      if (featureIndex === -1) {
        console.log(
          `Size ${size} not found in features for productId: ${productId}`
        );
        continue; // Skip to the next order if the size doesn't exist
      }

      // Subtract the quantity sold
      //console.log( product.features[featureIndex].size+": "+ product.features[featureIndex].stock)
      //  product.features[featureIndex].stock -= qty;

      // Ensure stock does not go negative
      if (product.features[featureIndex].stock > 0) {
        product.features[featureIndex].stock -= qty;
        // console.log( product.features[featureIndex].size+":NEW : "+ product.features[featureIndex].stock)
      }

      // Step 6: Save the updated product
      await product.save();
      // console.log(
      //   `Stock updated for productId: ${productId}, size: ${size}, qty: ${qty}`
      // );
    }
    // console.log("Stock updated for all matching orders")
    return { success: true, message: "Stock updated for all matching orders" };
  } catch (error) {
    console.error("Error updating product stock:", error);
    return { success: false, message: error };
  }
}

export async function updateDispatchedOrders(_id: string) {
  try {
    // Connect to the database

    await connectToDatabase();

    // Update orders with status "pending" and matching orderId
    const result = await Order.findByIdAndUpdate(
      _id,
      { status: "completed" },
      { new: true }
    )
    // console.log(`Updated ${result.modifiedCount} orders to "successful" for orderId: ${orderId}`);

    return result; // Return the update result for further processing
  } catch (error) {
    console.error("Error updating orders:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
export async function getOrdersByOrderId(orderId: string) {
  try {
    await connectToDatabase(); // Ensure database connection

    const orders = await populateAd(Order.find({ orderId, status: "successful" }).lean());

    return orders;
  } catch (error: any) {
    console.error("Error retrieving orders:", error.message);
    throw new Error("Failed to fetch orders");
  }
}
// GET ONE Ad BY ID
export async function getOrdersById(_id: string) {
  try {
    await connectToDatabase()

    const order = await populateAd(Order.findById(_id))

    if (!order) throw new Error('Order not found')

    return JSON.parse(JSON.stringify(order))
  } catch (error) {
    handleError(error)
  }
}
export async function getGraphSales(duration: string) {
  try {
    await connectToDatabase();

    let groupByFormat;

    // Determine grouping format based on duration
    switch (duration) {
      case 'day':
        groupByFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'week':
        groupByFormat = { $isoWeek: "$createdAt" }; // ISO week number
        break;
      case 'month':
        groupByFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default:
        return { error: "Invalid duration" };
    }

    const salesData = await Order.aggregate([
      { $match: { status: { $in: ['completed', 'successful'] } } },
      {
        $group: {
          _id: groupByFormat,
          totalSales: { $sum: { $multiply: ["$qty", "$price"] } },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);
    return JSON.parse(JSON.stringify(salesData));
  } catch (error) {
    handleError(error)
  }
}
export async function getallOders(orderId: string, start: string, end: string, limit: number, page: number) {
  try {
    await connectToDatabase();

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    // Build conditions dynamically
    const conditions: any = {};
    if (orderId) {
      conditions.referenceId = { $regex: orderId, $options: 'i' };
    }
    if (startDate || endDate) {
      conditions.createdAt = {};
      if (startDate) {
        conditions.createdAt.$gte = startDate; // Greater than or equal to startDate
      }
      if (endDate) {
        conditions.createdAt.$lte = endDate; // Less than or equal to endDate
      }
    }

    const skipAmount = (Number(page) - 1) * limit;

    // Fetch filtered orders with pagination
    const order = await populateAd(
      Order.find(conditions)
        .skip(skipAmount)
        .limit(limit)
    );

    // Get the count of documents that match the conditions
    const AdCount = await Order.countDocuments(conditions);
    return { data: JSON.parse(JSON.stringify(order)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

export async function getStatusOrders() {
  try {
    await connectToDatabase();

    const result = await Order.aggregate([
      {
        $group: {
          _id: "$status", // Group by status
          count: { $sum: 1 }, // Count the number of orders in each status
          totalWorth: { $sum: { $multiply: ["$price", "$qty"] } }, // Sum up the worth of orders
          totalProfit: { // Calculate and sum the profit
            $sum: {
              $cond: [
                { $in: ["$status", ["completed", "successful"]] }, // Include only completed or successful orders
                { $multiply: [{ $subtract: ["$price", "$buyprice"] }, "$qty"] }, // Profit for each order
                0, // Otherwise, add 0 to the sum
              ],
            },
          },
        },
      },
    ]);

    // Transform the aggregation result into a more accessible format
    const statusData = result.reduce((acc, { _id, count, totalWorth, totalProfit }) => {
      acc[_id] = { count, totalWorth, totalProfit };
      return acc;
    }, {});

    // Return default values for statuses that might not exist in the result
    return {
      pending: statusData.pending || { count: 0, totalWorth: 0, totalProfit: 0 },
      completed: statusData.completed || { count: 0, totalWorth: 0, totalProfit: 0 },
      successful: statusData.successful || { count: 0, totalWorth: 0, totalProfit: 0 },
    };
  } catch (error) {
    console.error("Error fetching order statuses with worth and profit:", error);
    throw new Error("Unable to fetch order statuses with worth and profit");
  }
}

// UPDATE
export async function getallOdersByuserId(
  userId: string,
  limit: number,
  page: number,
  status: string
) {
  try {
    await connectToDatabase();

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return { data: [], totalPages: 0 };
    }

    const conditions = { $and: [{ userId }, { status }] };
    const skipAmount = (Number(page) - 1) * limit;

    const order = await populateAd(
      Order.find(conditions).skip(skipAmount).limit(limit)
    );

    const AdCount = await Order.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(order)),
      totalPages: Math.ceil(AdCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
// A genuine server-side role check. Never use a client-provided userId or role.
// Supports Clerk public/private metadata.role === "admin", or a trusted
// database User.role === "admin" / User.isAdmin === true.
async function getOrdersAdminActor(): Promise<{
  clerkId: string;
  dbUserId?: string;
} | null> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  await connectToDatabase();
  const mongoUser = await User.findOne({ clerkId }).select("_id role isAdmin").exec();
  const dbRole = String((mongoUser as any)?.role || "").trim().toLowerCase();
  const isDbAdmin = dbRole === "admin" || (mongoUser as any)?.isAdmin === true;

  let isClerkAdmin = false;
  if (!isDbAdmin) {
    const clerkUser = await (await clerkClient()).users.getUser(clerkId);
    const publicMeta = clerkUser.publicMetadata as Record<string, unknown>;
    const privateMeta = clerkUser.privateMetadata as Record<string, unknown>;
    isClerkAdmin =
      String(publicMeta?.role || "").trim().toLowerCase() === "admin" ||
      String(privateMeta?.role || "").trim().toLowerCase() === "admin";
  }

  if (!isDbAdmin && !isClerkAdmin) return null;
  return {
    clerkId,
    dbUserId: mongoUser ? String(mongoUser._id) : undefined,
  };
}

// Called by the listing to decide whether to display the delete controls.
export async function getOrdersAdminAccess(): Promise<{ isAdmin: boolean }> {
  try {
    return { isAdmin: !!(await getOrdersAdminActor()) };
  } catch (error) {
    console.error("Failed to check admin order access:", error);
    return { isAdmin: false };
  }
}

// ADMIN DELETE: works for Pending, Successful, and Completed orders.
// No automatic stock restoration: the Reverse Sale flow is separate.
// Transaction logs a full snapshot and removes exactly one Order atomically.
export async function deleteOrder({
  _id,
  path,
  reason,
}: DeleteBookmarkParams & { reason?: string }): Promise<{
  ok: boolean;
  message: string;
}> {
  let session: mongoose.ClientSession | null = null;
  try {
    if (!Types.ObjectId.isValid(_id)) {
      return { ok: false, message: "Invalid order ID." };
    }
    const trimmedReason = String(reason || "").trim();
    if (trimmedReason.length < 5 || trimmedReason.length > 500) {
      return { ok: false, message: "Please provide a reason (5–500 characters)." };
    }

    const admin = await getOrdersAdminActor();
    if (!admin) {
      return { ok: false, message: "Only an administrator can delete orders." };
    }

    // Ensure the audit collection and its unique index exist before
    // starting the transaction (important on first deployment).
    await AdminOrderDeletion.init();
    session = await mongoose.startSession();
    let oldStatus = "";
    await session.withTransaction(async () => {
      const order = await Order.findById(_id).session(session!);
      if (!order) throw new Error("Order not found. It may have already been deleted.");
      oldStatus = String(order.status || "");

      // Preserve an audit copy outside normal Order/sales collections.
      await AdminOrderDeletion.create(
        [{
          originalOrderId: order._id,
          orderSnapshot: order.toObject({ depopulate: true }),
          originalStatus: oldStatus,
          reason: trimmedReason,
          deletedByClerkId: admin.clerkId,
          deletedByUserId: admin.dbUserId ? new Types.ObjectId(admin.dbUserId) : undefined,
        }],
        { session: session! }
      );

      const deleted = await Order.deleteOne({ _id: order._id }).session(session!);
      if (deleted.deletedCount !== 1) {
        throw new Error("Order was already deleted. Please refresh the page.");
      }
    });

    try {
      if (typeof path === "string" && path.startsWith("/") && !path.startsWith("//")) {
        revalidatePath(path);
      }
    } catch (error) {
      console.error("Order delete: refresh failed after successful deletion:", error);
    }
    return {
      ok: true,
      message: `The ${oldStatus || "selected"} order was deleted. Stock was not changed.`,
    };
  } catch (error) {
    console.error("Admin order delete failed:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to delete order.",
    };
  } finally {
    if (session) await session.endSession();
  }
}
