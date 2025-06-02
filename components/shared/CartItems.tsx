import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteOrder } from "@/lib/actions/order.actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
type CartProps = {
  order: any;
  userId: string;
  //  userImage: string;
  //  userName: string;
};

const CartItems = ({ order, userId }: CartProps) => {
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
    <div className="border-b pb-4 mb-4">
      <div className="flex items-center gap-4">
        <Link href={`/product/${order.productId._id}`} passHref>
          <img
            src={order.productId.imageUrls[0]}
            alt={order.productId.productName}
            className="w-16 h-16 rounded"
          />
        </Link>

        <div className="flex-grow">
          <Link href={`/product/${order.productId._id}`} passHref>
            <h2 className="lg:text-lg font-medium hover:underline">
              {order.productId.productName}
            </h2>
          </Link>

          <p className="text-xs lg:text-sm text-gray-600">
            Color: {order.productId.color}
          </p>
          <p className="text-xs lg:text-sm text-gray-600">Size: {order.size}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
            -
          </button>
          <span> {order.qty}</span>
          <button className="px-2 py-1  bg-gray-200 hover:bg-gray-300 rounded">
            +
          </button>
          <button
            onClick={() => handle(order._id)}
            className="px-2 py-1 text-gray-700 hover:text-black rounded"
          >
            <DeleteOutlineOutlinedIcon />
          </button>
        </div>
        <span className="lg:text-lg font-medium">
          KES
          {(
            (order.productId.price -
              (order.productId.price * order.productId.discount) / 100) *
            Number(order.qty)
          ).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CartItems;
