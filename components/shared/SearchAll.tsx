"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CategorySelect from "./CategorySelect";
import GenderSelect from "./GenderSelect";
import KidsSelect from "./KidsSelect";
import ProductSelect from "./ProductSelect";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CATEGORIES } from "@/constants";

const SearchAll = () => {
  //  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedKidsCategory, setSelectedKidsCategory] = useState<
    string | null
  >(null);
  const [itemOptions, setItemOptions] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const router = useRouter();

  const handleTypeChange = (newValue: any) => {
    setSelectedType(newValue);
    setSelectedSubcategory(null);
    setSelectedKidsCategory(null);
    setItemOptions([]);
  };

  const handleSubcategoryChange = (newValue: any) => {
    setSelectedSubcategory(newValue);
    if (newValue && selectedType) {
      if (newValue === "Kids") {
        setItemOptions(["Girls", "Boys", "Babies"]);
      } else {
        const subcategories = CATEGORIES[selectedType][newValue] || {};

        const options = Array.isArray(subcategories)
          ? subcategories
          : Object.values(subcategories).flat();
        setItemOptions(options.sort() as string[]);
      }
    } else {
      setItemOptions([]);
    }
  };

  const handleKidsCategoryChange = (newValue: any) => {
    setSelectedKidsCategory(newValue);
    if (newValue && selectedType && selectedSubcategory) {
      const subcategories = CATEGORIES[selectedType][selectedSubcategory] || {};
      const options: string[] = subcategories[newValue] || [];
      setItemOptions(options.sort() as string[]);
    } else {
      setItemOptions([]);
    }
  };

  return (
    <div className="flex justify-between items-center bg-white p-0 shadow-[0px_4px_20px_rgba(0,0,0,0.3)] rounded-full w-full">
      <div className="w-full p-1 justify-between flex gap-2 mr-4">
        <CategorySelect selected={selectedType} onChange={handleTypeChange} />
        <GenderSelect
          selected={selectedSubcategory}
          onChange={handleSubcategoryChange}
          options={selectedType ? Object.keys(CATEGORIES[selectedType]) : []}
        />
        {selectedSubcategory === "Kids" && (
          <KidsSelect
            selected={selectedKidsCategory}
            onChange={handleKidsCategoryChange}
          />
        )}
        <ProductSelect
          selected={selectedProduct}
          onChange={setSelectedProduct}
          options={itemOptions}
        />
      </div>

      <button
        onClick={() => {}}
        className="flex mr-2 justify-center items-center h-12 w-12 text-black rounded-full"
      >
        <SearchOutlinedIcon />
      </button>
    </div>
  );
};

export default SearchAll;
