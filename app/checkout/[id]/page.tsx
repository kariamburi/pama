// components/Chat.js

import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { SearchParamProps } from "@/types";
import { getallOdersByuserId } from "@/lib/actions/order.actions";

import { getAllDeliveries } from "@/lib/actions/delivery.actions";
import { CheckoutForm } from "@/components/shared/CheckoutForm";
import { getUserDetails } from "@/lib/actions/user.actions";
import Footer from "@/components/shared/Footer";
type payProps = {
  params: {
    id: string;
  };
};
const Checkout = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  //const alltrans = await getallTransaction(userId);
  const userName = sessionClaims?.userName as string;
  const userEmail = sessionClaims?.userEmail as string;
  const userImage = sessionClaims?.userImage as string;
  //const recipientUid = id;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 100;
  // const shipping = Number(searchParams?.shipping) || 0;
  // const tip = Number(searchParams?.tip) || 0;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  const status = "pending";
  const deliv = await getAllDeliveries();
  //console.log("deliv:" + deliv);
  const cart: any = await getallOdersByuserId(userId, limit, page, status);

  const totalAmount = cart.data.reduce((total: any, item: any) => {
    return total + item.qty * item.price;
  }, 0);
  //console.log(cart);
  return (
    <>
      <div className="top-0 z-10  w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>
      <div className="min-h-screen p-1 lg:p-4 bg-gray-100">
        <CheckoutForm
          data={cart?.data}
          totalAmount={totalAmount}
          deliv={deliv}
          userId={userId}
          userEmail={userEmail}
        />
      </div>
      <footer>
        <Footer comp={comp} />
      </footer>
    </>
  );
};

export default Checkout;
