// components/FloatingChatIcon.js

import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import CallIcon from "@mui/icons-material/Call";
interface FloatingChatIconProps {
  phone: string;
}
const FloatingCall: React.FC<FloatingChatIconProps> = ({ phone }) => {
  const handlewhatsappClick = async (e: any) => {
    window.location.href = `tel:${phone}`;
  };
  return (
    <>
      <button
        onClick={handlewhatsappClick}
        className="fixed bottom-5 right-2 lg:right-5 h-12 w-12 hover:bg-gray-700 bg-[#000000] text-white text-xs mt-2 p-2 rounded-full cursor-pointer z-10"
      >
        <CallIcon />
      </button>
    </>
  );
};

export default FloatingCall;
