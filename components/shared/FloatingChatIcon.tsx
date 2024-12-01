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
      <div className="fixed bottom-10 right-2 lg:right-5 bg-[#00B53F] w-12 h-12 lg:w-16 lg:h-16 flex justify-center items-center rounded-full cursor-pointer z-10">
        <div className="w-10 h-10 flex text-[#ffffff] items-center justify-center rounded-full bg-[#00B53F] tooltip tooltip-bottom hover:cursor-pointer">
          <WhatsAppIcon />
        </div>
      </div>
    </Link>
  );
};

export default FloatingChatIcon;
