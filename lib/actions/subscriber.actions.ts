"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Subscriber from "../database/models/SubscriberSchema"


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

    const isEmail = isValidEmail(text);
    const isPhone = isValidPhone(text);

    if (!isEmail && !isPhone) {
      return "Please provide a valid email or phone number.";
    }

    const conditions = isEmail ? { email: text } : { phone: text };
    const existingSubscriber = await Subscriber.findOne(conditions);

    if (existingSubscriber) {
      return isEmail
        ? "Email already subscribed."
        : "Phone number already subscribed.";
    }

    const newSubscriber = await Subscriber.create({
      email: isEmail ? text : "",
      phone: isPhone ? text : "",
    });

    return isEmail
      ? "Email subscription successful!"
      : "Phone subscription successful!";
  } catch (error) {
    handleError(error);
    return "An error occurred. Please try again later.";
  }
};
