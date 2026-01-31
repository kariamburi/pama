import { Schema, model, models, Document, Types } from "mongoose";

export interface INotify extends Document {
  _id: Types.ObjectId;
  contact: string;
  subscribedAt: Date;
}

const NotifySchema = new Schema<INotify>({
  contact: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Notify = models.Notify || model<INotify>("Notify", NotifySchema);
export default Notify;