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
import { createUser, getUserDetails } from "@/lib/actions/user.actions";
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
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HomepageSkeleton from "@/components/shared/HomepageSkeleton";
import Navbarhome from "@/components/shared/navbarhome";
import Head from "next/head";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";

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

  const company = await getUserDetails(userId);
  const comp = company.adminUser;
  const user = company.user;

  if (!company) {
    return (
      <div>
        <HomepageSkeleton />
      </div>
    );
  }
  return (
    <main>
      <div className="min-h-screen">
        <Head>
          <title>Pama | Buy Pure Turkey Ware in Kenya</title>
          <meta
            name="description"
            content="Pama is Kenya's premier online store specializing in Pure Turkey ware. Shop for the best quality clothes and accessories at affordable prices."
          />
          <meta
            property="og:title"
            content="Pama | Pure Turkey Ware Store in Kenya"
          />
          <meta
            property="og:description"
            content="Pama offers the finest Pure Turkey ware in Kenya. Browse our selection of high-quality clothes, and accessories available for delivery nationwide."
          />
          <meta property="og:image" content="/assets/images/logo.png" />
          <meta property="og:url" content="https://pama.co.ke" />
          <meta property="og:type" content="website" />
          <meta
            name="keywords"
            content="Pama, Pure Turkey ware, Turkey collections, Turkey clothes,Turkey accessories, Kenya"
          />
          <meta name="author" content="Pama" />
          <link rel="canonical" href="https://pama.co.ke" />
        </Head>

        <div className="w-full h-full">
          <div className="sm:hidden fixed top-0 z-10 w-full">
            {user ? (
              <Navbarhome
                userstatus={user.status}
                comp={comp}
                userId={userId}
              />
            ) : (
              <Navbarhome userstatus="User" comp={comp} userId="" />
            )}
          </div>
          <div className="hidden sm:inline">
            <div className="w-full">
              {user ? (
                <Navbarhome
                  userstatus={user.status}
                  comp={comp}
                  userId={userId}
                />
              ) : (
                <Navbarhome userstatus="User" comp={comp} userId="" />
              )}
            </div>
          </div>
          <div className="max-w-6xl bg-gray-100 lg:bg-white mx-auto flex mt-0">
            <div className="flex-1">
              <div className="p-2 mt-[195px] lg:mt-0 mb-5 lg:mb-0">
                <div className="flex justify-between m-2">
                  <div className="flex font-bold items-center gap-1">
                    {category && (
                      <div className="flex gap-1">
                        <div className="text-xs text-gray-400">
                          <AccountTreeOutlinedIcon />
                        </div>
                        <div className="items-center text-sm lg:text-base underline">
                          {category}
                        </div>
                      </div>
                    )}
                    {gender && (
                      <div className="flex gap-1">
                        <div className="text-xs text-gray-400">
                          <KeyboardArrowRightOutlinedIcon />
                        </div>
                        <div className="items-center text-sm lg:text-base underline">
                          {gender}
                        </div>
                      </div>
                    )}
                    {kids && (
                      <div className="flex gap-1">
                        <div className="text-xs text-gray-400">
                          <KeyboardArrowRightOutlinedIcon />
                        </div>
                        <div className="items-center text-sm lg:text-base underline">
                          {kids}
                        </div>
                      </div>
                    )}
                    {product && (
                      <div className="flex gap-1">
                        <div className="text-xs text-gray-400">
                          <KeyboardArrowRightOutlinedIcon />
                        </div>

                        <div className="items-center text-sm lg:text-base underline">
                          {product}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-gray-100 rounded-xl p-1 flex justify-between items-center">
                  <div className="hidden lg:inline">
                    <div className="flex p-1 items-center gap-1">
                      <div>Filter:</div>
                      <PopoverOccassion category={category} gender={gender} />
                      <PopoverFabric category={category} gender={gender} />
                      <PopoverPrice />
                      <PopoverColor />
                    </div>
                  </div>
                  <FilterPopup />
                  <ComboTrending />
                </div>
                <div className="flex p-1 w-full items-center justify-between">
                  <div className="grid grid-cols-3 flex items-center gap-1">
                    {occassion && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full cursor-pointer text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1 truncate">
                              {occassion}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p> {occassion}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {material && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full cursor-pointer text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1 truncate">
                              {material}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p> {material}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {price && (
                      <div className="flex text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1">
                        <div className="flex gap-1">
                          <div>{formatKsh(minPrice)}</div>
                        </div>
                        -
                        <div className="flex gap-1">
                          <div>{formatKsh(maxPrice)}</div>
                        </div>
                      </div>
                    )}
                    {color && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full cursor-pointer text-[10px] text-white bg-gray-800 border rounded-full p-2 gap-1 truncate">
                              {color}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p> {color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
                  comp={comp}
                />
              </div>
            </div>
          </div>
          <Toaster />

          <footer className="bg-white lg:bg-gray-100 border-t">
            <Footer comp={comp} />
            {/*<div className="hidden lg:inline">
    <Footer comp={comp} />
  </div>
   <div className="lg:hidden">
    <BottomNavigation userId={userId} />
  </div>*/}
          </footer>
        </div>
      </div>
    </main>
  );
}
