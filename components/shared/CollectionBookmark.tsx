import React, { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";

import { getallBookmarkByuserId } from "@/lib/actions/bookmark.actions";
import Image from "next/image";
import { IProduct } from "@/lib/database/models/product.model";
import ProductCard from "./ProductCard";
import ProductCardBookMark from "./ProductCardBookMark";
import SkeletonCardMobile from "./SkeletonCardMobile";
import SkeletonCard from "./SkeletonCard";
type CollectionProps = {
  userId: string;
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  urlParamName?: string;
  isAdCreator: boolean;
  isVertical: boolean;
  collectionType?: "Ads_Organized" | "My_Tickets" | "All_Ads";
};

const CollectionBookmark = ({
  //data,
  userId,
  emptyTitle,
  emptyStateSubtext,
  // page,
  // totalPages = 0,
  collectionType,
  urlParamName,
  isAdCreator,
  isVertical,
}: CollectionProps) => {
  const [data, setAds] = useState<IProduct[]>([]); // Initialize with an empty array
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const observer = useRef();
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const bookmark = await getallBookmarkByuserId(userId);

      // Update ads state using the latest prevAds for filtering
      setAds((prevAds: IProduct[]) => {
        const existingAdIds = new Set(prevAds.map((ad) => ad._id));

        // Filter out ads that are already in prevAds
        const newAds = bookmark?.data.filter(
          (ad: IProduct) => !existingAdIds.has(ad._id)
        );

        return [...prevAds, ...newAds]; // Return updated ads
      });
      setTotalPages(bookmark?.totalPages || 1);
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
    <>
      {data.length > 0 ? (
        isVertical ? (
          <div className="flex flex-col bg-grey-50 rounded-lg items-center gap-10 p-1 lg:p-2">
            <ul className="grid w-full grid-cols-2 gap-1 lg:gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
              {data.map((prod: any, index: number) => {
                if (data.length === index + 1) {
                  return (
                    <div
                      ref={lastAdRef}
                      key={prod._id}
                      className="flex justify-center"
                    >
                      {/* Render Ad */}
                      <ProductCardBookMark
                        product={prod.adId}
                        userId={userId}
                        index={index}
                        trendingStatus={"Favorite"}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={prod._id} className="flex justify-center">
                      {/* Render Ad */}
                      <ProductCardBookMark
                        product={prod.adId}
                        userId={userId}
                        index={index}
                        trendingStatus={"Favorite"}
                      />
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        ) : (
          <div className="flex p-1 bg-grey-50 rounded-lg">
            <ul className="w-full">
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
                        trendingStatus={"Favorite"}
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
                        trendingStatus={"Favorite"}
                      />
                    </div>
                  );
                }
              })}
            </ul>
          </div>
        )
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
    </>
  );
};

export default CollectionBookmark;
