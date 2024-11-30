import mongoose, { Document, Schema, model, models } from "mongoose";

export interface ISubscriber extends Document {
  _id: string;
  email: string;
  phone: string;
}
const SubscriberSchema = new Schema({
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});
const Subscriber = models.Subscriber || model("Subscriber", SubscriberSchema);

export default Subscriber;
