"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"

import Bookmark from "../database/models/bookmark.model"
import Product from "../database/models/product.model"
import Subscriber from "../database/models/SubscriberSchema"
import User from "../database/models/user.model"
import nodemailer from 'nodemailer';
import axios from "axios"

export async function broadcastMessage(type: string, message: string) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch emails or phone numbers based on message type
    const users = await User.find({}, type === 'email' ? 'email' : 'phone');
    const subscribers = await Subscriber.find({}, type === 'email' ? 'email' : 'phone');

    // Extract and deduplicate contacts
    const userContacts = users.map((u) => (type === 'email' ? u.email : u.phone)).filter(Boolean);
    const subscriberContacts = subscribers.map((s) => (type === 'email' ? s.email : s.phone)).filter(Boolean);
    //const recipients = [...new Set([...userContacts, ...subscriberContacts])]; // Avoid duplicates
    const recipients = Array.from(new Set([...userContacts, ...subscriberContacts]));
    // Handle email sending
    if (type === 'email') {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Send emails
      for (const email of recipients) {
        const mailOptions = {
          from: '"Pama" <no-reply@pama.co.ke>',
          to: email,
          subject: 'Important Notification',
          text: message,
        };

        await transporter.sendMail(mailOptions);
      }
    }

    // Handle SMS sending
    if (type === 'sms') {
      for (const phone of recipients) {
        const smsUrl = `http://107.20.199.106/sms/1/text/query?username=Ezeshatrans&password=5050Martin.com&from=Ezesha&text=${encodeURIComponent(
          message
        )}&to=${phone}`;

        const requestHeaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        await axios.get(smsUrl, { headers: requestHeaders });
      }
    }

    // Return success response
    return { message: `${type} sent successfully to all recipients.` };
  } catch (error) {
    console.error('Error in broadcastMessage:', error);
    throw new Error('Failed to send messages.');
  }
}

