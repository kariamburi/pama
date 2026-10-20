import { Document, Schema, Types, model, models } from "mongoose";

export interface IOrder extends Document {
  _id: Types.ObjectId;
  userId: string;
  productId: string;
  qty: number;
  buyprice: number;
  price: number;
  size: string;
  status: string;
  orderId: string;
  referenceId: string;
  contact: string;
  firstname: string;
  lastname: string;
  phone: string;
  shippingId: string;
  saleSource?: string;
  stockSizeVerified?: boolean;
}

const OrderSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    size: { type: String },
    qty: { type: Number, required: true },
    buyprice: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String },
    orderId: { type: String },
    referenceId: { type: String },
    contact: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    shippingId: { type: Schema.Types.ObjectId, ref: "Delivery" },
    // Only ProductSold should set these two fields.
    saleSource: { type: String },
    stockSizeVerified: { type: Boolean },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
