import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  status: string;
  businessname?: string;
  aboutbusiness?: string;
  businessaddress?: string;
  latitude?: string;
  longitude?: string;
  businesshours?: Businesshours[];
  businessworkingdays?: string[];
  phone?: string;
  whatsapp?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  tiktok?: string;
  verified: Verified[];
  imageUrl?: string;
  fcmToken?: string;
}
export interface Businesshours {
  openHour: string;
  openMinute: string;
  closeHour: string;
  closeMinute: string;
}


export interface Verified {
  accountverified: boolean;
  verifieddate: Date;
}

const BusinesshoursSchema = new Schema<Businesshours>({
  openHour: { type: String, required: true },
  openMinute: { type: String, required: true },
  closeHour: { type: String, required: true },
  closeMinute: { type: String, required: true },
});

const VerifiedSchema = new Schema<Verified>({
  accountverified: { type: Boolean, required: true },
  verifieddate: { type: Date, required: true },
});

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  status: { type: String, required: true, default: "User" },

  businessname: { type: String, default: "" },
  aboutbusiness: { type: String, default: "" },
  businessaddress: { type: String, default: "" },
  latitude: { type: String, default: "" },
  longitude: { type: String, default: "" },

  businesshours: { type: [BusinesshoursSchema], default: [] },
  businessworkingdays: { type: [String], default: [] },

  phone: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  website: { type: String, default: "" },
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  instagram: { type: String, default: "" },
  tiktok: { type: String, default: "" },

  verified: {
    type: [VerifiedSchema],
    default: [{ accountverified: false, verifieddate: new Date() }],
  },

  imageUrl: { type: String, default: "" },
  fcmToken: { type: String, default: "" },
});

const User = models.User || model('User', UserSchema);

export default User;
