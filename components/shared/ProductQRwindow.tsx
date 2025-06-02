// components/ChatWindow.js
"use client";
import React, { useEffect, useState } from "react";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "../ui/scroll-area";
import { ProductForm } from "./ProductForm";
import { IProduct } from "@/lib/database/models/product.model";
import ProductQRCode from "./ProductQRCode";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  sku: string;
}

const ProductQRwindow: React.FC<ChatWindowProps> = ({
  isOpen,
  sku,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[300px] h-[300px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="flex justify-center items-center h-12 w-12 text-black hover:bg-black hover:text-white rounded-full"
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        {/* Scrollable Form */}
        <ProductQRCode sku={sku} />
      </div>
    </div>
  );
};

export default ProductQRwindow;
