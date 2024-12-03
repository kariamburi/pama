// components/FloatingChatIcon.js

import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
interface FloatingChatIconProps {
  phone: string;
}
const FloatingChatIcon: React.FC<FloatingChatIconProps> = ({ phone }) => {
  const handlewhatsappClick = async (e: any) => {
    window.location.href = `https://wa.me/${phone}/`;
  };
  return (
    <>
      <button
        onClick={handlewhatsappClick}
        className="fixed bottom-[70px] right-2 lg:right-5 h-12 w-12 hover:bg-emerald-700 bg-[#00B53F] text-white text-xs mt-2 p-2 rounded-full cursor-pointer z-10"
      >
        <WhatsAppIcon />
      </button>
    </>
  );
};

export default FloatingChatIcon;
