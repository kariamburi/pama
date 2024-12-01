"use server";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Skeleton from "@mui/material/Skeleton";

import { auth } from "@clerk/nextjs/server";
import { SearchParamProps } from "@/types";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Footersub from "@/components/shared/Footersub";
import Contact from "@/components/shared/contact";
import { Toaster } from "@/components/ui/toaster";
import { getAllProducts, getProductById } from "@/lib/actions/ad.product";
//import ProductAddCart from "@/components/shared/ProductAddCart";
import { ProductAddCart } from "@/components/shared/ProductAddCart";
import { getUserDetails } from "@/lib/actions/user.actions";
const CollectionRelated = dynamic(
  () => import("@/components/shared/CollectionRelated"),
  {
    ssr: false,
    loading: () => (
      <div>
        <div className="w-full h-[300px] mb-2 bg-white rounded-lg flex flex-col items-center justify-center">
          <Image
            src="/assets/icons/loading2.gif"
            alt="loading"
            width={40}
            height={40}
            unoptimized
          />
        </div>
      </div>
    ),
  }
);

const AdDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;
  const product = await getProductById(id);
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <>
      <div className="top-0 z-10 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId || ""} />
      </div>
      <div className="flex flex-col max-w-6xl mx-auto mt-[40px] lg:mt-[70px]">
        <div className="text-sm p-0 hidden lg:inline">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-full mr-1">
              <Link
                className="flex hover:bg-gray-100 p-2 rounded-lg"
                href={`/`}
              >
                <div className="flex cursor-pointer items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-2 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    ></path>
                  </svg>
                  <p className="text-xs lg:text-sm"> All Products</p>
                </div>
              </Link>
            </div>
            <div className="bg-white p-1 rounded-full mr-1">
              <div className="flex items-center">
                {product && (
                  <Link
                    className="flex hover:bg-gray-100 p-2 rounded-lg"
                    href={`/category=${encodeURIComponent(product.category)}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-2 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      ></path>
                    </svg>
                    <p className="text-xs lg:text-sm">{product.category}</p>
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-white p-1 rounded-full mr-1">
              <div className="flex items-center">
                {product && (
                  <Link
                    className="flex hover:bg-gray-100 p-2 rounded-lg"
                    href={`/?category=${encodeURIComponent(
                      product.category
                    )}&gender=${encodeURIComponent(product.genderAgeGroup)}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-2 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      ></path>
                    </svg>
                    <p className="text-xs lg:text-sm">
                      {product.genderAgeGroup}
                    </p>
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-white p-1 rounded-full">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                {product && (
                  <p className="text-xs lg:text-sm">{product.productName}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <ProductAddCart product={product} userId={userId} />
        </div>

        <div className="p-1 mb-24 lg:mb-0">
          <h2 className="mt-4 font-bold p-2 text-[30px]">You may also like</h2>
          <CollectionRelated
            emptyTitle="No Related Item Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Ads"
            limit={16}
            userId={userId || ""}
            userName={userName || ""}
            userImage={userImage || ""}
            product={product}
            adId={id}
          />
          <Toaster />
        </div>

        <footer>
          <div>
            <Footersub />
          </div>
        </footer>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 lg:bg-transparent h-auto md:h-24 z-10 p-3 shadow-md flex flex-col md:flex-row justify-between items-center">
          <Contact
            product={product}
            userId={userId || ""}
            userName={userName || ""}
            userImage={userImage || ""}
          />
        </div>
      </div>
    </>
  );
};

export default AdDetails;
