import mongoose, { Document, Schema, model, models } from "mongoose";
export interface Feature  {
  size: string // Represents the size (e.g., "44", "48")
  stock: number // Number of items available for this size
 // checked: boolean; // Indicates if the size is currently available for sale
};
export interface IProduct extends Document {
  _id:string;
  productName: string;
  description?: string;
  category: string;
  subCategory?: string;
  occasion?: string;
  //material?: string;
  genderAgeGroup?: string;
  //size?: { size: string; available: boolean }[],
  features: Feature[];
  color?: string[];
  price: number;
  discount?: string | number;
  //stockQuantity: string | number;
  //tags?: string; // Ensure this matches your schema
  featuredInDeals?: string;
  customizationOptions?: string;
  imageUrls: string[]; // Ensure it is always an array
  fabricCareInstructions?: string;
  sku?: string;
 // trendingStatus?: string;
  views:number;
 // inquiries:number;
whatsapp:number;
calls:number;
shared:number;
bookmarked:number;
//abused:number;
  organizer: {
    photo: string | undefined; _id: string, firstName: string, lastName: string,phone: string ,whatsapp: string  
}
}

const FeatureSchema = new Schema({
  size: {
    type: String,
    required: true, // Each feature must have a size
  },
  stock: {
    type: Number,
    required: true, // Each feature must have a stock count
    min: 0, // Stock cannot be negative
  },
 // checked: {
 //   type: Boolean,
 //   default: true, // Optional, indicates if the size is available for sale
 // },
});

const ProductSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String },
    occasion: { type: String },
    genderAgeGroup: { type: String },
    features: [FeatureSchema],
    color: { type: [String], required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    featuredInDeals:  { type: String },
    customizationOptions: { type: String },
    imageUrls: { type: [String], required: true },
    fabricCareInstructions: { type: String },
    sku: { type: String, unique: true, required: true },
    whatsapp:{ type: Number , default: 0},
    calls:{ type: Number , default: 0},
    views: { type: Number, default: 0 },
    bookmarked: { type: Number, default: 0 },
    shared: { type: Number, default: 0 },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Drop the existing model, if it exists
//delete mongoose.models.Product;
const Product = models.Product || model('Product', ProductSchema);

export default Product;