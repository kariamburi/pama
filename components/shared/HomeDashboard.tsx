"use client";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { adminLinks, CATEGORIES } from "@/constants";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import DiamondIcon from "@mui/icons-material/Diamond";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ProductForm } from "./ProductForm";
import ProductWindow from "./ProductWindow";
import { getallOders } from "@/lib/actions/order.actions";
import CollectionOrder from "./CollectionOrder";
import { number } from "zod";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import CollectionProducts from "./CollectionProducts";
import CollectionUsers from "./CollectionUsers";
import CollectionMethods from "./CollectionMethods";
import MethodsWindow from "./MethodsWindow";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AccordionTree from "./AccordionTree";
import TotalCard from "./TotalCard";
import TotalCardOrders from "./TotalCardOrders";
import BarChart from "./SalesLineGraph";
import SalesLineGraph from "./SalesLineGraph";
import TrendingProducts from "./TrendingProducts";
import BroadcastMessage from "./BroadcastMessage";
type homeProps = {
  userId: string;
  userName: string;
  userImage: string;
  limit: number;
  page: number;
  orders: any;
  totalPages: number;
  Products: any;
  totalPagesProducts: number;
  users: any;
  totalPagesUsers: number;
  deliveries: any;
  prodSum: any;
  orderSum: any;
  // trending: any;
};

const HomeDashboard = ({
  userId,
  userName,
  userImage,
  limit,
  page,
  orders,
  Products,
  totalPages,
  totalPagesProducts,
  totalPagesUsers,
  deliveries,
  users,
  prodSum,
  orderSum,
}: //trending,
homeProps) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [categoryList, setcategoryList] = useState<any[]>([]);
  const [packList, setpackList] = useState<any[]>([]);
  const [alltrans, setalltrans] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const handle = async (title: string) => {
    setActiveTab(title);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const [isOpenMethods, setIsOpenMethods] = useState(false);
  const handleOpenMethods = () => {
    setIsOpenMethods(true);
  };

  const handleCloseMethods = () => {
    setIsOpenMethods(false);
  };
  // const [orders, setOrders] = useState<any>([]);
  const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    //fetchOrders(search);
    let newUrl = "";

    if (search) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "orderId",
        value: search,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["orderId"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const handleClear = () => {
    setSearch("");
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["orderId", "start", "end"],
    });

    router.push(newUrl, { scroll: false });
  };
  const handleSearchDates = () => {
    let newUrl = "";
    if (startDate || endDate) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          start: startDate ?? "",
          end: endDate ?? "",
        },
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["start", "end"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="w-full flex mt-3 p-1">
      <div className="hidden lg:inline mr-5">
        <div className="bg-gray-100 w-full rounded-lg p-3">
          <ul className="">
            {adminLinks.map((link) => {
              //  const isActive = pathname === link.route;

              return (
                <li
                  key={link.route}
                  className={`${
                    activeTab === link.label && "bg-black text-white rounded-xl"
                  } p-medium-16 whitespace-nowrap`}
                >
                  <div
                    onClick={() => handle(link.label)}
                    className="flex hover:bg-gray-200 hover:rounded-xl hover:text-gray-700 p-3 mb-1 hover:cursor-pointer"
                  >
                    <span className="text-right my-auto">
                      {link.label === "Home" && (
                        <span>
                          <CottageOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Categories" && (
                        <span>
                          <DiamondIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Products" && (
                        <span>
                          <ClassOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Orders" && (
                        <span>
                          <ChecklistOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Delivery Methods" && (
                        <span>
                          <AirportShuttleOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Users Profile" && (
                        <span>
                          <GroupsOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                      {link.label === "Communication" && (
                        <span>
                          <NotificationsActiveOutlinedIcon className="w-10 p-1 hover:text-white" />
                        </span>
                      )}
                    </span>

                    <span className="flex-1 text-sm mr-5 hover:no-underline my-auto">
                      {link.label}
                    </span>

                    <span className="text-right my-auto">
                      <ArrowForwardIosIcon className="w-10 p-1 hover:text-white" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex-1 rounded-lg">
        <div className="bg-white rounded-lg lg:hidden">
          <div>
            <ul className="grid grid-cols-2 m-1 gap-1 p-1">
              {adminLinks.map((link) => {
                //  const isActive = pathname === link.route;

                return (
                  <li key={link.route}>
                    <div
                      onClick={() => handle(link.label)}
                      className={`${
                        activeTab === link.label
                          ? "items-center p-3 flex gap-1 bg-black text-white rounded-xl hover:cursor-pointers"
                          : "items-center p-3 flex gap-1 border rounded-xl bg-white text-black hover:cursor-pointer hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-right my-auto">
                        {link.label === "Home" && (
                          <span>
                            <CottageOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Categories" && (
                          <span>
                            <DiamondIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Products" && (
                          <span>
                            <ClassOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Orders" && (
                          <span>
                            <ChecklistOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Delivery Methods" && (
                          <span>
                            <AirportShuttleOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Users Profile" && (
                          <span>
                            <GroupsOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                        {link.label === "Communication" && (
                          <span>
                            <NotificationsActiveOutlinedIcon className="w-10 p-1" />
                          </span>
                        )}
                      </span>

                      <span className="flex text-xs hover:no-underline">
                        {link.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {activeTab === "Home" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

              <Box>
                <Box mt="20px" display="flex" flexWrap="wrap" gap={2}>
                  <TotalCard
                    title="Total Products"
                    value={prodSum.totalProducts}
                  />
                  <TotalCard title="Total Sizes" value={prodSum.totalStock} />
                  <TotalCard title="Total worth" value={prodSum.totalWorth} />
                </Box>

                <Box mt="20px" display="flex" flexWrap="wrap" gap={2}>
                  <TotalCardOrders
                    title="Active Orders"
                    value={orderSum.successful}
                  />
                  <TotalCardOrders
                    title="Completed Orders"
                    value={orderSum.completed}
                  />
                  <TotalCardOrders
                    title="Pending Orders"
                    value={orderSum.pending}
                  />
                </Box>
                <Stack
                  mt="25px"
                  width="100%"
                  direction={{ xs: "column", lg: "row" }}
                  gap={4}
                >
                  {/* Make each child component flexible */}
                  <Box flex={1}>
                    <SalesLineGraph />
                  </Box>
                  <Box flex={1}>
                    <TrendingProducts />
                  </Box>
                </Stack>
              </Box>
            </div>
          </>
        )}
        {activeTab === "Categories" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Categories</h1>

              <div className="p-0">
                <AccordionTree data={CATEGORIES} />
              </div>
            </div>
          </>
        )}
        {activeTab === "Products" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Products</h1>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex flex-col">
                    <button
                      onClick={handleOpen}
                      className={`flex text-sm gap-1 items-center  text-white px-4 py-2 rounded-lg bg-black hover:bg-gray-700`}
                    >
                      <AddOutlinedIcon /> Add Product
                    </button>
                  </div>
                </div>

                {/* Search Form */}
              </div>
              {/* Date Filter Section */}
              <ScrollArea className="w-[350px] lg:w-full">
                <CollectionProducts
                  data={Products}
                  emptyTitle={`No Product Found`}
                  emptyStateSubtext="Come back later"
                  limit={limit}
                  page={page}
                  userId={userId}
                  totalPages={totalPagesProducts}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <ProductWindow
                isOpen={isOpen}
                onClose={handleClose}
                userId={userId}
              />
            </div>
          </>
        )}
        {activeTab === "Orders" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Orders</h1>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm font-semibold mb-1"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate || ""}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="text-sm border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm font-semibold mb-1"
                      htmlFor="endDate"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate || ""}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="text-sm border p-2 rounded"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      className="text-sm font-semibold mb-1"
                      htmlFor="endDate"
                    >
                      .
                    </label>
                    <button
                      onClick={handleSearchDates}
                      className="text-sm bg-black text-white px-4 py-2 rounded"
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Search Form */}

                <form onSubmit={handleSearch}>
                  <div className="flex flex-col lg:flex-row gap-1">
                    <div className="flex flex-col">
                      <label
                        className="text-sm font-semibold mb-1"
                        htmlFor="endDate"
                      >
                        OrderId
                      </label>
                      <div className="flex gap-1 flex-col lg:flex-row">
                        <input
                          type="text"
                          placeholder="Search by Order ID"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="text-sm border p-2 flex rounded-md"
                        />
                        <button
                          type="submit"
                          className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        >
                          Search
                        </button>
                        <div
                          onClick={handleClear}
                          className="text-sm bg-black items-center justify-center cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        >
                          Clear
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* Date Filter Section */}

              <ScrollArea className="w-[350px] lg:w-full">
                <CollectionOrder
                  data={orders}
                  emptyTitle={`No Order Found`}
                  emptyStateSubtext="Come back later"
                  limit={limit}
                  page={page}
                  totalPages={totalPages}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </>
        )}
        {activeTab === "Delivery Methods" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Delivery Methods</h1>
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex flex-col">
                    <button
                      onClick={handleOpenMethods}
                      className={`flex text-sm gap-1 items-center  text-white px-4 py-2 rounded-lg bg-black hover:bg-gray-700`}
                    >
                      <AddOutlinedIcon /> Add Methods
                    </button>
                  </div>
                </div>

                {/* Search Form */}
              </div>
              {/* Date Filter Section */}

              <ScrollArea className="w-[350px] lg:w-full">
                <CollectionMethods
                  data={deliveries}
                  emptyTitle={`No Method Found`}
                  emptyStateSubtext="Come back later"
                  limit={limit}
                  page={page}
                  userId={userId}
                  totalPages={1}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <MethodsWindow
                isOpen={isOpenMethods}
                onClose={handleCloseMethods}
                userId={userId}
                type={"Create"}
              />
            </div>
          </>
        )}
        {activeTab === "Users Profile" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">Users Profile</h1>
              <div className="flex flex-col lg:flex-row gap-3"></div>
              {/* Date Filter Section */}

              <ScrollArea className="w-[350px] lg:w-full">
                <CollectionUsers
                  data={users.data}
                  emptyTitle={`No User Found`}
                  emptyStateSubtext="Come back later"
                  limit={limit}
                  page={page}
                  userId={userId}
                  totalPages={users.totalPages}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <ProductWindow
                isOpen={isOpen}
                onClose={handleClose}
                userId={userId}
              />
            </div>
          </>
        )}
        {activeTab === "Communication" && (
          <>
            <div className="container mx-auto p-1 lg:p-4 border rounded-xl">
              <h1 className="text-2xl font-bold mb-4">
                Send Broadcast Message
              </h1>
              <div className="flex flex-col lg:flex-row gap-3"></div>
              <BroadcastMessage />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
