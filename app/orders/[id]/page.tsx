// components/Chat.js

import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import ContactForm from "@/components/shared/ContactForm";
import DeliveryDetails from "@/components/shared/DeliveryDetails";
import ShippingMethod from "@/components/shared/ShippingMethod";
import PaymentSection from "@/components/shared/PaymentSection";
import TipSection from "@/components/shared/TipSection";
import OrderSummary from "@/components/shared/OrderSummary";
import Footer from "@/components/shared/Footer";
import { getallOdersByuserId } from "@/lib/actions/order.actions";
import CartItems from "@/components/shared/CartItems";
import CollectionCart from "@/components/shared/CollectionCart";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { getUserDetails } from "@/lib/actions/user.actions";
import OrdersPageSkeleton from "@/components/shared/OrdersPageSkeleton";
type payProps = {
  params: {
    id: string;
  };
};
const Cart = async ({ searchParams }: SearchParamProps) => {
  //const trans = await getpayTransaction(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  //const alltrans = await getallTransaction(userId);
  const userName = sessionClaims?.userName as string;
  //  const userEmail = sessionClaims?.userEmail as string;
  const userImage = sessionClaims?.userImage as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const status = "successful";
  const cart: any = await getallOdersByuserId(userId, limit, page, status);
  const totalAmount = cart.data.reduce((total: any, item: any) => {
    return total + item.qty * item.price;
  }, 0);
  if (!cart || !feedback) {
    return (
      <div>
        <OrdersPageSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="top-0 z-10  w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}

          {/* Cart Section */}
          <main className="flex-grow bg-gray-50 py-10 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold mb-8">My Orders</h1>

              <Link
                href="/"
                className="underline text-gray-700 hover:text-black"
              >
                Continue shopping?
              </Link>
            </div>
            <div className="lg:m-1 space-y-0 lg:flex lg:space-x-5 gap-8">
              {/* Cart Items */}
              <div className="lg:flex-1">
                <CollectionCart
                  data={cart?.data}
                  emptyTitle={`You have (0) Order Found`}
                  emptyStateSubtext="Come back later"
                  collectionType="All_Ads"
                  limit={limit}
                  page={page}
                  totalPages={cart?.totalPages}
                  userId={userId}
                  userName={userName}
                  userImage={userImage}
                />
                <Toaster />
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-100">
            <Footer comp={comp} />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Cart;
