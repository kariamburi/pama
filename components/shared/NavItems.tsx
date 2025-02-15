"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "../ui/separator";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DiamondIcon from "@mui/icons-material/Diamond";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
type NavItemsProps = {
  userstatus: string;
  userId: string;
};
const NavItems = ({ userstatus, userId }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-full">
      <ul>
        {headerLinks
          .filter((link) => !(userstatus === "User" && link.label === "Admin"))
          .map((link) => {
            const isActive = pathname === link.route;
            let linki = link.route;
            if (link.label === "My Orders") {
              linki = link.route + "/" + userId;
            }

            return (
              <>
                <SignedIn>
                  <li
                    key={link.route}
                    className={`${
                      isActive &&
                      "bg-black hover:bg-black rounded-xl text-white"
                    } whitespace-nowrap rounded-xl`}
                  >
                    <Link href={userId ? linki : "/sign-in"}>
                      <div className="flex hover:bg-gray-200 hover:rounded-xl p-3 mb-1 hover:cursor-pointer">
                        {link.label === "Home" && (
                          <span>
                            <HomeIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "My Orders" && (
                          <span>
                            <FormatListBulletedOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Favorite" && (
                          <span>
                            <FavoriteOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Settings" && (
                          <span>
                            <SettingsIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Admin" && (
                          <span>
                            <ManageAccountsOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}
                        <span className="flex-1 mr-5 hover:no-underline my-auto">
                          {link.label}
                        </span>
                        <span className="text-right my-auto">
                          <ArrowForwardIosIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      </div>
                    </Link>
                  </li>
                </SignedIn>

                <SignedOut>
                  <li
                    key={link.route}
                    className={`${
                      isActive &&
                      "bg-black hover:bg-black text-white rounded-xl"
                    } whitespace-nowrap`}
                  >
                    <Link href="/sign-in">
                      <div className="flex hover:bg-gray-200 hover:rounded-xl p-3 mb-1 hover:cursor-pointer">
                        {link.label === "Home" && (
                          <span>
                            <HomeIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "My Orders" && (
                          <span>
                            <FormatListBulletedOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Favorite" && (
                          <span>
                            <FavoriteOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Settings" && (
                          <span>
                            <SettingsIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}

                        {link.label === "Admin" && (
                          <span>
                            <ManageAccountsOutlinedIcon className="w-10 p-1 hover:text-white" />
                          </span>
                        )}
                        <span className="flex-1 mr-5 hover:no-underline my-auto">
                          {link.label}
                        </span>
                        <span className="text-right my-auto">
                          <ArrowForwardIosIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      </div>
                    </Link>
                  </li>
                </SignedOut>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default NavItems;
