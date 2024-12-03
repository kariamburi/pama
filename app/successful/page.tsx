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
import {
  getallOdersByuserId,
  getOrdersByOrderId,
  updatePendingOrdersToSuccessful,
  updateProductStock,
} from "@/lib/actions/order.actions";
import CartItems from "@/components/shared/CartItems";
import CollectionCart from "@/components/shared/CollectionCart";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import { getUserDetails } from "@/lib/actions/user.actions";
import OrdersPageSkeleton from "@/components/shared/OrdersPageSkeleton";
import Successful from "@/components/shared/Successful";
import ReceiptSkeleton from "@/components/shared/ReceiptSkeleton";
type payProps = {
  params: {
    id: string;
  };
};
const Receipt = async ({ searchParams }: SearchParamProps) => {
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
  const phone = comp.phone;
  const orderId = searchParams?.OrderTrackingId as string;
  const ps = await updateProductStock(orderId);
  const pt = await updatePendingOrdersToSuccessful(orderId, phone);
  const orders = await getOrdersByOrderId(orderId);
  if (!orders || !feedback || !ps || !pt) {
    return (
      <div>
        <ReceiptSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen p-1 lg:p-4 bg-gray-100">
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}

          {/* Cart Section */}
          <main className="flex-grow">
            <Successful orders={orders} comp={comp} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Receipt;
