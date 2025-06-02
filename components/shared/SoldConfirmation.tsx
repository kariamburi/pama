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
  const [soldPrice, setSoldPrice] = useState(""); // New state for sold price
  let [isPending, startTransition] = useTransition();

  function generateRandomOrderId() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `ORDER_${timestamp}_${randomString.toUpperCase()}`;
  }

  const handleMarkSold = async () => {
    if (!soldPrice || isNaN(Number(soldPrice)) || Number(soldPrice) <= 0) {
      alert("Please enter a valid sold price.");
      return;
    }

    const response = await ProductSold({
      order: {
        userId: userId,
        productId: product._id,
        size: selectedSize,
        buyprice: product.buyprice,
        price: Number(soldPrice), // Use user-inputted price
        qty: quantity,
        status: "completed",
        orderId: generateRandomOrderId(),
        referenceId: generateRandomOrderId(),
      },
      path: pathname,
    });

    if (response === "Order Created") {
      const newStock = instock - quantity;
      setInstock(newStock);
      onStockUpdate(selectedSize, newStock);
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
            Confirm sold ({quantity}) piece(s) of size ({selectedSize})?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Enter the actual selling price for this product size.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Input field for Sold Price */}
        <div className="px-4">
          <label className="block text-sm font-medium text-gray-700">
            Sold Price (KES)
          </label>
          <input
            type="number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter sold price"
            value={soldPrice}
            onChange={(e) => setSoldPrice(e.target.value)}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={() => startTransition(handleMarkSold)}>
            {isPending ? "Processing Order..." : "Confirm Sold"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
