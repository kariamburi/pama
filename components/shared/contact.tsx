"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useState } from "react";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Link from "next/link";
import Image from "next/image";

import { IProduct } from "@/lib/database/models/product.model";
import { updatecalls, updatewhatsapp } from "@/lib/actions/ad.product";
type chatProps = {
  userId: string;
  userName: string;
  userImage: string;
  product: IProduct;
};
const Contact = ({ product, userId, userName, userImage }: chatProps) => {
  const [showphone, setshowphone] = useState(false);
  const handleShowPhoneClick = async (e: any) => {
    setshowphone(true);
    const calls = (Number(product.calls ?? "0") + 1).toString();
    const _id = product._id;
    await updatecalls({
      _id,
      calls,
      path: `/product/${product._id}`,
    });
    window.location.href = `tel:${product.organizer.phone}`;
  };

  const handlewhatsappClick = async (e: any) => {
    const whatsapp = (Number(product.whatsapp ?? "0") + 1).toString();
    const _id = product._id;
    await updatewhatsapp({
      _id,
      whatsapp,
      path: `/product/${product._id}`,
    });
    window.location.href = `https://wa.me/${product.organizer.whatsapp}/`;
  };

  return (
    <div className="w-full">
      {/*  <div className="lg:hidden justify-between flex w-full gap-1">
        <Verificationmobile
          user={product.organizer}
          userId={userId}
          isAdCreator={isAdCreator}
        />
        <Ratingsmobile recipientUid={ad.organizer._id} />
      </div>
       */}
      <div className="justify-between lg:justify-end flex w-full gap-1">
        <div className="lg:hidden flex gap-1 items-center p-1 w-full">
          <div className="flex items-center gap-4">
            <img
              src={product.organizer.photo}
              alt={`${product.organizer.firstName} ${product.organizer.lastName}`}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <h2 className="font-semibold">Contact</h2>
              <p className="text-sm">{`${product.organizer.firstName} ${product.organizer.lastName}`}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-1 items-center p-1 lg:mr-10">
          <SignedIn>
            <button
              className="hover:bg-gray-700 bg-[#000000] text-white mt-2 p-4 rounded-lg shadow"
              onClick={handleShowPhoneClick}
            >
              <CallIcon sx={{ fontSize: 24 }} />

              <div className="hidden lg:inline">Call</div>
            </button>
          </SignedIn>
          <SignedOut>
            <a href={`/sign-in`}>
              <button className="hover:bg-gray-700 bg-[#000000] text-white mt-2 p-4 rounded-lg shadow">
                <CallIcon sx={{ fontSize: 24 }} />
                <div className="hidden lg:inline">Call</div>
              </button>
            </a>
          </SignedOut>

          {product.organizer.whatsapp && (
            <>
              <SignedIn>
                <button
                  onClick={handlewhatsappClick}
                  className="hover:bg-emerald-700 bg-[#30AF5B] text-white mt-2 p-4 rounded-lg shadow"
                >
                  <WhatsAppIcon sx={{ fontSize: 24 }} />

                  <div className="hidden lg:inline">WhatsApp</div>
                </button>
              </SignedIn>
              <SignedOut>
                <a href={`/sign-in`}>
                  <button className="hover:bg-emerald-700 bg-[#30AF5B] text-white mt-2 p-4 rounded-lg shadow">
                    <WhatsAppIcon sx={{ fontSize: 24 }} />

                    <div className="hidden lg:inline">WhatsApp</div>
                  </button>
                </a>
              </SignedOut>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
