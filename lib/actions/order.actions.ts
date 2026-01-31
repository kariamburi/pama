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
    // Connect to the database
    await connectToDatabase();
    // console.log("order; "+order)
    // Define query conditions to check for existing orders
    const conditions = {
      $and: [
        { productId: order.productId },
        { userId: order.userId },
        { size: order.size },
        { status: { $in: ["completed", "successful"] } }, // Match completed or successful status
      ],
    };
    // Find an existing order matching the conditions
    const existingOrder = await Order.findOne(conditions);
    // console.log("existingOrder: "+existingOrder)
    // Declare variables for new order and response message
    let newOrder;
    let response = "Order already exists";

    // Create a new order or update the existing one
    if (!existingOrder) {
      newOrder = await Order.create({ ...order });
      response = "Order Created";
      // console.log("newOrder: "+newOrder)
      const { productId, size, qty } = newOrder;
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      // Step 4: Update the stock for the specific size in the features array
      const featureIndex = product.features.findIndex(
        (feature: any) => feature.size === size
      );
      if (featureIndex === -1) {
        throw new Error(`Size ${size} not found in product features`);
      }

      // Subtract the quantity sold
      product.features[featureIndex].stock -= qty;

      // Ensure stock does not go negative
      if (product.features[featureIndex].stock < 0) {
        throw new Error(
          `Insufficient stock for size ${size}. Current stock: ${product.features[featureIndex].stock + qty}`
        );
      }

      // Step 5: Save the updated product
      await product.save();
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
export async function getallOdersByuserId(userId: string, limit: number, page: number, status: string) {
  try {
    await connectToDatabase();
    // const conditions = { userId: userId }
    const conditions = { $and: [{ userId: userId }, { status: status }] };

    const skipAmount = (Number(page) - 1) * limit
    // const bookmark = await Bookmark.find(conditions);
    const order = await populateAd(Order.find(conditions)
      .skip(skipAmount)
      .limit(limit));
    const AdCount = await Order.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(order)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
// DELETE
export async function deleteOrder({ _id, path }: DeleteBookmarkParams) {
  try {
    await connectToDatabase()

    const deletedOrder = await Order.findByIdAndDelete(_id)
    // Delete image from uploadthing
    if (deletedOrder) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}


