"use client";

import React, { useEffect, useRef, useState } from "react";

import Pagination from "./Pagination";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getAllProducts,
  getRelatedProductsByCategory,
} from "@/lib/actions/ad.product";
import ProductCard from "./ProductCard";
import { IProduct } from "@/lib/database/models/product.model";
//import Card from './Card'
//import Pagination from './Pagination'

type CollectionProps = {
  //  data: IAd[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  product: any;
  adId: string;

  urlParamName?: string;
  userId: string;
  userName: string;
  userImage: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionRelated = ({
  // data,
  emptyTitle,
  emptyStateSubtext,
  // page,
  // totalPages = 0,
  collectionType,
  urlParamName,
  product,
  adId,
  userId,
  userName,
  userImage,
}: CollectionProps) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };
  const pathname = usePathname();
  const isAdCreator = pathname === "/ads/";

  const [data, setAds] = useState<IProduct[]>([]); // Initialize with an empty array
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const observer = useRef();
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      //const categoryList = await getAllCategories();
      const relatedAds: any = await getRelatedProductsByCategory({
        category: product.category,
        subCategory: product.subCategory,
        occasion: product.occasion,
        genderAgeGroup: product.genderAgeGroup,
        productId: product._id,
        page,
        limit: 20,
      });

      // Update ads state using the latest prevAds for filtering
      setAds((prevAds: IProduct[]) => {
        const existingAdIds = new Set(prevAds.map((ad) => ad._id));

        // Filter out ads that are already in prevAds
        const newAds = relatedAds?.data.filter(
          (ad: IProduct) => !existingAdIds.has(ad._id)
        );

        return [...prevAds, ...newAds]; // Return updated ads
      });
      setTotalPages(relatedAds?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching ads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [page]);

  const lastAdRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage((prevPage: any) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 p-0">
          <div className="grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {data.map((prod: any, index: number) => {
              if (data.length === index + 1) {
                return (
                  <div
                    ref={lastAdRef}
                    key={prod._id}
                    className="flex justify-center"
                  >
                    {/* Render Ad */}
                    <ProductCard
                      product={prod}
                      userId={userId}
                      index={index}
                      trendingStatus={""}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={prod._id} className="flex justify-center">
                    {/* Render Ad */}
                    <ProductCard
                      product={prod}
                      userId={userId}
                      index={index}
                      trendingStatus={""}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        loading === false && (
          <>
            <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
              <h3 className="font-bold text-[16px] lg:text-[25px]">
                {emptyTitle}
              </h3>
              <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
            </div>
          </>
        )
      )}

      {loading && (
        <div>
          <div className="w-full mt-10 h-full flex flex-col items-center justify-center">
            <Image
              src="/assets/icons/loading2.gif"
              alt="loading"
              width={40}
              height={40}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionRelated;
