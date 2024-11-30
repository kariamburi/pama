"use client";
import React, { useState } from "react";

const TipSection = ({
  selected,
  onClick,
  handlePayNow,
  total,
}: {
  selected: number;
  onClick: (value: number) => void;
  handlePayNow: () => void;
  total: number;
}) => {
  const tips = ["1%", "3%", "5%", "10%", "None"];

  // Function to calculate the tip amount
  const calculateTip = (percentage: string): number => {
    if (percentage === "None") return 0;
    const tipPercent = parseInt(percentage.replace("%", ""), 10);
    return (total * tipPercent) / 100;
  };

  // Set default tip to "None"
  const [selectedTip, setSelectedTip] = useState<string>("None");
  // State to track whether the checkbox is checked
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // Handle checkbox toggle
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Add Tip</h2>
      <div className="mb-6">
        {/* Checkbox */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked} // Checkbox is checked by default
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">
            Show your support for the team at PAMA
          </span>
        </label>

        {/* Conditional div */}
        {isChecked && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <div className="text-sm grid grid-cols-5 gap-2">
              {tips.map((tip) => (
                <button
                  key={tip}
                  onClick={() => {
                    setSelectedTip(tip);
                    const calculatedTip = calculateTip(tip); // Calculate tip based on current selection
                    onClick(calculatedTip); // Pass the calculated tip to the parent component
                  }}
                  className={`border p-2 rounded-md ${
                    selectedTip === tip ? "bg-black text-white" : ""
                  }`}
                >
                  {tip}
                  {selectedTip === tip && (
                    <>
                      <p className="text-white text-xs">
                        KES {calculateTip(selectedTip).toLocaleString()}
                      </p>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          handlePayNow(); // Call the parent function
        }}
        className="hidden lg:inline bg-[#000000] mt-2 cursor-pointer w-full py-4 px-1 font-bold rounded-sm text-white h-full hover:bg-gray-800"
      >
        Pay Now
      </button>
    </div>
  );
};

export default TipSection;
