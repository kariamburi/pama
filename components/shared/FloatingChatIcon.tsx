// components/FloatingChatIcon.js

import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
interface FloatingChatIconProps {
  phone: string;
}
const FloatingChatIcon: React.FC<FloatingChatIconProps> = ({ phone }) => {
  return (
    <Link
      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
      className="flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="fixed bottom-20 lg:bottom-10 right-1 lg:right-5 bg-[#00B53F] w-10 lg:w-16 h-10 lg:h-16 flex justify-center items-center rounded-full cursor-pointer z-10">
        <div className="w-6 h-6 lg:w-8 lg:h-8 flex text-[#00B53F] items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer">
          <WhatsAppIcon />
        </div>
      </div>
    </Link>
  );
};

export default FloatingChatIcon;
