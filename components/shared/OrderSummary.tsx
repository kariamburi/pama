"use client";
import { deleteOrder } from "@/lib/actions/order.actions";
import { usePathname } from "next/navigation";
import React from "react";
import { useToast } from "../ui/use-toast";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
type CartProps = {
  cart: any;
  totalAmount: number;
  shipping: number;
  tip: number;
  isSending: boolean;
  handlePayNow: () => void;
  //  userImage: string;
  //  userName: string;
};
const OrderSummary = ({
  cart,
  totalAmount,
  shipping,
  tip,
  isSending,
  handlePayNow,
}: CartProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const handle = async (_id: string) => {
    await deleteOrder({ _id, path: pathname });

    toast({
      title: "Alert",
      description: "Deleted",
      duration: 5000,
      className: "bg-[#000000] text-white",
    });
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <div>
        <ul>
          {cart.map((order: any, index: number) => {
            return (
              <li key={order._id} className="border-t">
                <div className="flex p-1 justify-between items-center w-full">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={order.productId.imageUrls[0]}
                        alt={`${order.productId.productName}`}
                        className="w-16 h-16 rounded-sm"
                      />

                      <span className="absolute top-0 -right-1 text-[10px] flex items-center justify-center w-4 h-4 text-white bg-green-500 rounded-full">
                        {order.qty}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs">{`${order.productId.productName}`}</p>
                      <p className="text-gray-500 text-xs">
                        Color: {`${order.productId.color}`}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Size: {order.size}
                      </p>
                    </div>
                  </div>
                  <div className="items-center gap-2 flex">
                    <div className="text-[#000000] text-xs font-bold">
                      KES.
                      {(
                        (order.productId.price -
                          (order.productId.price * order.productId.discount) /
                            100) *
                        order.qty
                      ).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handle(order._id)}
                      className="px-2 py-1 text-gray-700 hover:text-black rounded"
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between mb-2">
        <p>Subtotal</p>
        <p>KES {totalAmount.toLocaleString()}</p>
      </div>
      {shipping > 0 ? (
        <>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
            <p>KES {shipping.toLocaleString()}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
        </>
      )}
      {tip > 0 && (
        <>
          <div className="flex justify-between mb-2">
            <p>Tip</p>
            <p>KES {tip.toLocaleString()}</p>
          </div>
        </>
      )}
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <p>KES {(totalAmount + shipping + tip).toLocaleString()}</p>
      </div>
      <button
        onClick={() => handlePayNow()}
        className={`lg:hidden bg-black mt-2 cursor-pointer w-full py-4 px-1 font-bold rounded-sm text-white h-full hover:bg-gray-800 ${
          isSending ? "bg-gray-800" : "bg-black"
        }`}
        disabled={isSending} // Disable button while sending
      >
        <div className="flex gap-1 items-center justify-center w-full">
          {isSending && <CircularProgress sx={{ color: "white" }} size={20} />}
          {isSending ? "Payment Processing..." : " Pay Now"}
        </div>
      </button>
    </div>
  );
};

export default OrderSummary;
