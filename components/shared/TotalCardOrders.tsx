"use client"; // Ensure this file is marked as client-side in Next.js app directory
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface PieChartProps {
  title: string;
  value: {
    count: number;
    totalWorth: number;
    totalProfit: number;
  };
}

const TotalCardOrders = ({ title, value }: PieChartProps) => {
  const getStatusStyles = () => {
    if (title === "Active Orders") return "bg-[#00B900]";
    if (title === "Completed Orders") return "bg-[#000000]";
    if (title === "Pending Orders") return "bg-[#FF9933]";
    return "";
  };

  return (
    <div className="flex flex-1 items-center justify-between bg-gray-100 p-4 rounded-lg min-h-[110px] w-fit">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <div className={`h-3 w-3 rounded-full ${getStatusStyles()}`}></div>
          <div className="text-xs lg:text-sm">{title}</div>
        </div>
        <div className="flex gap-2 items-center text-gray-900">
          <div className="text-xs lg:text-sm ">No.</div>
          <div className="font-bold text-base lg:text-xl ">{value.count}</div>
        </div>
        <div className="flex gap-2 items-center text-gray-900">
          <div className="text-xs lg:text-sm ">Total Worth KES.</div>
          <div className="font-bold text-base lg:text-xl ">
            {value.totalWorth.toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2 items-center text-gray-900">
          <div className="text-xs lg:text-sm "> Profit KES.</div>
          <div className="font-bold text-base lg:text-xl ">
            {value.totalProfit.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCardOrders;
