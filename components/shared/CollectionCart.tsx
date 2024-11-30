"use client";

import React, { useState } from "react";

import Pagination from "./Pagination";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { IProduct } from "@/lib/database/models/product.model";
import { NumberExpression } from "mongoose";
import CartItems from "./CartItems";
//import Card from './Card'
//import Pagination from './Pagination'

type CollectionProps = {
  data: any;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  userId: string;
  userName: string;
  userImage: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionCart = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  userId,
  userName,
  userImage,
}: CollectionProps) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <ul>
            <li className="m-2 col-span-2">
              <div className="ml-4 mr-4">
                <div className="flex items-center gap-4">
                  PRODUCT
                  <div className="flex-grow"></div>
                  <div className="flex items-center gap-2 mr-10">Qunatity</div>
                  <span className="lg:text-lg font-medium">Total Price</span>
                </div>
              </div>
            </li>
            {data.map((order: any, index: number) => {
              return (
                <li
                  key={order._id}
                  className="m-2 col-span-2 bg-white p-6 shadow rounded-lg ]"
                >
                  <CartItems order={order} userId={userId} />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="font-bold text-[16px] lg:text-[25px]">{emptyTitle}</h3>
          <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
};

export default CollectionCart;
