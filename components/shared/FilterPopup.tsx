"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "@/lib/actions/ad.product";
import {
  CATEGORIES,
  COLORS,
  GENDER_AGE_GROUP,
  MATERIALS,
  OCCASIONS,
} from "@/constants";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { ScrollArea } from "../ui/scroll-area";
import { formatKsh } from "@/lib/help";
import CategorySelect from "./CategorySelect";
import GenderSelect from "./GenderSelect";
import KidsSelect from "./KidsSelect";
import ProductSelect from "./ProductSelect";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { formUrlQuerymultiple } from "@/lib/utils";
//type deleteProps = {
// adId: string;
// imageUrls: string[];
//};
export const FilterPopup = () => {
  const pathname = usePathname();
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const searchParams = useSearchParams();
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [selectedcolor, setSelectedcolor] = useState<string[]>([]);
  let updatedSelection: string[] = [];
  const toggleColor = (color: string) => {
    const isSelected = selectedcolor.includes(color);
    updatedSelection = isSelected
      ? selectedcolor.filter((selected) => selected !== color)
      : [...selectedcolor, color];

    setSelectedcolor(updatedSelection);
  };

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

  const handlebutton = () => {
    let newUrl = "";
    const [minPrice, maxPrice] = selectedPriceRange;

    // Build the updates object dynamically, omitting invalid values
    const updates = {
      price: minPrice && maxPrice ? `${minPrice}-${maxPrice}` : undefined,
      color:
        updatedSelection.length > 0 ? updatedSelection.join(",") : undefined,
      occassion: selectedOccasion ? selectedOccasion.toString() : undefined,
      material: selectedMaterial ? selectedMaterial.toString() : undefined,
    };

    // Filter out undefined values and cast the object to Record<string, string>
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    ) as Record<string, string>;

    newUrl = formUrlQuerymultiple({
      params: searchParams.toString(),
      updates: filteredUpdates,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="lg:hidden flex bg-white border rounded-full p-2 gap-2 text-black cursor-pointer hover:bg-gray-100">
          <TuneOutlinedIcon /> <div className="hidden lg:inline">Filter</div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h2 className="text-lg font-bold mb-4">Filters</h2>
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            <ScrollArea className="p-3 h-[70vh]">
              <div className="w-full bg-white rounded-xl border justify-between flex gap-2 mr-4">
                <CategorySelect
                  selected={selectedType}
                  onChange={handleTypeChange}
                />
                <GenderSelect
                  selected={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  options={
                    selectedType ? Object.keys(CATEGORIES[selectedType]) : []
                  }
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
              <div className="flex items-center gap-1">
                <div>
                  <div className="border rounded-xl mb-4 mt-4 p-1">
                    <label className="block font-semibold">Price Range</label>
                    <input
                      type="range"
                      min="500"
                      max="40000"
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
                      {formatKsh(selectedPriceRange[0])} -{" "}
                      {formatKsh(selectedPriceRange[1])}
                    </span>
                  </div>
                  <div className="mb-4 border rounded-xl p-1">
                    <label className="block font-semibold">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color.title}
                          className={`border p-2 rounded-full text-xs font-medium ${
                            selectedcolor.includes(color.title)
                              ? "ring-2 ring-gray-400"
                              : "ring-1 ring-transparent"
                          }`}
                          style={{
                            backgroundColor: color.code,
                            color:
                              color.title === "Black" ||
                              color.title === "Navy Blue" ||
                              color.title === "Dark Green"
                                ? "#FFF"
                                : "#000",
                          }}
                          onClick={() => toggleColor(color.title)}
                        >
                          {color.title}
                        </button>
                      ))}
                    </div>
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
                      onChange={(e) =>
                        console.log("Selected Material", e.target.value)
                      }
                    >
                      <option value="">Select Material</option>
                      {MATERIALS.map((material: any) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex items-center w-full justify-between gap-1">
            <div>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>

            <div className="mt-2">
              <AlertDialogAction onClick={() => handlebutton()}>
                Search
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
