// components/Chat.js

import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import DashboardPay from "@/components/shared/dashboardPay";
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
  //const recipientUid = id;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 100;
  const status = "pending";
  const cart: any = await getallOdersByuserId(userId, limit, page, status);
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  const totalAmount = cart.data.reduce((total: any, item: any) => {
    return total + item.qty * item.price;
  }, 0);
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
              <h1 className="text-3xl font-semibold mb-8">Your cart</h1>

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
                  emptyTitle={`No Cart Found`}
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

              {/* Cart Summary */}
              <div className="lg:w-[30%] bg-white p-6 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Estimated total</h2>
                <div className="text-xl font-bold">
                  KSh {totalAmount.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Taxes included.</p>

                <Link href={`/checkout/${userId}`} passHref>
                  <button className="w-full bg-black text-white py-2 mt-4 rounded">
                    Check out
                  </button>
                </Link>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer>
            <Footer comp={comp} />
          </footer>
        </div>
      </div>
    </>
  );
};

export default Cart;
