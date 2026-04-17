import mongoose from "mongoose";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";

export async function seedUsers() {
    try {
        await connectToDatabase();

        const existingAdmin = await User.findOne({ email: "paul.irungu@gmail.com" });

        if (!existingAdmin) {
            await User.create({
                clerkId: "seed_admin_clerk_id",
                email: "paul.irungu@gmail.com",
                firstName: "Paul",
                lastName: "Irungu",
                photo: "/assets/images/profile.png",
                status: "Admin",
                businessname: "Pama",
                aboutbusiness: "Fashion store",
                businessaddress: "Beba Beba Trade Centre, Nairobi",
                latitude: "-1.286389",
                longitude: "36.817223",
                businesshours: [
                    {
                        openHour: "08",
                        openMinute: "00",
                        closeHour: "18",
                        closeMinute: "00",
                    },
                ],
                businessworkingdays: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ],
                phone: "0705084684",
                whatsapp: "0705084684",
                website: "",
                facebook: "",
                twitter: "",
                instagram: "",
                tiktok: "",
                verified: [
                    {
                        accountverified: true,
                        verifieddate: new Date(),
                    },
                ],
                imageUrl: "/assets/images/logo.png",
                fcmToken: "",
            });

            console.log("Admin user seeded");
        } else {
            console.log("Admin already exists");
        }

        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
}
