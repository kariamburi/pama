"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getReversibleManualSales,
  reverseManualSale,
} from "@/lib/actions/order.actions";

type SaleRecord = {
  _id: string;
  size: string;
  qty: number;
  price: number;
  date: string;
  reference: string;
  legacy: boolean;
};

type Props = {
  product: any;
  selectedSize: string;
  availableSizes: string[];
  onStockSync: (stocks: Array<{ size: string; stock: number }>) => void;
};

export function ReverseSold({
  product,
  selectedSize,
  availableSizes,
  onStockSync,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [selected, setSelected] = useState<SaleRecord | null>(null);
  const [restoreSize, setRestoreSize] = useState("");
  const [reason, setReason] = useState("Wrong size marked sold");

  const loadSales = useCallback(async () => {
    if (!product?._id) return;
    setLoading(true);
    setError("");
    try {
      const res = await getReversibleManualSales({
        productId: String(product._id),
        size: selectedSize,
      });
      if (res.ok) setSales(res.sales);
      else setError(res.message || "Unable to load sales.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load sales.");
    } finally {
      setLoading(false);
    }
  }, [product?._id, selectedSize]);

  useEffect(() => {
    if (open) void loadSales();
  }, [open, loadSales]);

  const selectSale = (sale: SaleRecord) => {
    setSelected(sale);
    setRestoreSize(sale.legacy ? "" : sale.size);
    setReason("Wrong size marked sold");
    setError("");
  };

  const doReverse = async () => {
    if (!selected || processing || !product?._id) return;
    if (!reason.trim()) { setError("Please enter a reason."); return; }
    if (selected.legacy && !restoreSize) {
      setError("Select the size that actually lost stock in this older sale.");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      const result = await reverseManualSale({
        saleId: selected._id,
        productId: String(product._id),
        originalSize: selected.size,
        restoreSize,
        reason: reason.trim(),
        path: pathname,
      });
      if (result.ok && Array.isArray(result.currentStocks)) {
        onStockSync(result.currentStocks);
        setSelected(null);
        setOpen(false);
        setSales([]);
      } else {
        setError(result.message || "Could not reverse the sale.");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to reverse the sale.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (processing) return;
        setOpen(next);
        if (!next) { setSelected(null); setError(""); }
      }}
    >
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="rounded border border-orange-300 bg-orange-50 px-2 py-2 text-xs text-orange-800 hover:bg-orange-100"
          title={`Reverse an incorrectly recorded manual sale for size ${selectedSize}`}
        >
          Reverse Sale
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[85vh] overflow-y-auto bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {selected ? "Confirm sale reversal" : `Manual sales: Size ${selectedSize}`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {selected
              ? "This removes the selected manual sale from sales records and restores stock. It cannot be undone automatically."
              : "Select the exact manual sale to reverse. Website customer orders cannot be reversed here."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {selected ? (
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border p-3">
              <div><strong>Recorded size:</strong> {selected.size}</div>
              <div><strong>Quantity:</strong> {selected.qty}</div>
              <div><strong>Selling price:</strong> KES {selected.price.toLocaleString()}</div>
              <div><strong>Date:</strong> {selected.date ? new Date(selected.date).toLocaleString("en-KE") : "Unknown"}</div>
            </div>
            {selected.legacy ? (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
                <p className="font-semibold text-amber-900">Older sale — choose the size that actually lost stock</p>
                <p className="mt-1 text-amber-900">
                  Before the size-matching fix, a sale recorded for {selected.size} could have
                  deducted stock from another size. Check your stock history first.
                </p>
                <label className="mt-3 block font-medium" htmlFor={`restore-size-${selected._id}`}>
                  Stock size to restore
                </label>
                <select
                  id={`restore-size-${selected._id}`}
                  value={restoreSize}
                  onChange={(e) => setRestoreSize(e.target.value)}
                  disabled={processing}
                  className="mt-1 w-full rounded-md border bg-white p-2"
                >
                  <option value="">Select affected size</option>
                  {availableSizes.map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
            ) : (
              <p className="rounded-md bg-gray-50 p-3">
                Restoring {selected.qty} piece(s) to size <strong>{selected.size}</strong>.
              </p>
            )}
            <label className="block font-medium" htmlFor={`reason-${selected._id}`}>Reason</label>
            <input
              id={`reason-${selected._id}`}
              className="w-full rounded border px-3 py-2"
              disabled={processing}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this sale being reversed?"
            />
          </div>
        ) : (
          <div className="space-y-2">
            {loading && <p className="text-sm text-gray-600">Loading recorded sales…</p>}
            {!loading && sales.length === 0 && !error && (
              <p className="rounded-md border p-3 text-sm text-gray-600">
                No reversible manual sales found for size {selectedSize}.
              </p>
            )}
            {sales.map((sale) => (
              <div key={sale._id} className="flex items-center justify-between gap-2 rounded-lg border p-3 text-sm">
                <div>
                  <div className="font-semibold">{sale.qty} item(s) · KES {sale.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{sale.date ? new Date(sale.date).toLocaleString("en-KE") : sale.reference}</div>
                  {sale.legacy && <div className="text-xs font-medium text-amber-700">Older sale — stock needs verification</div>}
                </div>
                <button type="button" className="shrink-0 rounded bg-black px-3 py-2 text-xs text-white"
                  onClick={() => selectSale(sale)} disabled={processing}>Select</button>
              </div>
            ))}
          </div>
        )}

        {error && <p role="alert" className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>}
        <AlertDialogFooter>
          {selected && (
            <button
              type="button" disabled={processing} onClick={() => { setSelected(null); setError(""); }}
              className="rounded border px-3 py-2 text-sm"
            >
              Back
            </button>
          )}
          <AlertDialogCancel disabled={processing}>Close</AlertDialogCancel>
          {selected && (
            <button
              type="button"
              disabled={processing || !reason.trim() || (selected.legacy && !restoreSize)}
              onClick={() => void doReverse()}
              className="rounded bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50"
            >
              {processing ? "Reversing…" : "Restore stock & remove sale"}
            </button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
