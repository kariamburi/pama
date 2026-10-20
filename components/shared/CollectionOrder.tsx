"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  deleteOrder,
  getOrdersAdminAccess,
} from "@/lib/actions/order.actions";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Pagination from "./Pagination";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { DispatchConfirmation } from "./DispatchConfirmation";
type CollectionProps = {
  data: any[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const CollectionOrder = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages,
  urlParamName,
}: CollectionProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  // Permissions come from the server. The server also checks authorization
  // again when the delete action runs, so hiding buttons is not the security gate.
  const [isOrderAdmin, setIsOrderAdmin] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<any | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const visibleOrders = useMemo(
    () => data.filter((order) => !deletedIds.includes(String(order._id))),
    [data, deletedIds]
  );

  useEffect(() => {
    let active = true;
    getOrdersAdminAccess()
      .then((result) => {
        if (active) setIsOrderAdmin(result.isAdmin);
      })
      .catch(() => {
        if (active) setIsOrderAdmin(false);
      });
    return () => { active = false; };
  }, []);

  const showDeleteConfirmation = (order: any) => {
    if (!isOrderAdmin || isDeleting) return;
    setOrderToDelete(order);
    setDeleteReason("");
  };

  const closeDeleteConfirmation = () => {
    if (isDeleting) return;
    setOrderToDelete(null);
    setDeleteReason("");
  };

  const handleDeleteConfirmed = async () => {
    if (!orderToDelete || !isOrderAdmin || isDeleting) return;
    if (deleteReason.trim().length < 5) {
      toast({ title: "Reason required", description: "Enter at least 5 characters explaining the deletion.", variant: "destructive" });
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteOrder({
        _id: String(orderToDelete._id),
        path: pathname,
        reason: deleteReason.trim(),
      });
      if (!result.ok) {
        toast({ title: "Deletion failed", description: result.message, variant: "destructive" });
        return;
      }
      setDeletedIds((previous) => [...previous, String(orderToDelete._id)]);
      setOrderToDelete(null);
      setDeleteReason("");
      toast({ title: "Order deleted", description: result.message });
      router.refresh();
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order); // Set the selected order to display in the modal
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  return (
    <div>
      <div className="flex flex-row gap-2 items-end border-t p-2">
        {/* Total for all orders */}
        <div className="flex gap-2 items-center p-1 text-xs rounded-sm">
          <div>Total</div>
          <div className="font-bold">
            KES{" "}
            {visibleOrders
              .reduce((total, order) => total + order.price, 0)
              .toLocaleString()}
          </div>
        </div>

        {/* Total for successful orders */}
        <div className="flex gap-2 items-center bg-green-200 p-1 text-xs rounded-sm">
          <div>Successful</div>
          <div className="font-bold">
            KES{" "}
            {visibleOrders
              .filter((order) => order.status === "successful")
              .reduce((total, order) => total + order.price, 0)
              .toLocaleString()}
          </div>
        </div>

        {/* Total for pending orders */}
        <div className="flex gap-2 items-center bg-orange-200 p-1 text-xs rounded-sm">
          <div>Pending</div>
          <div className="font-bold">
            KES{" "}
            {visibleOrders
              .filter((order) => order.status === "pending")
              .reduce((total, order) => total + order.price, 0)
              .toLocaleString()}
          </div>
        </div>

        {/* Total for completed orders */}
        <div className="flex gap-2 items-center bg-gray-200 p-1 text-xs rounded-sm">
          <div>Completed</div>
          <div className="font-bold">
            KES{" "}
            {visibleOrders
              .filter((order) => order.status === "completed")
              .reduce((total, order) => total + order.price, 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      {visibleOrders.length > 0 ? (
        <div>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Client</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order: any) => (
                <tr key={order._id}>
                  <td
                    className="border p-2 text-blue-500 cursor-pointer underline"
                    onClick={() => handleOrderClick(order)}
                  >
                    {order.referenceId}
                  </td>
                  <td className="border p-2">
                    {order.productId?.productName || "N/A"}
                  </td>

                  <td className="border p-2">{order.size || "-"}</td>
                  <td className="border p-2">{order.qty}</td>
                  <td className="border p-2">
                    KES {order.price.toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {order.status === "successful" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-pointer flex text-xs items-center justify-center text-black bg-green-200 p-1 rounded-sm">
                              Successful
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex gap-1 text-sm">
                              Order payment completed but pending Dispatch
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {order.status === "pending" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-pointer flex text-xs items-center justify-center text-black bg-orange-200 p-1 rounded-sm">
                              Pending
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex gap-1 text-sm">
                              Order pending payment
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {order.status === "completed" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-pointer flex text-xs items-center justify-center text-black bg-gray-200 p-1 rounded-sm">
                              Completed
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex gap-1 text-sm">
                              Order closed and dispatched to the client.
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </td>
                  <td className="border p-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{order.contact || "N/A"}</td>
                  <td className="border p-2">
                    {order.status === "successful" && (
                      <>
                        <DispatchConfirmation _id={order._id} />
                      </>
                    )}

                    {isOrderAdmin && (
                      <button
                        type="button"
                        onClick={() => showDeleteConfirmation(order)}
                        className="mt-1 rounded-lg bg-red-50 p-1 text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete ${order.status} order ${order.referenceId || order._id}`}
                        title="Admin: Delete order"
                      >
                        <DeleteOutlineOutlinedIcon />
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}

          {/* Admin delete confirmation — includes Completed and Successful orders. */}
          {isOrderAdmin && orderToDelete && (
            <div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDeleteConfirmation();
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-order-title"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              >
                <h2 id="delete-order-title" className="mb-2 text-xl font-bold text-gray-900">
                  Delete {String(orderToDelete.status || "")} order?
                </h2>
                <p className="mb-3 text-sm text-gray-700">
                  <strong>Product:</strong> {orderToDelete.productId?.productName || "Unknown"}<br />
                  <strong>Size:</strong> {orderToDelete.size || "—"} | <strong>Qty:</strong> {orderToDelete.qty}<br />
                  <strong>Order:</strong> {orderToDelete.referenceId || orderToDelete._id}
                </p>
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  This permanently removes the order from normal sales and reports.
                  <strong> It will NOT restore stock.</strong> For an incorrectly marked
                  dress size, use the Reverse Sale action in the product editor instead.
                  An admin deletion audit entry will be retained.
                </div>
                <label htmlFor="admin-delete-reason" className="mb-1 block text-sm font-semibold">
                  Reason for deletion (required)
                </label>
                <textarea
                  id="admin-delete-reason"
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  rows={3}
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Why should this order be removed?"
                  maxLength={500}
                  disabled={isDeleting}
                />
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={closeDeleteConfirmation}
                    className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting || deleteReason.trim().length < 5}
                    onClick={handleDeleteConfirmed}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Yes, Delete Order"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for displaying order details */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-full lg:w-4/5 p-2 lg:p-6 rounded shadow-lg relative">
                <button
                  className="absolute top-2 right-2 text-gray-600"
                  onClick={closeModal}
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p className="text-sm text-gray-700">
                  <strong>OrderId:</strong> {selectedOrder.referenceId || "N/A"}
                </p>
                {/* Contact Details Section */}
                <div className="mb-4 border rounded-xl p-2 ">
                  <h3 className="text-lg font-semibold mb-2">
                    Contact Details
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Name:</strong>{" "}
                    {selectedOrder.firstname + " " + selectedOrder.lastname ||
                      "N/A"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Email:</strong> {selectedOrder.contact || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> {selectedOrder.phone || "N/A"}
                  </p>
                </div>

                {/* Shipping Details Section */}
                <div className="mb-4  border rounded-xl p-2">
                  <h3 className="text-lg font-semibold mb-2">
                    Shipping Details
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Method:</strong>{" "}
                    {selectedOrder.shippingId?.method || "N/A"}
                  </p>
                </div>

                {/* Product Bought Details Section */}
                <div className="mb-4 border rounded-xl p-2">
                  <h3 className="text-lg font-semibold mb-2">
                    Product Bought Details
                  </h3>
                  <div className="w-full flex gap-3">
                    <div className="flex flex-col">
                      {/* Product Image */}
                      {selectedOrder.productId?.imageUrls ? (
                        <Link
                          href={`/product/${selectedOrder.productId._id}`}
                          passHref
                        >
                          <img
                            src={selectedOrder.productId.imageUrls[0]}
                            alt={selectedOrder.productId.productName}
                            className="w-32 h-32 object-cover rounded mb-4"
                          />
                        </Link>
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded mb-4">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-700">
                        <strong>SKU:</strong>{" "}
                        {selectedOrder.productId?.sku || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Product Name:</strong>{" "}
                        {selectedOrder.productId?.productName || "N/A"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Size:</strong> {selectedOrder.size || "-"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Quantity:</strong> {selectedOrder.qty}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Total Price:</strong> KES{" "}
                        {selectedOrder.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Order Status:</strong>{" "}
                        {String(selectedOrder.status || "unknown").replace(/^./, (char: string) => char.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Ordered At:</strong>{" "}
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="font-bold text-[16px] lg:text-[25px]">{emptyTitle}</h3>
          <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
};

export default CollectionOrder;
