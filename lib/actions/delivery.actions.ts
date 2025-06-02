"use server"

import { CreateBookmarkParams, CreateDeliveryParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdateDeliveryParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

import Bookmark from "../database/models/bookmark.model"
import Product from "../database/models/product.model"
import Delivery, { IDelivery } from "../database/models/delivery.model"
import User from "../database/models/user.model"


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
    `
  });
};


export const createDelivery = async () => {
  try {
    await connectToDatabase();
    const deliveryMethods = [
      {
        method: "Shop Pickup - Tom Mboya Street",
        location: "Beba beba Trade Center ground Floor, Shop A9",
        price: "Free",
      },
      {
        method: "Door Step Delivery (400)",
        areas: ["Kahawa West", "Kahawa Wendani"],
        price: "Ksh 400.00",
      },
      {
        method: "Door Step Delivery (450)",
        areas: ["Ruaka"],
        price: "Ksh 450.00",
      },
      {
        method: "Door Step Delivery (590)",
        areas: [
          "Rongai",
          "Nyayo Estate",
          "Syokimau",
          "Karen",
          "Ruiru",
          "Kikuyu",
          "Bomas",
          "Muthiga",
          "Utawala",
          "Njiru",
          "Uthiru",
          "Banana",
        ],
        price: "Ksh 590.00",
      },
      {
        method: "Door Step Delivery - Nairobi and environs",
        price: "Ksh 300.00",
      },
      {
        method: "2NK Sacco (200)",
        price: "Ksh 200.00",
      },
      {
        method: "4NTE Sacco (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Chania Genesis (250) - Coast, excluding Nyali",
        price: "Ksh 250.00",
      },
      {
        method: "Classic Shuttle",
        price: "Ksh 300.00",
      },
      {
        method: "County Link (150)",
        price: "Ksh 150.00",
      },
      {
        method: "Dreamline (400) - Coast",
        price: "Ksh 400.00",
      },
      {
        method:
          "Easy Coach (300) - Siaya, Bondo, Kisumu, Kakamega, Migori, Kericho",
        price: "Ksh 300.00",
      },
      {
        method: "Ena Coach (300)",
        price: "Ksh 300.00",
      },
      {
        method: "G-Coach",
        price: "Ksh 600.00",
      },
      {
        method: "Guardian (250)",
        price: "Ksh 250.00",
      },
      {
        method: "JPEE Travellers (300)",
        price: "Ksh 300.00",
      },
      {
        method: "Kaka Travellers (100)",
        price: "Ksh 100.00",
      },
      {
        method: "KamT Sacco (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Kijabe Line (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Kinatwa (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Kukena (200)",
        note: "May vary based on weight",
        price: "Ksh 200.00",
      },
      {
        method: "Liban",
        price: "Ksh 600.00",
      },
      {
        method: "Libera",
        price: "Ksh 100.00",
      },
      {
        method: "Likana (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Lopha",
        price: "Ksh 150.00",
      },
      {
        method: "Meiso",
        price: "Ksh 300.00",
      },
      {
        method: "Metro Trans (100)",
        price: "Ksh 100.00",
      },
      {
        method: "Mololine",
        price: "Ksh 250.00",
      },
      {
        method: "MTN (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Naekana (300)",
        price: "Ksh 300.00",
      },
      {
        method: "Nairobi CBD",
        price: "Ksh 100.00",
      },
      {
        method: "Narokline (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Neno (200)",
        price: "Ksh 200.00",
      },
      {
        method: "NNUS (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Northrift (250)",
        price: "Ksh 250.00",
      },
      {
        method: "Nuclear (300)",
        price: "Ksh 300.00",
      },
      {
        method: "Orokise",
        price: "Ksh 150.00",
      },
      {
        method: "Pickup Mtaani (120)",
        note: "Confirm on their website if they deliver to a convenient place near you",
        price: "Ksh 120.00",
      },
      {
        method: "Raha (200)",
        price: "Ksh 200.00",
      },
      {
        method: "Rembo Shuttle (100)",
        price: "Ksh 100.00",
      },
      {
        method: "Runa Sacco",
        price: "Ksh 100.00",
      },
      {
        method: "Satima (200)",
        price: "Ksh 200.00",
      },
      {
        method: "South Rift (250)",
        price: "Ksh 250.00",
      },
      {
        method: "Super Metro (150)",
        price: "Ksh 150.00",
      },
      {
        method: "Teamswat",
        price: "Ksh 300.00",
      },
      {
        method: "Z. 😢 Delivery Method not provided",
        note: "Contact 0705084684, or select this and we'll contact you",
        price: "Free",
      },
    ];
  
 // Insert delivery methods, avoiding duplicates
 const results = [];
 for (const method of deliveryMethods) {
   const existing = await Delivery.findOne({ method: method.method });
   if (!existing) {
     const inserted = await Delivery.create(method);
     results.push(inserted);
   }
 }

    //console.log("Data inserted:", results);
    return "success";
  } catch (error) {
    handleError(error)
  }
}
export async function createMethods({ userId, delivery, path }: CreateDeliveryParams) {
  try {
    await connectToDatabase()

   const organizer = await User.findById(userId)
   console.log("POST")
    if (!organizer) throw new Error('Organizer not found')
      console.log("YES: "+JSON.parse(JSON.stringify(delivery)))
    const newDelivery = await Delivery.create({ ...delivery})
   
    revalidatePath(path)
   
    return JSON.parse(JSON.stringify(newDelivery))
  } catch (error) {
    handleError(error)
  }
}
export async function updateDelivery({ delivery, path }: UpdateDeliveryParams) {
  try {
    await connectToDatabase()
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      delivery._id,
      { ...delivery},
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedDelivery))
  } catch (error) {
    handleError(error)
  }
}
// GET ONE Ad BY ID
export async function getAllDeliveries() {
  try {
    await connectToDatabase()

    const deliveryMethods = await Delivery.find();
    if (!deliveryMethods) throw new Error('deliveryMethods not found')

    return JSON.parse(JSON.stringify(deliveryMethods))
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
   const AdCount = await Bookmark.countDocuments(conditions)

   return { data: JSON.parse(JSON.stringify(bookmark)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
// UPDATE

// DELETE
export async function deleteDelivery(_id:string, path:string ) {
  try {
    await connectToDatabase()

    const deletedDelivery = await Delivery.findByIdAndDelete(_id)
    // Delete image from uploadthing
    if (deletedDelivery) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}


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