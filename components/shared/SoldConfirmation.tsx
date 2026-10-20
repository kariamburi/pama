"use client";

import { useState } from "react";
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

type SoldProps = {
  userId: string;
  product: any;
  selectedSize: string;
  quantity: number;
  instock: number;
  onStockUpdate: (size: string, newStock: number) => void;
};

function generateRandomOrderId() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `ORDER_${timestamp}_${randomString.toUpperCase()}`;
}

export const SoldConfirmation = ({
  selectedSize,
  quantity,
  instock,
  userId,
  product,
  onStockUpdate,
}: SoldProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [soldPrice, setSoldPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleMarkSold = async () => {
    if (isSubmitting) return;
    setError("");

    if (!product?._id) {
      setError("Product ID missing.");
      return;
    }

    const price = Number(soldPrice);
    if (!Number.isFinite(price) || price <= 0) {
      setError("Please enter a valid sold price.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > instock) {
      setError(`Not enough stock available for size ${selectedSize}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await ProductSold({
        order: {
          userId,
          productId: String(product._id),
          size: selectedSize,
          buyprice: product.buyprice,
          price,
          qty: quantity,
          status: "completed",
          orderId: generateRandomOrderId(),
          referenceId: generateRandomOrderId(),
        },
        path: pathname,
      });

      if (response?.ok && typeof response.newStock === "number") {
        onStockUpdate(selectedSize, response.newStock);
        setSoldPrice("");
        setError("");
        setOpen(false);
      } else {
        setError(response?.message || "Failed to mark size as sold.");
      }
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to complete the sale. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) {
          setOpen(nextOpen);
          if (!nextOpen) setError("");
        }
      }}
    >
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={instock < quantity || isSubmitting}
          className={
            instock >= quantity
              ? "text-xs bg-black hover:bg-gray-700 text-white p-2 cursor-pointer rounded"
              : "text-xs bg-gray-400 text-white p-2 rounded cursor-not-allowed"
          }
        >
          Mark Sold
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm sold ({quantity}) piece(s) of size ({selectedSize})?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-grey-600">
            Enter the actual selling price for this product size.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="px-4">
          <label
            htmlFor={`sold-price-${selectedSize}`}
            className="block text-sm font-medium text-gray-700"
          >
            Sold Price (KES)
          </label>
          <input
            id={`sold-price-${selectedSize}`}
            type="number"
            min="0.01"
            step="0.01"
            disabled={isSubmitting}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            placeholder="Enter sold price"
            value={soldPrice}
            onChange={(event) => setSoldPrice(event.target.value)}
          />
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitting}
            onClick={(event) => {
              event.preventDefault();
              void handleMarkSold();
            }}
          >
            {isSubmitting ? "Processing Order..." : "Confirm Sold"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
