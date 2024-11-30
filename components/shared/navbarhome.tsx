"use client";

import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DiamondIcon from "@mui/icons-material/Diamond";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useRouter, redirect, usePathname } from "next/navigation";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
//import { useSession } from "next-auth/react";
//import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import MobileNav from "./MobileNav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Image from "next/image";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "@/components/shared/Header";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
//import Unreadmessages from "./Unreadmessages";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import dynamic from "next/dynamic";
import StyledBrandName from "./StyledBrandName";
import AppPopup from "./AppPopup ";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import { getallOdersByuserId } from "@/lib/actions/order.actions";
import { IUser } from "@/lib/database/models/user.model";
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  { ssr: false }
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  { ssr: false }
);
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);

type NavProps = {
  userstatus: string;
  userId: string;
  comp: IUser;
};

export default function Navbarhome({ userstatus, userId, comp }: NavProps) {
  // const [unreadCount, setUnreadCount] = useState<number>(0);
  const router = useRouter();
  // Get the params of the User
  const pathname = usePathname();
  const isActive = pathname === "/";
  const [cartItems, setCartItems] = useState(0); // Replace with dynamic cart count from your state or context
  useEffect(() => {
    const getadded_cart = async () => {
      try {
        const page = 1;
        const limit = 100;
        const status = "pending";
        const cart: any = await getallOdersByuserId(
          userId,
          limit,
          page,
          status
        );

        setCartItems(cart.data.length);
      } catch (error) {
        //console.error("Error getting last messages:", error);
        return 0; // Return empty array in case of error
      }
    };
    getadded_cart();
  }, []);
  return (
    <div className="w-full border-b bg-gradient-to-b lg:bg-gradient-to-r from-white to-white p-2 lg:p-3">
      <div className="flex p-1 w-full">
        <div className="flex-1">
          <div className="flex items-center">
            {!isActive && (
              <div
                className="mr-5 w-5 h-8 flex items-center justify-center rounded-sm text-gray-600 tooltip tooltip-bottom hover:cursor-pointer"
                data-tip="Back"
                onClick={() => router.back()}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ArrowBackOutlinedIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Back</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <div className="rounded-full overflow-hidden">
              <Image
                src={comp.imageUrl ?? "/assets/images/logo.png"}
                alt={comp.businessname ?? "logo"}
                onClick={() => router.push("/")}
                className="hover:cursor-pointer"
                width={36}
                height={36}
              />
            </div>
            <span
              className="font-bold text-base lg:text-lg text-white hover:cursor-pointer"
              onClick={() => router.push("/")}
            >
              <StyledBrandName comp={comp} />
            </span>
          </div>
        </div>

        <div className="hidden lg:inline">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 flex border hover:shadow-[0px_4px_20px_rgba(0,0,0,0.3)] items-center justify-center rounded-full bg-white emerald-500 tooltip tooltip-bottom hover:cursor-pointer"
              data-tip="Messages"
              onClick={() => router.push(`/bookmark/`)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FavoriteOutlinedIcon />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favorite</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/*
            <div
              className="w-10 h-10 flex border hover:shadow-[0px_4px_20px_rgba(0,0,0,0.3)] items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer"
              data-tip="Messages"
              onClick={() => router.push(`/chat/`)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative flex items-center justify-center">
                      <ChatBubbleOutlinedIcon className="absolute" />
                      <div className="absolute z-10">
                        <Unreadmessages userId={userId} />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div
                      onClick={() => router.push(`/chat/`)}
                      className="flex gap-1"
                    >
                      Chats
                      <Unreadmessages userId={userId} />
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
 */}
            <div className="mr-2 ml-2">
              <SignedIn>
                {userstatus === "Admin" && (
                  <>
                    <Link href="/home">
                      <button
                        className={`flex gap-1 items-center text-black px-4 py-2 rounded-full bg-white border hover:bg-gray-100`}
                      >
                        <SettingsOutlinedIcon /> Dashboard
                      </button>
                    </Link>
                  </>
                )}
              </SignedIn>

              <SignedOut>
                <Link href="/sign-in">
                  <button
                    className={`flex gap-1 items-center  text-black px-4 py-2 border rounded-full bg-white hover:bg-gray-100`}
                  >
                    <LockPersonOutlinedIcon /> Login | Sign In
                  </button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
        {cartItems > 0 && (
          <>
            <Link
              href={`/cart/${userId}`}
              passHref
              className="relative inline-block mr-2"
            >
              {/* Add to Cart Button */}
              <button className="p-2 bg-black rounded-full text-white hover:bg-gray-800 focus:outline-none">
                <ShoppingCartOutlinedIcon className="h-6 w-6" />
              </button>

              {/* Badge */}
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>
          </>
        )}
        <div className="flex items-center p-1 gap-2 rounded-full border">
          <SignedIn>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <MobileNav userstatus={userstatus} userId={userId} comp={comp} />
        </div>
      </div>
      <div>
        <Header />
        <AppPopup />
      </div>
    </div>
  );
}
