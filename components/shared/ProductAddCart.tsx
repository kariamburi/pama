"use client";
import { useRef, useState } from "react";
import { formatKsh } from "@/lib/help";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect } from "react";
//import { Carousel } from "react-responsive-carousel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Link from "next/link";

import Image from "next/image";
import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FloatingChatIcon from "./FloatingChatIcon";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { format, isToday, isYesterday } from "date-fns";

//import SellerProfile from "./SellerProfile";
import { IUser } from "@/lib/database/models/user.model";
import { CreateUserParams } from "@/types";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SettingsOverscanOutlinedIcon from "@mui/icons-material/SettingsOverscanOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";

import CircularProgress from "@mui/material/CircularProgress";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Head from "next/head";

import ShareAd from "./ShareAd";
import { useToast } from "../ui/use-toast";

import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FaMinus, FaPlus } from "react-icons/fa";
import { createOrder, getallOdersByuserId } from "@/lib/actions/order.actions";
import { usePathname } from "next/navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { updateview } from "@/lib/actions/ad.product";
type productProps = {
  product: any;
  userId: string;
};

export const ProductAddCart = ({ product, userId }: productProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState<number>(1); // Default quantity set to 1
  const [isSending, setIsSending] = useState(false);
  const [totalorders, setTotalorders] = useState<number>(0);
  const pathname = usePathname();
  const { toast } = useToast();

  // Filter available sizes that are in stock
  const availableSizes = product.features.filter(
    (feature: any) => feature.stock > 0
  );
  useEffect(() => {
    const updateviewed = async () => {
      const views = ((product.views ? product.views : 0) + 1).toString();
      const _id = product._id;

      await updateview({
        _id,
        views,
        path: `/product/${product._id}`,
      });
    };
    updateviewed();
  }, []);

  useEffect(() => {
    const getadded_cart = async () => {
      try {
        const page = 1;
        const limit = 100;
        const status = "pending";
        const cart: any = await getallOdersByuserId(
          userId,
          limit,
          page,
          status
        );

        setTotalorders(cart.data.length);
      } catch (error) {
        console.error("Error getting last messages:", error);
        return 0; // Return empty array in case of error
      }
    };
    getadded_cart();
  }, [isSending]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Please select a size!",
        duration: 5000,
      });
      return;
    }
    if (quantity == 0) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Please enter Quantity!",
        duration: 5000,
      });
      return;
    }

    const selectedFeature = product.features.find(
      (feature: any) => feature.size === selectedSize
    );

    if (!selectedFeature || selectedFeature.stock <= 0) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "This size is out of stock!",
        duration: 5000,
      });
      return;
    }

    if (selectedFeature.stock < quantity) {
      toast({
        variant: "destructive",
        title: "Failed!",
        description:
          "Quantity in stock for size: " +
          selectedSize +
          " is (" +
          selectedFeature.stock +
          ").",
        duration: 5000,
      });
      return;
    }

    if (userId) {
      setIsSending(true); // Disable the button and show progress

      try {
        const response = await createOrder({
          order: {
            userId: userId,
            productId: product._id,
            size: selectedSize,
            price: product.price - (product.price * product.discount) / 100,
            qty: quantity,
            status: "pending",
          },
          path: pathname,
        });

        toast({
          title: "Alert",
          description: response,
          duration: 5000,
          className: "bg-[#000000] text-white",
        });
        setIsOpen(true);
      } catch (error) {
        console.error("Error adding to cart! ", error);
      } finally {
        setIsSending(false); // Re-enable the button and hide progress
      }
    } else {
      window.location.reload();
    }
  };

  const [isButtonVisible, setIsButtonVisible] = useState(true); // State to control button visibility

  const dataRef = useRef<HTMLDivElement | null>(null); // Reference to the data div

  useEffect(() => {
    const handleScroll = () => {
      if (dataRef.current) {
        const dataDivBottom = dataRef.current.getBoundingClientRect().bottom;
        setIsButtonVisible(dataDivBottom > window.innerHeight - 200); // Hide button if scrolled past
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //const [selectedSize, setSelectedSize] = useState<string | null>(null); // State to track selected size

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Update the selected size state
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1); // Increase quantity by 1
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrease quantity by 1, but not below 1

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity); // Only set quantity if it is 1 or greater
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        ref={dataRef}
        className="border-b lg:m-1 space-y-0 lg:flex lg:space-x-5"
      >
        <div className="">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col gap-6">
              {/* Product Images */}
              <div
                className={`${
                  product.imageUrls.length === 1
                    ? "w-full flex items-center justify-center p-2 rounded-xl"
                    : "grid grid-cols-2 gap-4"
                }`}
              >
                {product.imageUrls.map((url: string, index: number) => (
                  <Zoom>
                    <img
                      key={index}
                      src={url}
                      alt={product.productName}
                      className="rounded-lg max-h-[600px] shadow-lg"
                    />
                  </Zoom>
                ))}
              </div>

              {/* Product Name and Description */}
              <div>
                <h1 className="text-2xl font-bold">{product.productName}</h1>
                <p className="mt-2 text-gray-700">{product.description}</p>
              </div>

              {/* Product Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Details</h2>
                  <ul className="mt-2 text-gray-600">
                    <li>
                      <strong>Occasion:</strong> {product.occasion}
                    </li>

                    <li>
                      <strong>Colors:</strong> {product.color.join(", ")}
                    </li>
                    <li>
                      <strong>Fabric Care:</strong>{" "}
                      {product.fabricCareInstructions}
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Pricing</h2>

                  <ul className="mt-2 text-gray-600">
                    <li>
                      <div className="flex gap-1 text-xs lg:text-base font-medium text-gray-700">
                        <span className="font-semibold">
                          <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} />
                        </span>
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
                        <span className="text-[#000000]">
                          (-{product.discount}%)
                        </span>
                      </div>
                    </li>
                    <li>
                      <strong>Discount:</strong> {product.discount}%
                    </li>
                    <li>
                      {product.featuredInDeals && (
                        <>
                          {product.featuredInDeals === "Sale" && (
                            <>
                              <div className="w-[70px] flex gap-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bg-black text-white text-xs p-1 rounded-full shadow-md">
                                <div>
                                  <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                                </div>
                                <div>{product.featuredInDeals}</div>
                              </div>
                            </>
                          )}
                          {product.featuredInDeals === "Clearance" && (
                            <>
                              <div className="w-[70px] flex gap-1 flex gap-1 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bg-blue-800  text-white text-xs p-1 rounded-full shadow-md">
                                <div>
                                  <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                                </div>
                                <div>{product.featuredInDeals}</div>
                              </div>
                            </>
                          )}
                          {product.featuredInDeals === "Bundles" && (
                            <>
                              <div className="w-[70px] shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bg-orange-400 text-white text-xs p-1 rounded-full shadow-md">
                                <div>
                                  <DiscountOutlinedIcon sx={{ fontSize: 14 }} />{" "}
                                </div>
                                <div>{product.featuredInDeals}</div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-lg font-semibold">Features</h2>
                <table className="table-auto mt-2 border-collapse w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Size</th>
                      <th className="border px-4 py-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.features.map((feature: any, index: number) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{feature.size}</td>
                        <td className="border px-4 py-2">{feature.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t"></div>
              <h1 className="text-lg font-semibold">Share this Product?</h1>
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center space-x-2">
                  <ShareAd product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="lg:w-[40%] p-1 lg:p-0">
          {isButtonVisible && (
            <>
              <div className={`fixed`}>
                <div className="w-full lg:w-[350px] absolute product-add-cart bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bg-white p-5 text-sm lg:mt-5 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-base font-medium text-gray-700">
                      <span className="font-semibold">
                        <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} /> Price:
                      </span>

                      <span className="ml-2 text-2xl text-[#000000] font-bold">
                        Ksh.
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Taxes included.</div>
                  <div className="mt-2 border-t">
                    <Label htmlFor="quantity">Select Size:</Label>
                  </div>

                  <div className="flex gap-1 text-gray-700 mb-1 ">
                    {/* Inclusions */}
                    <ul className="flex gap-2 w-full p-3">
                      {product.features.map((feature: any, index: number) => (
                        <li
                          key={index}
                          className="relative flex gap-1 w-full bg-red"
                        >
                          {/* Size Display */}
                          <span
                            onClick={() =>
                              feature.stock > 0 &&
                              handleSizeSelect(feature.size)
                            } // Only set size if in stock
                            className={`m-1 justify-center flex items-center w-10 h-10 rounded-full cursor-pointer ${
                              feature.stock > 0
                                ? selectedSize === feature.size
                                  ? "bg-black text-white border-none shadow-lg" // Highlight selected size
                                  : "text-black border shadow"
                                : "bg-gray-300 text-gray-500 line-through border" // "Sold Out" style
                            }`}
                          >
                            {feature.size}
                            {/* Show "Sold Out" label if stock is 0 
                        {feature.stock === 0 && (
                          <span className="flex text-[8px] text-white bg-red-600 rounded-full">
                            Sold Out
                          </span>
                        )}*/}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2 p-1  border-t flex flex-col gap-2 items-left gap-4">
                    <div>
                      <Label htmlFor="quantity">
                        {totalorders > 0 ? (
                          <> Quantity ({totalorders} in cart)</>
                        ) : (
                          <> Quantity</>
                        )}
                      </Label>
                    </div>
                    <div className="flex items-center">
                      {/* Decrease Button */}
                      <button
                        onClick={decreaseQuantity}
                        className="w-7 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        -
                      </button>

                      {/* Input Field */}
                      <Input
                        type="number"
                        className="ml-2 mr-2 w-20 text-center"
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="qty"
                        min="1" // Ensures the input cannot go below 1
                      />

                      {/* Increase Button */}
                      <button
                        onClick={increaseQuantity}
                        className="w-7 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className={`bg-white border w-full lg:w-[300px] py-3 px-1 text-xs rounded-sm text-black h-full hover:bg-gray-100 ${
                        isSending ? "bg-gray-100" : "bg-white"
                      }`}
                      disabled={isSending} // Disable button while sending
                    >
                      <div className="flex gap-1 items-center justify-center w-full">
                        {isSending && (
                          <CircularProgress sx={{ color: "black" }} size={20} />
                        )}
                        {isSending ? "Adding to cart..." : " Add to Cart"}
                      </div>
                    </button>
                    <Link href={`/checkout/${userId}`} passHref>
                      <button
                        disabled={!totalorders}
                        className="bg-[#000000] cursor-pointer w-full lg:w-[300px] py-3 px-1 text-xs rounded-sm text-white h-full hover:bg-gray-800"
                      >
                        Check Out
                      </button>
                    </Link>
                    <div className="flex items-center">
                      <img
                        src="/assets/images/visa.png"
                        alt="Visa"
                        className="h-6 mr-2"
                      />
                      <img
                        src="/assets/images/mpesa.png"
                        alt="Mpesa"
                        className="h-6"
                      />
                    </div>
                  </div>
                </div>

                {totalorders > 0 && isOpen && (
                  <>
                    <div className="w-full lg:w-[350px]  absolute h-[300px] flex flex-col p-2 items-center shadow border rounded-lg bg-white">
                      <div className="flex w-full justify-between items-center mb-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <DoneOutlinedIcon />
                          Items added to your cart
                        </div>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="flex justify-center items-center h-12 w-12 text-gray-600 hover:text-black"
                        >
                          <CloseOutlinedIcon />
                        </button>
                      </div>
                      <div className="flex p-1 justify-between items-center w-full">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.imageUrls[0]}
                            alt={`${product.productName}`}
                            className="w-16 h-16 rounded-sm"
                          />
                          <div>
                            <h2 className="text-[10px] text-gray-700">
                              Pama-Turkey
                            </h2>
                            <p className="text-xs">{`${product.productName}`}</p>
                            <p className="text-gray-500 text-xs">
                              Color: {`${product.color}`}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Size: {selectedSize}
                            </p>
                          </div>
                        </div>
                        <div className="text-[#000000] text-xs font-bold">
                          Ksh.
                          {(
                            product.price -
                            (product.price * product.discount) / 100
                          ).toLocaleString()}
                        </div>
                      </div>
                      <Link
                        href={`/cart/${userId}`}
                        passHref
                        className="w-full mt-4"
                      >
                        <button
                          className={`bg-white bg-white mt-2 border w-full py-3 px-1 text-xs rounded-sm text-black h-full hover:bg-gray-100`}
                        >
                          View Cart {"("}
                          {totalorders}
                          {")"}
                        </button>
                      </Link>
                      <Link
                        href={`/checkout/${userId}`}
                        passHref
                        className="w-full mt-4"
                      >
                        <button
                          disabled={!totalorders}
                          className="bg-[#000000] mt-2 cursor-pointer w-full py-3 px-1 text-xs rounded-sm text-white h-full hover:bg-gray-800"
                        >
                          Check Out
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <div className={`lg:hidden`}>
            <div className="w-full lg:w-[350px] product-add-cart bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] bg-white p-5 text-sm lg:mt-5 rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-base font-medium text-gray-700">
                  <span className="font-semibold">
                    <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} /> Price:
                  </span>

                  <span className="ml-2 text-2xl text-[#000000] font-bold">
                    Ksh.
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-600">Taxes included.</div>
              <div className="mt-2 border-t">
                <Label htmlFor="quantity">Select Size:</Label>
              </div>

              <div className="flex gap-1 text-gray-700 mb-1 ">
                {/* Inclusions */}
                <ul className="flex gap-2 w-full p-3">
                  {product.features.map((feature: any, index: number) => (
                    <li
                      key={index}
                      className="relative flex gap-1 w-full bg-red"
                    >
                      {/* Size Display */}
                      <span
                        onClick={() =>
                          feature.stock > 0 && handleSizeSelect(feature.size)
                        } // Only set size if in stock
                        className={`m-1 justify-center flex items-center w-10 h-10 rounded-full cursor-pointer ${
                          feature.stock > 0
                            ? selectedSize === feature.size
                              ? "bg-black text-white border-none shadow-lg" // Highlight selected size
                              : "text-black border shadow"
                            : "bg-gray-300 text-gray-500 line-through border" // "Sold Out" style
                        }`}
                      >
                        {feature.size}
                        {/* Show "Sold Out" label if stock is 0 
                        {feature.stock === 0 && (
                          <span className="flex text-[8px] text-white bg-red-600 rounded-full">
                            Sold Out
                          </span>
                        )}*/}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2 p-1  border-t flex flex-col gap-2 items-left gap-4">
                <div>
                  <Label htmlFor="quantity">
                    {totalorders > 0 ? (
                      <> Quantity ({totalorders} in cart)</>
                    ) : (
                      <> Quantity</>
                    )}
                  </Label>
                </div>
                <div className="flex items-center">
                  {/* Decrease Button */}
                  <button
                    onClick={decreaseQuantity}
                    className="w-7 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>

                  {/* Input Field */}
                  <Input
                    type="number"
                    className="ml-2 mr-2 w-20 text-center"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="qty"
                    min="1" // Ensures the input cannot go below 1
                  />

                  {/* Increase Button */}
                  <button
                    onClick={increaseQuantity}
                    className="w-7 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`bg-white border w-full lg:w-[300px] py-3 px-1 text-xs rounded-sm text-black h-full hover:bg-gray-100 ${
                    isSending ? "bg-gray-100" : "bg-white"
                  }`}
                  disabled={isSending} // Disable button while sending
                >
                  <div className="flex gap-1 items-center justify-center w-full">
                    {isSending && (
                      <CircularProgress sx={{ color: "black" }} size={20} />
                    )}
                    {isSending ? "Adding to cart..." : " Add to Cart"}
                  </div>
                </button>
                <Link href={`/checkout/${userId}`} passHref>
                  <button
                    disabled={!totalorders}
                    className="bg-[#000000] cursor-pointer w-full lg:w-[300px] py-3 px-1 text-xs rounded-sm text-white h-full hover:bg-gray-800"
                  >
                    Check Out
                  </button>
                </Link>
                <div className="flex items-center">
                  <img
                    src="/assets/images/visa.png"
                    alt="Visa"
                    className="h-6 mr-2"
                  />
                  <img
                    src="/assets/images/mpesa.png"
                    alt="Mpesa"
                    className="h-6"
                  />
                </div>
              </div>
            </div>

            {totalorders > 0 && isOpen && (
              <>
                <div className="w-full lg:w-[350px]  absolute h-[300px] flex flex-col p-2 items-center shadow border rounded-lg bg-white">
                  <div className="flex w-full justify-between items-center mb-1">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <DoneOutlinedIcon />
                      Items added to your cart
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex justify-center items-center h-12 w-12 text-gray-600 hover:text-black"
                    >
                      <CloseOutlinedIcon />
                    </button>
                  </div>
                  <div className="flex p-1 justify-between items-center w-full">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.imageUrls[0]}
                        alt={`${product.productName}`}
                        className="w-16 h-16 rounded-sm"
                      />
                      <div>
                        <h2 className="text-[10px] text-gray-700">
                          Pama-Turkey
                        </h2>
                        <p className="text-xs">{`${product.productName}`}</p>
                        <p className="text-gray-500 text-xs">
                          Color: {`${product.color}`}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Size: {selectedSize}
                        </p>
                      </div>
                    </div>
                    <div className="text-[#000000] text-xs font-bold">
                      Ksh.
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      ).toLocaleString()}
                    </div>
                  </div>
                  <Link
                    href={`/cart/${userId}`}
                    passHref
                    className="w-full mt-4"
                  >
                    <button
                      className={`bg-white bg-white mt-2 border w-full py-3 px-1 text-xs rounded-sm text-black h-full hover:bg-gray-100`}
                    >
                      View Cart {"("}
                      {totalorders}
                      {")"}
                    </button>
                  </Link>
                  <Link
                    href={`/checkout/${userId}`}
                    passHref
                    className="w-full mt-4"
                  >
                    <button
                      disabled={!totalorders}
                      className="bg-[#000000] mt-2 cursor-pointer w-full py-3 px-1 text-xs rounded-sm text-white h-full hover:bg-gray-800"
                    >
                      Check Out
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
