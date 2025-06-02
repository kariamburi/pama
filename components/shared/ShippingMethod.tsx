"use client";
import React, { useState } from "react";

interface DeliveryMethod {
  deliv: any;
  shipping: number;
  onChange: (value: number, _id: string) => void;
}

const ShippingMethod = ({ onChange, deliv, shipping }: DeliveryMethod) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(0);

  const extractAmount = (priceString: string) => {
    const match = priceString.match(/[\d,.]+/); // Matches digits, commas, and decimals
    return match ? parseFloat(match[0].replace(/,/g, "")) : null; // Convert to float and remove commas
  };
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Shipping Method</h2>
      <div className="border-t">
        {deliv.map((method: any, index: number) => (
          <label
            key={index}
            className={`cursor-pointer flex flex-col mb-0 ${
              selectedMethod === index ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex text-xs border-b border-r border-l p-3 items-center">
              <input
                type="radio"
                name="shipping"
                checked={selectedMethod === index}
                onChange={() => {
                  setSelectedMethod(index);
                  onChange(Number(extractAmount(method.price)), method._id);
                }}
                className="mr-3"
              />
              <div className="flex flex-col">
                <span className="font-medium">{method.method}</span>
                {method.location && (
                  <span className="text-sm text-gray-500">
                    Location: {method.location}
                  </span>
                )}
                {method.areas && (
                  <span className="text-sm text-gray-500">
                    Areas: {method.areas.join(", ")}
                  </span>
                )}
                {method.note && (
                  <span className="text-sm text-gray-500">
                    Note: {method.note}
                  </span>
                )}
              </div>
              <span className="ml-auto font-semibold">{method.price}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethod;
