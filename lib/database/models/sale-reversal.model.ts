import { Schema, model, models } from "mongoose";

// Audit history for deleted manual sale records, separate from sales totals.
const SaleReversalSchema = new Schema(
  {
    originalSaleId: { type: Schema.Types.ObjectId, ref: "Order", required: true, unique: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    originalSize: { type: String, required: true },
    restoredSize: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    orderId: { type: String },
    reversedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    legacy: { type: Boolean, default: false },
    originalSaleDate: { type: Date },
  },
  { timestamps: true }
);

const SaleReversal = models.SaleReversal || model("SaleReversal", SaleReversalSchema);
export default SaleReversal;
