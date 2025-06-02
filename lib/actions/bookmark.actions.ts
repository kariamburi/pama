"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

import Bookmark from "../database/models/bookmark.model"
import Product from "../database/models/product.model"


const populateAd = (query: any) => {
  return query.populate({
    path: 'adId',
    model: Product,
    select: `
      productName
      description
      category
      subCategory
      occasion
      material
      genderAgeGroup
      features
      color
      price
      discount
      stockQuantity
      tags
      trendingStatus
      featuredInDeals
      customizationOptions
      imageUrls
      fabricCareInstructions
      sku
      availability
      organizer
    `
  });
};


export const createBookmark = async ({ bookmark, path}: CreateBookmarkParams) => {
  try {
    await connectToDatabase();
  //  const conditions = { adId: bookmark.adId };
    const conditions = { $and: [{adId: bookmark.adId }, { userBId: bookmark.userBId }] };
    const book = await Bookmark.findOne(conditions);  // Use findOne to find a single matching document
    
    let newBookmark={}
    let response="Product aleardy Saved to Favorite"
    if(!book){
       newBookmark = await Bookmark.create({ ...bookmark});
       response="Product Saved to Favorite"
    }
    
    revalidatePath(path)
    return response;
  } catch (error) {
    handleError(error)
  }
}

// GET ONE Ad BY ID
export async function getBookmarkById(_id: string) {
  try {
    await connectToDatabase()

    const bookmark = await Bookmark.findById(_id)

    if (!bookmark) throw new Error('Favorite not found')

    return JSON.parse(JSON.stringify(bookmark))
  } catch (error) {
    handleError(error)
  }
}
export async function getallBookmarkByuserId(userId: string, limit = 16, page = 1) {
  try {
    await connectToDatabase();
    const conditions = { userBId: userId }
    const skipAmount = (Number(page) - 1) * limit
   // const bookmark = await Bookmark.find(conditions);
   const bookmark = await populateAd(Bookmark.find(conditions)
   .skip(skipAmount)
   .limit(limit));
   console.log(bookmark)
   const AdCount = await Bookmark.countDocuments(conditions)

   return { data: JSON.parse(JSON.stringify(bookmark)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
// UPDATE



// Function to delete a bookmark
export const deleteBookmark = async ({ bookmark, path }: CreateBookmarkParams) => {
  try {
    await connectToDatabase();
    //const conditions = { adId: bookmark.adId };
    const conditions = { $and: [{adId: bookmark.adId }, { userBId: bookmark.userBId }] };
    const book = await Bookmark.findOne(conditions); // Find the matching bookmark
    
    let response = "Favorite not found";
    if (book) {
      await Bookmark.deleteOne(conditions); // Delete the bookmark if it exists
      response = "Favorite deleted successfully";
    }
    
    revalidatePath(path); // Revalidate the path to update cache
    return response;
  } catch (error) {
    handleError(error); // Handle any errors
  }
};