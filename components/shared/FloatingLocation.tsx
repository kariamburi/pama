// components/FloatingChatIcon.js

import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Link from "next/link";
import LocationWindow from "./LocationWindow";
interface mapProps {
  comp: any;
}
const FloatingLocation: React.FC<mapProps> = ({ comp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-[120px] right-2 lg:right-5 h-12 w-12 hover:bg-gray-700 bg-black text-white text-xs mt-2 p-2 rounded-full cursor-pointer z-10"
      >
        <LocationOnIcon />
      </button>
      <LocationWindow isOpen={isOpen} onClose={handleClose} user={comp} />
    </>
  );
};

export default FloatingLocation;
