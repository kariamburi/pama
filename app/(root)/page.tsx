import dynamic from "next/dynamic";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Link from "next/link";

import MenuSubmobile from "@/components/shared/MenuSubmobile";
//import Collection from "@/components/shared/Collection";
import { createUser } from "@/lib/actions/user.actions";
import { getfcmTokenFromCookie } from "@/lib/actions/cookies";
import AppPopup from "@/components/shared/AppPopup ";
import { getAllProducts } from "@/lib/actions/ad.product";
import SkeletonCard from "@/components/shared/SkeletonCard";
import SkeletonCardMobile from "@/components/shared/SkeletonCardMobile";
import { Menu } from "lucide-react";
import Filters from "@/components/shared/Filters";
import MenuWithDropdown from "@/components/shared/MenuWithDropdown";
import { FilterPopup } from "@/components/shared/FilterPopup";
import ResponsiveMenuWithSubmenus from "@/components/shared/ResponsiveMenuWithSubmenus";
import { PopoverOccassion } from "@/components/shared/PopoverOccassion";
import { PopoverFabric } from "@/components/shared/PopoverFabric";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { PopoverPrice } from "@/components/shared/PopoverPrice";
import { PopoverSize } from "@/components/shared/PopoverSize";
import { PopoverColor } from "@/components/shared/PopoverColor";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { formatKsh } from "@/lib/help";
import { RemoveAll } from "@/components/shared/RemoveAll";
import FilterSheet from "@/components/shared/FilterSheet";
import { createDelivery } from "@/lib/actions/delivery.actions";
import { ComboTrending } from "@/components/shared/ComboTrending";
import CollectionInfinite from "@/components/shared/CollectionInfinite";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;
  const page = Number(searchParams?.page) || 1;

  const searchText = (searchParams?.query as string) || "";

  const sortby = (searchParams?.sortby as string) || "";

  const category = (searchParams?.category as string) || "";
  const gender = (searchParams?.gender as string) || "";
  const kids = (searchParams?.kids as string) || "";
  const product = (searchParams?.product as string) || "";
  const material = (searchParams?.material as string) || "";
  const occassion = (searchParams?.occassion as string) || "";
  const color = (searchParams?.color as string) || "";
  const price = (searchParams?.price as string) || "";
  const [minPrice, maxPrice] = price.split("-");

  const feedback = product ? gender + "-" + product : "Product";
  return (
    <main>
      <div className="max-w-6xl mx-auto flex mt-0">
        <div className="flex-1">
          <div className="p-2 mt-[195px] lg:mt-0 mb-20 lg:mb-0">
            <div className="flex justify-between m-2">
              <div className="flex font-bold items-center gap-1">
                {category && (
                  <div className="flex gap-1">
                    <div className="items-center text-sm lg:text-base underline">
                      {category}
                    </div>
                  </div>
                )}
                {gender && (
                  <div className="flex gap-1">
                    <KeyboardArrowRightOutlinedIcon />
                    <div className="items-center text-sm lg:text-base underline">
                      {gender}
                    </div>
                  </div>
                )}
                {kids && (
                  <div className="flex gap-1">
                    <KeyboardArrowRightOutlinedIcon />
                    <div className="items-center text-sm lg:text-base underline">
                      {kids}
                    </div>
                  </div>
                )}
                {product && (
                  <div className="flex gap-1">
                    <KeyboardArrowRightOutlinedIcon />
                    <div className="items-center text-sm lg:text-base underline">
                      {product}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-1 flex justify-between items-center">
              <div className="hidden lg:inline">
                <div className="flex p-1 items-center gap-1">
                  <div>Filter:</div>
                  <PopoverOccassion category={category} gender={gender} />
                  <PopoverFabric category={category} gender={gender} />
                  <PopoverPrice />
                  <PopoverColor />
                </div>
              </div>
              <FilterSheet />
              <ComboTrending />
            </div>
            <div className="flex p-1 w-full items-center justify-between">
              <div className="flex items-center gap-1">
                {occassion && (
                  <div className="flex text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1">
                    <div className="font-bold">Occassion:</div>
                    <div>{occassion}</div>
                  </div>
                )}
                {material && (
                  <div className="flex text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1">
                    <div className="font-bold">Material:</div>
                    <div>{material}</div>
                  </div>
                )}
                {price && (
                  <div className="flex text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1">
                    <div className="flex gap-1">
                      <div className="font-bold">Min:</div>
                      <div>{formatKsh(minPrice)}</div>
                    </div>
                    <div className="flex gap-1">
                      <div className="font-bold">Max:</div>
                      <div>{formatKsh(maxPrice)}</div>
                    </div>
                  </div>
                )}
                {color && (
                  <div className="flex text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1">
                    <div className="font-bold">Color:</div>
                    <div>{color}</div>
                  </div>
                )}
                {(occassion || material || price || color) && (
                  <>
                    <RemoveAll
                      category={category}
                      gender={gender}
                      kids={kids}
                      product={product}
                    />
                  </>
                )}
              </div>
            </div>
            {sortby && (
              <>
                <div className="flex w-full items-center justify-between gap-5 p-2 md:flex-row">
                  <div className="items-center flex">
                    <h2 className="font-bold p-2 text-[30px]">{sortby}</h2>
                  </div>
                </div>
              </>
            )}

            <CollectionInfinite
              gender={gender}
              kids={kids}
              emptyTitle={`No (${feedback}) Found`}
              emptyStateSubtext="Come back later"
              collectionType="All_Ads"
              limit={20}
              product={product}
              material={material}
              occassion={occassion}
              price={price}
              color={color}
              userId={userId}
              userName={userName}
              userImage={userImage}
              searchText={searchText}
              sortby={sortby}
              category={category}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
