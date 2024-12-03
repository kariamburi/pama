"use client";

import {
  getOrdersByOrderId,
  updatePendingOrdersToSuccessful,
  updateProductStock,
} from "@/lib/actions/order.actions";
import { getUserDetails } from "@/lib/actions/user.actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type MobileProps = {
  comp: any;
  orders: any;
};
const Successful = ({ comp, orders }: MobileProps) => {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const calculateTotalAmount = () => {
    return orders.reduce(
      (acc: any, order: any) => acc + order.qty * order.price,
      0
    );
  };

  return (
    <div className="min-h-screen p-0 lg:p-6 bg-gray-100">
      <div className="w-full mt-5 lg:max-w-4xl lg:mx-auto bg-white p-1 lg:p-6 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <img
              src={comp.imageUrl ?? "/assets/images/logo.png"}
              alt={comp.businessname ?? "logo"}
              className="h-12 w-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="lg:text-2xl font-bold">{comp.businessname}</h1>
            <p className="text-xs lg:text-base text-gray-600">
              Phone: {comp.phone}
            </p>
            <p className="text-xs lg:text-base text-gray-600">
              Website:{" "}
              <a href="https://www.pama.co.ke" className="text-blue-600">
                www.pama.co.ke
              </a>
            </p>
            <p className="text-xs lg:text-base text-gray-600">
              Email:{" "}
              <a href="mailto:support@pama.co.ke" className="text-blue-600">
                support@pama.co.ke
              </a>
            </p>
          </div>
        </div>

        <h1 className="lg:text-2xl font-bold mb-4">Order Receipt</h1>

        <div className="text-xs lg:text-base mb-4 flex flex-col">
          <p>
            <strong>Customer Name:</strong> {orders[0].firstname}{" "}
            {orders[0].lastname}
          </p>
          <p>
            <strong>Phone:</strong> {orders[0].phone}
          </p>
          <p>
            <strong>Delivery Method:</strong> {orders[0].shippingId.method}
          </p>
          <p>
            <strong>Order ID:</strong> {orders[0].referenceId}
          </p>
        </div>

        <table className="text-xs lg:text-base table-auto w-full text-left border-collapse border border-gray-200">
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
            {orders.map((order: any, index: number) => (
              <tr key={index}>
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
          <p className="text-sm lg:text-lg font-bold">
            Total Amount: KES {calculateTotalAmount().toLocaleString()}
          </p>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="text-xs lg:text-base bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="text-xs lg:text-base bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handlePrint}
          >
            Print Receipt
          </button>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm lg:text-lg font-semibold">
            Thank you for shopping with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Successful;
