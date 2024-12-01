"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Subscriber from "../database/models/NotifySchema";
import Notify from "../database/models/NotifySchema";

function isValidEmail(text: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
}

function isValidPhone(text: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return phoneRegex.test(text);
}
export const createSubscribe = async (text: string): Promise<string> => {
  try {
    await connectToDatabase();

    // Validate the input
    const isEmail = isValidEmail(text);
    const isPhone = isValidPhone(text);

    if (!isEmail && !isPhone) {
      return "Please provide a valid email or phone number.";
    }

    // Check if the contact already exists
    const conditions = { contact: text };
    const existingSubscriber = await Notify.findOne(conditions);

    if (existingSubscriber) {
      return isEmail
        ? "Email already subscribed."
        : "Phone number already subscribed.";
    }

    // Create a new subscriber
    console.log("existingSubscriber: "+text)
    const newSubscriber = await Notify.create({
      contact: text, // Use the provided `text` directly
    });
    console.log("newSubscriber: "+newSubscriber)
    return isEmail
      ? "Email subscription successful!"
      : "Phone subscription successful!";
  } catch (error) {
    handleError(error);
    return "An error occurred. Please try again later.";
  }
};


