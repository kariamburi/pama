import { getTrendingProducts } from "@/lib/actions/ad.product";
import { IProduct } from "@/lib/database/models/product.model";
import React, { useState, useEffect } from "react";

const TrendingProducts = () => {
  const [timeFrame, setTimeFrame] = useState<string>("week");
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const trending = await getTrendingProducts(timeFrame);
        setProducts(trending);
      } catch {}
    };

    fetchdata();
  }, [timeFrame]);

  return (
    <div className="p-4 m-w-[400px] rounded-xl bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Trending Products</h2>

      {/* Timeframe Selector */}
      <div className="mb-4">
        <label className="mr-2 text-xs">Select Time Frame:</label>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="p-2 border text-xs rounded"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product: any, index: number) => (
          <div key={index} className="border bg-white p-4 rounded-md shadow-sm">
            <div className="flex">
              <img
                src={product.imageUrls[0]}
                alt={product.productName}
                className="w-16 h-16 object-cover rounded-xl mr-2"
              />
              <div className="flex gap-2">
                <div className="text-xs">
                  <h3 className="font-bold text-sm">{product.productName}</h3>
                  <p>Price: KES {product.price.toLocaleString()}</p>
                  <p>Total Views: {product.views}</p>
                </div>
                <div className="text-xs">
                  <p>WhatsApp: {product.whatsapp}</p>
                  <p>Liked: {product.bookmarked}</p>
                  <p>Shared: {product.shared}</p>
                  <p>Calls: {product.calls}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
