"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "@/lib/actions/ad.product";
import { ProductSold } from "@/lib/actions/order.actions";
type soldProps = {
  userId: string;
  product: any;
  selectedSize: string;
  quantity: number;
  instock: number;
};
export const SoldConfirmation = ({
  selectedSize,
  quantity,
  instock,
  userId,
  product,
}: soldProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  function generateRandomOrderId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
    return `ORDER_${timestamp}_${randomString.toUpperCase()}`;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="text-xs bg-gray-300 px-2 py-1 cursor-pointer rounded">
          Mark Sold
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm sold ({quantity}) piece of size ({selectedSize})?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will generate a completed Order for this product size.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const response = await ProductSold({
                  order: {
                    userId: userId,
                    productId: product._id,
                    size: selectedSize,
                    buyprice: product.buyprice,
                    price:
                      product.price - (product.price * product.discount) / 100,
                    qty: quantity,
                    status: "completed",
                    orderId: generateRandomOrderId(),
                    referenceId: generateRandomOrderId(),
                  },
                  path: pathname,
                });
                if (response === "Order Created") {
                  instock = instock - quantity;
                }
              })
            }
          >
            {isPending ? "Order processing..." : "Confirm Sold"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
