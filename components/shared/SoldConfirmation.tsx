"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
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

import { ProductSold } from "@/lib/actions/order.actions";

type soldProps = {
  userId: string;
  product: any;
  selectedSize: string;
  quantity: number;
  instock: number;
  onStockUpdate: (size: string, newStock: number) => void; // Callback to update parent state
};

export const SoldConfirmation = ({
  selectedSize,
  quantity,
  instock: initialStock,
  userId,
  product,
  onStockUpdate,
}: soldProps) => {
  const pathname = usePathname();
  const [instock, setInstock] = useState(initialStock);
  let [isPending, startTransition] = useTransition();

  function generateRandomOrderId() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `ORDER_${timestamp}_${randomString.toUpperCase()}`;
  }

  const handleMarkSold = async () => {
    const response = await ProductSold({
      order: {
        userId: userId,
        productId: product._id,
        size: selectedSize,
        buyprice: product.buyprice,
        price: product.price - (product.price * product.discount) / 100,
        qty: quantity,
        status: "completed",
        orderId: generateRandomOrderId(),
        referenceId: generateRandomOrderId(),
      },
      path: pathname,
    });

    if (response === "Order Created") {
      const newStock = instock - quantity;
      setInstock(newStock); // Update local state
      onStockUpdate(selectedSize, newStock); // Update parent state
    }
  };

  return (
    <AlertDialog>
      {instock > 0 ? (
        <AlertDialogTrigger>
          <div className="text-xs bg-black hover:bg-gray-700 text-white p-2 cursor-pointer rounded">
            Mark Sold
          </div>
        </AlertDialogTrigger>
      ) : (
        <div className="text-xs bg-gray-400 text-white p-2 rounded">
          Mark Sold
        </div>
      )}

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

          <AlertDialogAction onClick={() => startTransition(handleMarkSold)}>
            {isPending ? "Order processing..." : "Confirm Sold"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
