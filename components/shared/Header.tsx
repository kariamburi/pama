"use client";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Searchmain from "./Searchmain";
import SearchAll from "./SearchAll";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  // Function to handle changes in the search input
  const handleSearchChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div
      style={{
        animation: `fadeInUp 1s ease-in-out 0s forwards`,
        opacity: 0, // Initial opacity before animation starts
      }}
      className="flex flex-col max-w-6xl mx-auto"
    >
      <div className="mb-4 lg:mx-auto text-center">
        <h1 className="text-xs lg:text-2xl text-gray-800 font-bold mb-0">
          Welcome to Turkey Wear
        </h1>
        <p className="text-[12px] lg:text-base text-gray-500">
          Explore the best collections curated for you!
        </p>
      </div>
      <div className="gap-1 lg:mx-auto text-center">
        <Searchmain />

        {/*  <SearchAll /> */}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px); /* Mimics the initial y: 20 */
          }
          to {
            opacity: 1;
            transform: translateY(0); /* Moves to the final position */
          }
        }
      `}</style>
    </div>
  );
}
