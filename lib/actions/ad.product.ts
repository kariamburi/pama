'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'

import User from '@/lib/database/models/user.model'

import { handleError } from '@/lib/utils'
import { UTApi } from "uploadthing/server"
import mongoose, { Document, Schema, model, models  } from "mongoose";
//const moment = require('moment');
import {
  CreateAdParams,
  UpdateAdParams,
  DeleteAdParams,
  GetAllAdsParams,
  GetAdsByUserParams,
  GetRelatedAdsByCategoryParams,
  deleteImageParams,
  UpdateVideoParams,
  UpdateViewsParams,
  UpdateCallsParams,
  UpdateInquiriesParams,
  UpdateWhatsappParams,
  UpdateBookmarkedParams,
  UpdateShareParams,
  UpdateAbuseParams,
  CreateProductParams,
  UpdateProductParams,
  GetAllProductsParams,
  DeleteProductParams,
  GetRelatedProductByCategoryParams,
} from '@/types'

import { Model } from 'mongoose'
import { ObjectId } from 'mongodb'
import Product from '../database/models/product.model'

const populateAd = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id clerkId email firstName lastName photo businessname aboutbusiness businessaddress latitude longitude businesshours businessworkingdays phone whatsapp website facebook twitter instagram tiktok imageUrl verified fcmToken' })
 
}

// CREATE
export async function createProduct({ userId, product, path }: CreateProductParams) {
  try {
    await connectToDatabase()

   const organizer = await User.findById(userId)
    
    if (!organizer) throw new Error('Organizer not found')
    
    const newProduct = await Product.create({ ...product, organizer: userId})
   
    revalidatePath(path)
   
    return JSON.parse(JSON.stringify(newProduct))
  } catch (error) {
    handleError(error)
  }
}
// GET ALL Ad

export async function getAllProducts({ query, limit = 20, page=1,category,gender,kids,product,sortby,material,occassion,color,price}: GetAllProductsParams) {
  try {
    await connectToDatabase()
   
    const titleCondition = query ? { productName: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? { category: { $regex: category, $options: 'i' } } : {}
   const genderCondition = gender ? { genderAgeGroup: { $regex: gender, $options: 'i' } } : {};
   let kidsCondition={};
   if(kids){
    const group= gender+"-"+kids;
     kidsCondition = kids ? { genderAgeGroup: { $regex: group, $options: 'i' } } : {};
   }
  const productCondition = product ? { subCategory: { $regex: product, $options: 'i' } } : {};
  
 // const materialCondition = material ? { material: { $regex: material, $options: 'i' } } : {};

  const materialArray = material ? material.split(",") : [];
  //console.log(materialArray)
const materialCondition = materialArray.length
  ? { fabricCareInstructions: { $in: materialArray } }
  : {};
 
  const occassionArray = occassion ? occassion.split(",") : [];
  //console.log(materialArray)
const occassionCondition = occassionArray.length
  ? { occasion: { $in: occassionArray } }
  : {};
 
  const colorArray = color ? color.split(",") : [];
  //console.log(materialArray)
const colorCondition = colorArray.length
  ? { color: { $in: colorArray } }
  : {};
  
    const [minPrice, maxPrice] = price.split("-");
    const priceCondition = minPrice && maxPrice ? { price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } } : {}
   
 const conditions = {
  $and: [titleCondition,categoryCondition,genderCondition,kidsCondition,productCondition, materialCondition,occassionCondition,colorCondition,priceCondition],
}
  let trendingStatus="Bestsellers";
    const skipAmount = (page - 1) * limit
    let AdQuery:any=[];
    if(sortby==="Recommeded"){
      AdQuery = Product.find(conditions)
         .sort({ createdAt: 'desc' })
         .skip(skipAmount)
         .limit(limit)
   }
   else if(sortby==="New Arrivals"){
    trendingStatus="New Arrivals";
    const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate the date one week ago

  AdQuery = Product.find({
    ...conditions,
    createdAt: { $gte: oneWeekAgo }, // Add condition to filter products created in the last 7 days
  })
    .sort({ createdAt: 'desc' }) // Sort by creation date in descending order
    .skip(skipAmount) // Pagination: Skip the specified number of documents
    .limit(limit); // Pagination: Limit the number of results
}
else if(sortby==="Bestsellers"){
 
  AdQuery = Product.find(conditions)
     .sort({ views: -1 })
     .skip(skipAmount)
     .limit(limit)
} else if(sortby==="Trending Now"){
  trendingStatus="Trending Now";
  AdQuery = Product.find(conditions)
     .sort({ createdAt: 'asc' })
     .skip(skipAmount)
     .limit(limit)
}

else if(sortby==="Lowest Price"){
  AdQuery = Product.find(conditions)
  .sort({ price: 'asc' })
  .skip(skipAmount)
  .limit(limit)
}else if(sortby==="Highest Price"){
  AdQuery = Product.find(conditions)
 .sort({ price: 'desc' })
  .skip(skipAmount)
  .limit(limit)
}else{
  AdQuery = Product.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
}
  


      const Products = await populateAd(AdQuery);
   
      const ProductCount = await Product.countDocuments(conditions)
      const totalProducts = await Product.countDocuments();
   
      return {
        data: JSON.parse(JSON.stringify(Products)),
        trendingStatus: trendingStatus,
        totalPages: Math.ceil(ProductCount / limit),
        totalProducts: totalProducts,
      }
    
  } catch (error) {
    handleError(error)
  }
}


export async function getTotalProducts() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Aggregate total sizes in stock
    const stockAggregation = await Product.aggregate([
      { $unwind: '$features' }, // Decompose features array
      {
        $group: {
          _id: null,
          totalStock: { $sum: '$features.stock' }, // Sum up stock for all sizes
          totalWorth: { $sum: { $multiply: ['$features.stock', '$price'] } }, // Calculate total worth
        },
      },
    ]);

    const totalStock = stockAggregation.length > 0 ? stockAggregation[0].totalStock : 0;
    const totalWorth = stockAggregation.length > 0 ? stockAggregation[0].totalWorth : 0;

    // Count total products
    const totalProducts = await Product.countDocuments();

    return {
      totalStock,
      totalWorth,
      totalProducts,
    };
  } catch (error) {
    console.error('Error fetching total sizes and products:', error);
    throw new Error('Unable to fetch product totals');
  }
}
export async function getTrendingProducts(timeFrame:string) {
  
  const endDate = new Date();
  let startDate = new Date(); // Initialize startDate as a Date object.

  // Calculate startDate based on the timeFrame
  switch (timeFrame) {
    case 'day':
      startDate.setDate(endDate.getDate() - 1); // Subtract 1 day
      break;
    case 'week':
      startDate.setDate(endDate.getDate() - 7); // Subtract 7 days
      break;
    case 'month':
      startDate.setMonth(endDate.getMonth() - 1); // Subtract 1 month
      break;
    default:
      startDate.setDate(endDate.getDate() - 7); // Default to 7 days
  }

  const products = await Product.find({
    createdAt: { $gte: startDate, $lte: endDate },
  })
    .sort({
      views: -1,
    //  whatsapp: -1,
     // bookmarked: -1,
     // shared: -1,
     // inquiries: -1,
     // call: -1,
    })
    .limit(3); // Limit to top 10 products

  return JSON.parse(JSON.stringify(products));
}
export async function getRelatedProductsByCategory({
  category,
  subCategory,
  occasion,
  genderAgeGroup,
  productId,
  limit = 16,
  page,
}: GetRelatedProductByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: category }, { subCategory: subCategory }, { genderAgeGroup: genderAgeGroup }, { occasion: occasion },   { _id: { $ne: productId } }] }

    const AdQuery = Product.find(conditions)
    //  .sort({ createdAt: 'desc' })
      .sort({ priority: -1, createdAt: -1 })
      .skip(skipAmount)
      .limit(limit)

    const Ads = await populateAd(AdQuery)
    const AdCount = await Product.countDocuments(conditions)
//console.log(JSON.parse(JSON.stringify(Ads)))
    return { data: JSON.parse(JSON.stringify(Ads)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}


// GET ONE Ad BY ID
export async function getProductById(productId: string) {
  try {
    await connectToDatabase()

    const Products = await populateAd(Product.findById(productId))

    if (!Products) throw new Error('Ad not found')

    return JSON.parse(JSON.stringify(Products))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateProduct({ userId, product, path }: UpdateProductParams) {
  try {
    await connectToDatabase()

    const ProductToUpdate = await Product.findById(product._id)
    if (!ProductToUpdate || ProductToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or Ad not found')
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedProduct))
  } catch (error) {
    handleError(error)
  }
}
// UPDATE

export async function updateview({ _id, views, path }: UpdateViewsParams) {
  try {
    await connectToDatabase();
  
    // Find the category by its ID and update the name field only
    const updateAdViews = await Product.findByIdAndUpdate(
      _id,
      { views }, // Update only the name field
      { new: true }
    );
  
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdViews));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// UPDATE
export async function updatecalls({ _id, calls, path }: UpdateCallsParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdCalls = await Product.findByIdAndUpdate(
      _id,
      { calls }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdCalls));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// UPDATE
export async function updatewhatsapp({ _id, whatsapp, path }: UpdateWhatsappParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdwhatsapp = await Product.findByIdAndUpdate(
      _id,
      { whatsapp }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdwhatsapp));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// UPDATE
export async function updateinquiries({ _id, inquiries, path }: UpdateInquiriesParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdinquiries = await Product.findByIdAndUpdate(
      _id,
      { inquiries }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdinquiries));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// UPDATE
export async function updateshared({ _id, shared, path }: UpdateShareParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdshare = await Product.findByIdAndUpdate(
      _id,
      { shared }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdshare));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// UPDATE
export async function updatebookmarked({ _id, bookmarked, path }: UpdateBookmarkedParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdbookmarked = await Product.findByIdAndUpdate(
      _id,
      { bookmarked }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdbookmarked));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
export async function updateabused({ _id, abused, path }: UpdateAbuseParams) {
  try {
    await connectToDatabase();
    
    // Find the category by its ID and update the name field only
    const updateAdabused = await Product.findByIdAndUpdate(
      _id,
      { abused }, // Update only the name field
      { new: true }
    );
    
    // Revalidate the path (assuming it's a separate function)
    revalidatePath(path);

    // Return the updated category
    return JSON.parse(JSON.stringify(updateAdabused));
  } catch (error) {
    handleError(error);
    // Handle error appropriately (e.g., throw or return error response)
    throw error;
  }
}
// DELETE
export async function deleteProduct({ adId, deleteImages, path }: DeleteProductParams) {
  try {
  
    if (deleteImages) {
        const utapi = new UTApi();
      await utapi.deleteFiles(deleteImages);
    }
    await connectToDatabase()
    const deletedProduct = await Product.findByIdAndDelete(adId)
    if (deletedProduct) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// DELETE

export async function deleteSingleImage({ deleteImage, path }: deleteImageParams) {
  try {
  
    if (deleteImage) {
        const utapi = new UTApi();
        const deletedAd = await utapi.deleteFiles(deleteImage);
        if (deletedAd) revalidatePath(path)
    }
   
  } catch (error) {
    handleError(error)
  }
}



