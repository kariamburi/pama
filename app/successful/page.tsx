"use client";

import {
  getOrdersByOrderId,
  updatePendingOrdersToSuccessful,
} from "@/lib/actions/order.actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Successful: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const orderId = searchParams.get("OrderTrackingId");

  useEffect(() => {
    if (orderId) {
      const updateOrders = async () => {
        try {
          setIsLoading(true);
          await updatePendingOrdersToSuccessful(orderId);

          const response = await getOrdersByOrderId(orderId);
          setOrders(response);
        } catch (error: any) {
          console.error("Failed to update orders:", error);
          setErrorMessage("An error occurred while updating the orders.");
        } finally {
          setIsLoading(false);
        }
      };

      updateOrders();
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalAmount = () => {
    return orders.reduce((acc, order) => acc + order.qty * order.price, 0);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <img
              src="/assets/images/logo.png"
              alt="Pama Collection Logo"
              className="h-12 w-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Pama Collection</h1>
            <p className="text-gray-600">Phone: +254705084684</p>
            <p className="text-gray-600">
              Website:{" "}
              <a href="https://www.pama.co.ke" className="text-blue-600">
                www.pama.co.ke
              </a>
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <a href="mailto:support@pama.co.ke" className="text-blue-600">
                support@pama.co.ke
              </a>
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Order Receipt</h1>

        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">
            No orders found for Order ID: {orderId}
          </p>
        ) : (
          <>
            <div className="mb-4 flex flex-col">
              {/* <p>
                <strong>Order Tracking ID:</strong> {orderId}
              </p> */}
              <p>
                <strong>Order ID:</strong> {orders[0].referenceId}
              </p>
            </div>

            <table className="table-auto w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Size</th>
                  <th className="border border-gray-300 px-4 py-2">Qty</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.productId.productName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.size}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {order.price.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      KES {(order.qty * order.price).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right">
              <p className="text-lg font-bold">
                Total Amount: KES {calculateTotalAmount().toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => router.push("/")}
              >
                Home
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={handlePrint}
              >
                Print Receipt
              </button>
            </div>
          </>
        )}

        <div className="mt-8 text-center text-gray-600">
          <p className="text-lg font-semibold">
            Thank you for shopping with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Successful;
