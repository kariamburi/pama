import React from "react";
type CollectionProps = {
  data: any;
};
const OrderItems = ({ data }: CollectionProps) => {
  return (
    <div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Product</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order: any) => (
            <tr key={order._id}>
              <td className="border p-2">{order.orderId}</td>
              <td className="border p-2">{order.productId?.name || "N/A"}</td>
              <td className="border p-2">{order.userId?.username || "N/A"}</td>
              <td className="border p-2">{order.size || "-"}</td>
              <td className="border p-2">{order.qty}</td>
              <td className="border p-2">${order.price.toFixed(2)}</td>
              <td className="border p-2">{order.status || "Pending"}</td>
              <td className="border p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
