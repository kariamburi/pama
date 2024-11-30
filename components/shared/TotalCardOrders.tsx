"use client"; // Ensure this file is marked as client-side in Next.js app directory
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface PieChartProps {
  title: string;
  value: {
    count: number;
    totalWorth: number;
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
        <div className="mt-1 text-base lg:text-xl font-bold text-gray-900">
          {value.count}
        </div>
        <div className="mt-1 text-sm lg:text-xl font-bold text-gray-900">
          KES {value.totalWorth.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default TotalCardOrders;
