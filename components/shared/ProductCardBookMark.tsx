import { IProduct } from "@/lib/database/models/product.model";
import React, { useCallback, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { DeleteConfirmation } from "./DeleteConfirmation";
import ProductWindow from "./ProductWindow";
import ProductWindowUpdate from "./ProductWindowUpdate";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { toast, useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
import { updatebookmarked } from "@/lib/actions/ad.product";
import { createBookmark, deleteBookmark } from "@/lib/actions/bookmark.actions";
type CardProps = {
  product: any;
  userId: string;
  index: number;
  trendingStatus: string;
};

const ProductCardBookMark = ({
  product,
  userId,
  index,
  trendingStatus,
}: CardProps) => {
  const [isLoadingpopup, setIsLoadingpopup] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const truncateDescription = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  const handle = async (id: string) => {
    if (userId) {
      const newBookmark = await createBookmark({
        bookmark: {
          userBId: userId,
          adId: id,
        },
        path: pathname,
      });
      if (newBookmark === "Product Saved to Favorite") {
        const bookmarked = (Number(product.bookmarked ?? "0") + 1).toString();
        const _id = product._id;
        await updatebookmarked({
          _id,
          bookmarked,
          path: pathname,
        });
        toast({
          title: "Alert",
          description: newBookmark,
          duration: 5000,
          className: "bg-[#30AF5B] text-white",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed!",
          description: newBookmark,
          duration: 5000,
        });
      }
    } else {
      window.location.reload();
    }
  };
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: any) => {
    setIsZoomed(shouldZoom);
  }, []);
  const handledeletebk = async (id: string) => {
    const delBookmark = await deleteBookmark({
      bookmark: {
        userBId: userId,
        adId: id,
      },
      path: pathname,
    });
    if (delBookmark === "Favorite deleted successfully") {
      const bookmarked = (Number(product.bookmarked ?? "1") - 1).toString();
      const _id = product._id;
      await updatebookmarked({
        _id,
        bookmarked,
        path: pathname,
      });
      toast({
        variant: "destructive",
        title: "Deleted!",
        description: delBookmark,
        duration: 5000,
      });
    }
  };
  return (
    <>
      <div
        style={{
          animation: `fadeIn 0.3s ease-out ${(index + 1) * 0.1}s forwards`,
          opacity: 0,
        }}
        className="w-full max-w-[400px] border rounded-xl bg-white"
      >
        {/* Product Image */}
        <div className="w-full overflow-hidden  rounded-t-xl">
          <div className="relative h-400 lg:h-[420px] rounded-t-xl w-full">
            <div className="absolute top-2 left-2 z-10 w-full">
              <SignedIn>
                <div
                  className="w-8 h-8 p-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom hover:cursor-pointer hover:bg-gray-200"
                  data-tip="Favorite"
                  onClick={() => handle(product._id)}
                >
                  <FavoriteOutlinedIcon sx={{ fontSize: 16 }} />
                </div>
              </SignedIn>

              <SignedOut>
                <Link href="/sign-in">
                  <div
                    className="w-8 h-8 p-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center rounded-full bg-white text-black tooltip tooltip-bottom hover:cursor-pointer hover:bg-gray-200"
                    data-tip="Favorite"
                  >
                    <FavoriteOutlinedIcon sx={{ fontSize: 16 }} />
                  </div>
                </Link>
              </SignedOut>
            </div>
            {/* Zoom Button */}
            <div className="absolute top-2 right-2 z-10">
              <button
                className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full shadow hover:bg-gray-200"
                onClick={handleZoomChange} // Trigger Zoom modal
              >
                <ZoomInOutlinedIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
            <div className="absolute flex gap-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bottom-4 right-2 bg-white text-black text-[10px] lg:text-xs px-2 py-1 rounded-full shadow-md z-10">
              <LocalFireDepartmentOutlinedIcon sx={{ fontSize: 14 }} />
              <div>{trendingStatus}</div>
            </div>
            {product.featuredInDeals && (
              <>
                {product.featuredInDeals === "Sale" && (
                  <>
                    <div className="absolute flex gap-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bottom-4 left-2 bg-black text-white text-[10px] lg:text-xs px-2 py-1 rounded-full shadow-md z-10">
                      <div>
                        <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                      </div>
                      <div>{product.featuredInDeals}</div>
                    </div>
                  </>
                )}
                {product.featuredInDeals === "Clearance" && (
                  <>
                    <div className="absolute flex gap-1 flex gap-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bottom-4 left-2 bg-blue-800  text-white text-[10px] lg:text-xs px-2 py-1 rounded-full shadow-md z-10">
                      <div>
                        <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                      </div>
                      <div>{product.featuredInDeals}</div>
                    </div>
                  </>
                )}
                {product.featuredInDeals === "Bundles" && (
                  <>
                    <div className="absolute shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bottom-4 left-2 bg-orange-400 text-white text-[10px] lg:text-xs px-2 py-1 rounded-full shadow-md z-10">
                      <div>
                        <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                      </div>
                      <div>{product.featuredInDeals}</div>
                    </div>
                  </>
                )}
              </>
            )}

            {isLoadingpopup && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#000000] bg-opacity-50 rounded-t-xl ">
                {/* Spinner or loading animation */}
                <CircularProgress sx={{ color: "white" }} />
              </div>
            )}
            <div className={isZoomed ? "hidden" : "block"}>
              <Link href={`/product/${product._id}`} passHref>
                <Image
                  src={product.imageUrls[0] || "/placeholder-image.png"}
                  alt={product.productName}
                  width={400}
                  height={400}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`rounded-t-xl object-cover h-full w-full ${
                    isLoadingpopup ? "opacity-0" : "opacity-100"
                  } transition-opacity  transition-transform duration-300 transform ${
                    hoveredIndex === index ? "scale-105" : ""
                  }`}
                  onLoadingComplete={() => setIsLoadingpopup(false)}
                  placeholder="empty"
                />
              </Link>
            </div>
            {/* Zoom Wrapper */}
            <div className={!isZoomed ? "hidden" : "block"}>
              <ControlledZoom
                isZoomed={isZoomed}
                onZoomChange={handleZoomChange}
              >
                {/* <div style={{ display: "none" }}> */}
                <Image
                  src={product.imageUrls[0] || "/placeholder-image.png"}
                  alt={product.productName}
                  width={400}
                  height={400}
                />

                {/*  </div> */}
              </ControlledZoom>
            </div>
          </div>
          {/* Tailwind CSS Keyframes */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>

        {/* Product Details */}
        <div className="mt-1 p-1">
          <div className="flex items-center justify-between">
            <Link href={`/product/${product._id}`} passHref>
              <h3 className="text-sm lg:text-lg cursor-pointer font-semibold text-gray-800 hover:underline">
                {truncateDescription(product.productName, 35)}
              </h3>
            </Link>
            <div
              className="w-7 h-7 lg:w-8 lg:h-8 p-1 mt-[-20px] shadow-lg flex items-center justify-center rounded-full bg-red-100 text-emerald-500 tooltip tooltip-bottom hover:text-[#2BBF4E] hover:cursor-pointer"
              data-tip="Bookmark"
              onClick={() => handledeletebk(product._id)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      src="/assets/icons/delete.svg"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="text-sm"> Delete Ad</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="text-gray-500 text-xs hidden lg:inline">
            {truncateDescription(product.description, 35)}
          </div>
          <div className="text-gray-500 text-[12px] lg:hidden">
            {truncateDescription(product.description, 20)}
          </div>

          <div className="text-gray-700 mb-1">
            {/* Inclusions */}
            <ul className="grid grid-cols-4 lg:grid-cols-5 text-xs items-center gap-1">
              {/* <div className="hidden lg:inline"> Sizes:</div> */}
              {product.features.map((feature: any, index: number) => (
                <li key={index} className="relative">
                  {/* Circular Badge for Stock 
                  {feature.stock > 0 && (
                    <span className="absolute top-0 -right-1 text-[10px] flex items-center justify-center w-4 h-4 text-white bg-green-500 rounded-full">
                      {feature.stock}
                    </span>
                  )}
                    */}
                  {/* Size Display */}
                  <span
                    className={`m-1 text-xs justify-center flex items-center w-7 h-7 rounded-full ${
                      feature.stock > 0
                        ? "text-white bg-black shadow"
                        : "line-through text-gray-500 border"
                    }`}
                  >
                    {feature.size}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center text-[10px] lg:text-xs gap-1 font-medium text-gray-700">
            <div className="flex items-center gap-1">Material:</div>

            <div className="flex font-semibold items-center gap-1">
              {product.fabricCareInstructions}
            </div>
          </div>
          <div className="flex gap-1 text-xs lg:text-base font-medium text-gray-700">
            <span className="line-through text-gray-500">
              Ksh. {product.price.toLocaleString()}
            </span>
            <span className="ml-2 text-[#000000] font-bold">
              Ksh.
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toLocaleString()}
            </span>
            <span className="text-[#000000]">(-{product.discount}%)</span>
          </div>

          {/*
         <p className="text-sm font-medium text-gray-700">
          <span className="font-semibold">Availability:</span>{" "}
          {product.availability === "In Stock" ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
        <p className="text-sm font-medium text-gray-700">
          <span className="font-semibold">Tags:</span> {product.tags}
        </p>

        <p className="text-sm font-medium text-gray-700">
          <span className="font-semibold">Customization:</span>{" "}
          {product.customizationOptions}
        </p>
        

          <p className="text-sm font-medium text-gray-700">
          <span className="font-semibold">Trending:</span>{" "}
          {product.trendingStatus}
        </p>*/}
        </div>

        {/* Add to Cart or Stock Status 
        <div className="mt-4">
        
          <div className="mt-2 text-sm font-semibold">
            {product.features.reduce((total: number, feature: any) => {
              return total + feature.stock;
            }, 0) > 0 ? (
              <>
                <button className="w-full px-3 py-1 bg-black text-white rounded-xl hover:bg-gray-800">
                  Add to Cart
                </button>
              </>
            ) : (
              <div className="text-red-500 w-full font-semibold">
                <button className="ml-2 px-3 py-1 bg-gray-300 text-gray-700 rounded-xl cursor-not-allowed">
                  Out of Stock
                </button>
              </div>
            )}
          </div>
        </div>*/}
      </div>
      <ProductWindowUpdate
        isOpen={isOpen}
        onClose={handleClose}
        userId={userId}
        type={"Update"}
        product={product}
        productId={product._id}
      />
    </>
  );
};

export default ProductCardBookMark;
