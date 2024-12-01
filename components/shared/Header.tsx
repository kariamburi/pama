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
    <div className="flex flex-col max-w-6xl mx-auto">
      <div className="mb-4 lg:mx-auto text-center">
        <h1 className="text-base lg:text-2xl font-bold mb-0">
          Welcome to Turkey Wear
        </h1>
        <p className="text-xs lg:text-base">
          Explore the best collections curated for you!
        </p>
      </div>
      <div className=" lg:mx-auto text-center">
        <SearchAll />
      </div>
      {/* Left Side */}
    </div>
  );
}
