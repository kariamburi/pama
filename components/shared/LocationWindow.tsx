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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import StreetmapOfice from "./StreetmapOffice";
interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const LocationWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  user,
  onClose,
}) => {
  if (!isOpen) return null;
  const handleDirectionClick = () => {
    // Perform navigation or other actions when direction button is clicked
    // Example: Open a new tab with Google Maps directions
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${user.latitude},${user.longitude}`,
      "_blank"
    );
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl md:max-w-3xl lg:max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <button
            onClick={onClose}
            className="flex justify-center items-center h-12 w-12 text-black hover:bg-black hover:text-white rounded-full"
          >
            <CloseOutlinedIcon />
          </button>
        </div>

        <div className="bg-white p-0 text-l rounded-lg overflow-hidden">
          <div className="">
            <p className="text-xs lg:text-sm font-bold">Shop Location</p>
            <p className="mb-1 lg:text-xs text-[10px]">
              <LocationOnIcon sx={{ fontSize: 20 }} /> GPS Location
            </p>
            <StreetmapOfice
              name={user?.businessname}
              address={user?.businessaddress}
              imageUrl={user?.imageUrl ?? user?.photo}
              lat={user?.latitude}
              lng={user?.longitude}
              id={user._id}
            />
            <div className="justify-between flex w-full mb-5">
              <button
                onClick={handleDirectionClick}
                className="hover:bg-gray-700 bg-[#000000] text-white text-xs mt-2 p-2 rounded-lg shadow"
              >
                <AssistantDirectionIcon sx={{ marginRight: "5px" }} />
                Get Direction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationWindow;
