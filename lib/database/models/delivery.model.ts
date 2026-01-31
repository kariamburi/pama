import mongoose, { Document, Schema, Types, model, models } from "mongoose";


export interface IDelivery extends Document {
  _id: Types.ObjectId;
  method: string;
  location?: string;
  areas?: string[];
  price: string;
  note?: string;
}
const DeliverySchema = new Schema({
  method: { type: String, required: true },
  location: { type: String },
  areas: { type: [String] },
  price: { type: String, required: true },
  note: { type: String },
})
//delete mongoose.models.Delivery;
const Delivery = models.Delivery || model('Delivery', DeliverySchema);

export default Delivery;