import mongoose, { Document, Schema, model, models } from "mongoose";

export interface INotify extends Document {
  _id: string;
  contact: string;
}
const NotifySchema = new Schema({
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: { type: Date, default: Date.now },
});

//delete mongoose.models.Subscriber;
const Notify = models.Notify || model("Notify", NotifySchema);

export default Notify;
