"use client";

import { useState, useEffect, useRef } from "react";

import Pagination from "./Pagination";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAllProducts } from "@/lib/actions/ad.product";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import SkeletonCardMobile from "./SkeletonCardMobile";
import { IProduct } from "@/lib/database/models/product.model";

type CollectionProps = {
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  kids: string;
  userId: string;
  userName: string;
  userImage: string;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
  searchText: string;
  sortby: string;
  category: string;
  gender: string;
  product: string;
  material: string;
  occassion: string;
  price: string;
  color: string;
};

const CollectionInfinite = ({
  emptyTitle,
  emptyStateSubtext,
  gender,
  userId,
  userName,
  userImage,
  searchText,
  sortby,
  category,
  kids,
  product,
  material,
  occassion,
  price,
  color,
}: CollectionProps) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };
  const pathname = usePathname();
  const [newpage, setnewpage] = useState(false);
  const [data, setAds] = useState<IProduct[]>([]); // Initialize with an empty array
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [trendingStatus, settrendingStatus] = useState("");
  const [loading, setLoading] = useState(true);
  // const observer = useRef();
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const Products = await getAllProducts({
        query: searchText,
        sortby: sortby,
        category: category,
        gender: gender,
        kids: kids,
        product: product,
        material: material,
        occassion: occassion,
        price: price,
        color: color,
        page,
        limit: 20,
      });
      settrendingStatus(Products?.trendingStatus ?? "");
      if (newpage) {
        setnewpage(false);
        setAds((prevAds: IProduct[]) => {
          const existingAdIds = new Set(prevAds.map((ad) => ad._id));

          // Filter out ads that are already in prevAds
          const newAds = Products?.data.filter(
            (ad: IProduct) => !existingAdIds.has(ad._id)
          );

          return [...prevAds, ...newAds]; // Return updated ads
        });
      } else {
        setnewpage(false);
        setAds(Products?.data);
      }

      setTotalPages(Products?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching ads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!newpage) {
      setPage(1);
    }
    fetchAds();
  }, [
    page,
    sortby,
    category,
    gender,
    kids,
    product,
    material,
    occassion,
    price,
    color,
  ]);

  const lastAdRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) {
        setnewpage(true);
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
                      trendingStatus={trendingStatus}
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
                      trendingStatus={trendingStatus}
                    />
                  </div>
                );
              }
            })}
          </div>
          <FloatingChatIcon phone={data[0].organizer.whatsapp ?? ""} />
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
        <div className="flex items-center justify-center w-full">
          <div className="hidden lg:inline mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <div className="mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
          <div className="lg:hidden mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
            <SkeletonCardMobile />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionInfinite;
