"use client";
import React, { useState } from "react";

// Mock Data
const COLORS = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Black",
  "White",
  "Burgundy",
  "Beige",
];
const GENDER_AGE_GROUP = ["Men", "Women", "Kids"];
const OCCASIONS = ["Casual Wear", "Formal Wear", "Party Wear", "Sports Wear"];
const MATERIALS = ["Cotton", "Linen", "Silk", "Polyester"];

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const toggleColor = (color: string) => {
    setSelectedColor((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block font-semibold">Category</label>
        <select
          className="border p-2 w-full"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Clothes">Clothes</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Price Range</label>
        <input
          type="range"
          min="0"
          max="500"
          value={selectedPriceRange[1]}
          onChange={(e) =>
            setSelectedPriceRange([
              selectedPriceRange[0],
              Number(e.target.value),
            ])
          }
          className="w-full"
        />
        <span>
          ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
        </span>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Color</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              className={`border p-2 ${
                selectedColor.includes(color) ? "bg-gray-300" : "bg-white"
              }`}
              onClick={() => toggleColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Gender & Age Group</label>
        <select
          className="border p-2 w-full"
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          {GENDER_AGE_GROUP.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Occasion</label>
        <select
          className="border p-2 w-full"
          onChange={(e) => setSelectedOccasion(e.target.value)}
        >
          <option value="">Select Occasion</option>
          {OCCASIONS.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Material</label>
        <select
          className="border p-2 w-full"
          onChange={(e) => console.log("Selected Material", e.target.value)}
        >
          <option value="">Select Material</option>
          {MATERIALS.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
