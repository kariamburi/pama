import { Schema, model, models } from "mongoose";

// Separate audit collection: these records do NOT count as orders or sales.
const AdminOrderDeletionSchema = new Schema(
  {
    originalOrderId: {
      type: Schema.Types.ObjectId, ref: "Order", required: true, unique: true,
    },
    orderSnapshot: { type: Schema.Types.Mixed, required: true },
    originalStatus: { type: String, required: true },
    reason: { type: String, required: true },
    deletedByClerkId: { type: String, required: true },
    deletedByUserId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const AdminOrderDeletion =
  models.AdminOrderDeletion ||
  model("AdminOrderDeletion", AdminOrderDeletionSchema);

export default AdminOrderDeletion;
