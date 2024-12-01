"use client";
import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import LocationWindow from "./LocationWindow";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createSubscribe } from "@/lib/actions/notify.actions";
//import Termspopup from "./termspopup";
type MobileProps = {
  comp: any;
};
const Footer = ({ comp }: MobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const currentYear = new Date().getFullYear();
  // Format working days
  const workingDays = `${comp.businessworkingdays[0]} to ${
    comp.businessworkingdays[comp.businessworkingdays.length - 1]
  }`;

  // Format business hours
  const hours = comp.businesshours[0];
  const openTime = `${parseInt(hours.openHour, 10)}:${hours.openMinute.padStart(
    2,
    "0"
  )} ${hours.openHour < 12 ? "AM" : "PM"}`;
  const closeTime = `${hours.closeHour % 12 || 12}:${hours.closeMinute.padStart(
    2,
    "0"
  )} ${hours.closeHour < 12 || hours.closeHour === 24 ? "AM" : "PM"}`;
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!input) {
      setMessage("Please enter an email or phone number.");
      return;
    }

    try {
      const response = await createSubscribe(input);

      if (response) {
        setMessage(response);
        setInput("");
      } else {
        setMessage(response || "An error occurred.");
      }
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
    }
  };
  return (
    <div className="p-5 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="mb-3 text-slate-950 font-bold">Find Us</h3>
          <p className="">{comp.businessname}</p>
          <p className="">
            <strong>Location:</strong> {comp.businessaddress}
          </p>
          <p className="">
            <strong>Working Days:</strong> {workingDays}
          </p>
          <p className="">
            <strong>Working Hours:</strong> {openTime} to {closeTime}
          </p>

          <p className=" flex items-center">
            <a href={`tel:${comp.phone}`} className="flex items-center">
              <CallIcon className="w-5 h-5 mr-2 " />
              {comp.phone}
            </a>
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-slate-950 font-bold">Quick links</h3>
          <ul className="space-y-4">
            <li>
              <div
                onClick={handleOpen}
                className="bg-black flex items-center gap-1 text-white rounded-xl p-2  cursor-pointer hover:bg-gray-700"
              >
                <LocationOnIcon sx={{ fontSize: 14 }} />{" "}
                <div>Shop GPS Location</div>
              </div>
            </li>
            <li>
              <Link href="/about" className=" hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className=" hover:underline">
                <div>Terms & Conditions</div>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className=" hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <p className="mb-3 text-slate-950 font-bold">Our resources</p>
          <ul className="space-y-4">
            <li className="transition-colors hover:underline hover:cursor-pointer">
              <a href={comp.facebook ?? "#"} className="hover:underline">
                Our FB
              </a>
            </li>
            <li className="transition-colors  hover:underline hover:cursor-pointer">
              <a href={comp.instagram ?? "#"} className="hover:underline">
                Our Instagram
              </a>
            </li>
            <li className="transition-colors hover:underline hover:cursor-pointer">
              <a href={comp.tiktok ?? "#"} className="hover:underline  ">
                Our Tiktok
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-slate-950 font-bold">
            Stay updated on new arrivals and offers via email/SMS.
          </h3>
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Phone"
              className="flex-grow max-w-[250px] lg:w-full p-2 border rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-black text-white px-4 rounded">
              →
            </button>
          </form>
          {message && <p className="mt-2  text-red-500">{message}</p>}
        </div>
      </div>

      <div className="border-t border-gray-300 p-2 mt-3"></div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xs font-bold">
          {currentYear} Pama. All Rights reserved.
        </p>
        <p className="text-[8px] lg:text-xs">
          Powered by{" "}
          <Link
            href="https://craftinventors.co.ke"
            className="no-underline hover:text-emerald-500 "
          >
            Craft Inventors
          </Link>
        </p>
      </div>
      <LocationWindow isOpen={isOpen} onClose={handleClose} user={comp} />
    </div>
  );
};

export default Footer;
