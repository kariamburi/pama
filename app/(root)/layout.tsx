import Footer from "@/components/shared/Footer";
//import Header from "@/components/shared/Header";
import {
  getAdminProfile,
  getUserById,
  getUserDetails,
} from "@/lib/actions/user.actions";
//import { auth } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
//import { UpdateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Navbarhome from "@/components/shared/navbarhome";

import Head from "next/head";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <div className="min-h-screen">
      <Head>
        <title>Pama | Buy Pure Turkey Ware in Kenya</title>
        <meta
          name="description"
          content="Pama is Kenya's premier online store specializing in Pure Turkey ware. Shop for the best quality clothes and accessories at affordable prices."
        />
        <meta
          property="og:title"
          content="Pama | Pure Turkey Ware Store in Kenya"
        />
        <meta
          property="og:description"
          content="Pama offers the finest Pure Turkey ware in Kenya. Browse our selection of high-quality clothes, and accessories available for delivery nationwide."
        />
        <meta property="og:image" content="/assets/images/logo.png" />
        <meta property="og:url" content="https://pama.co.ke" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="Pama, Pure Turkey ware, Turkey collections, Turkey clothes,Turkey accessories, Kenya"
        />
        <meta name="author" content="Pama" />
        <link rel="canonical" href="https://pama.co.ke" />
      </Head>

      <div className="w-full h-full">
        <div className="sm:hidden fixed top-0 z-10 w-full">
          {user ? (
            <Navbarhome userstatus={user.status} comp={comp} userId={userId} />
          ) : (
            <Navbarhome userstatus="User" comp={comp} userId="" />
          )}
        </div>
        <div className="hidden sm:inline">
          <div className="w-full">
            {user ? (
              <Navbarhome
                userstatus={user.status}
                comp={comp}
                userId={userId}
              />
            ) : (
              <Navbarhome userstatus="User" comp={comp} userId="" />
            )}
          </div>
        </div>
        <main className="flex-1">{children}</main>
        <Toaster />

        <footer className="bg-gray-100">
          <Footer comp={comp} />
          {/*<div className="hidden lg:inline">
            <Footer comp={comp} />
          </div>
           <div className="lg:hidden">
            <BottomNavigation userId={userId} />
          </div>*/}
        </footer>
      </div>
    </div>
  );
}
