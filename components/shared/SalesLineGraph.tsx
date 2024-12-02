import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import { getGraphSales } from "@/lib/actions/order.actions";

const SalesLineGraph: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<string>("day"); // Default to "day"
  const [chartData, setChartData] = useState<any>([]);

  // Fetch data on time frame change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your API
        const response = await getGraphSales(timeFrame);

        // Map the response data for chart rendering
        const formattedData = response.map((data: any) => ({
          date: data._id, // Assuming _id is the date
          sales: data.totalSales, // totalSales represents the sales value
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  // Options for the chart
  const options = {
    chart: {
      id: "sales-line-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData.map((data: any) => data.date),
      title: {
        text: timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1),
      },
    },
    yaxis: {
      title: {
        text: "Sales (KES)",
      },
    },
    title: {
      text: "Sales Over Time",
      align: "center",
    },
    stroke: {
      curve: "smooth" as "smooth", // Explicitly typing the value
    },
  };

  const series = [
    {
      name: "Sales",
      data: chartData.map((data: any) => data.sales),
    },
  ];

  return (
    <div className="chart-container bg-gray-100 p-2 rounded-xl">
      <h2 className="title font-bold m-2">Sales Line Graph</h2>

      {/* Time Frame Selection */}
      <div className="time-frame-select flex gap-3">
        <button
          className="w-[100px] bg-black text-white text-xs p-1 rounded-sm hover:bg-gray-700"
          onClick={() => setTimeFrame("day")}
        >
          Day
        </button>
        <button
          className="w-[100px] bg-black text-white text-xs p-1 rounded-sm hover:bg-gray-700"
          onClick={() => setTimeFrame("week")}
        >
          Week
        </button>
        <button
          className="w-[100px] bg-black text-white text-xs p-1 rounded-sm hover:bg-gray-700"
          onClick={() => setTimeFrame("month")}
        >
          Month
        </button>
      </div>

      {/* Render the Chart */}
      <ReactApexChart
        options={options as any}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default SalesLineGraph;
