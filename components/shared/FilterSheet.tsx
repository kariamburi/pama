"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
//import NavItems from "./NavItems";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavItems from "./NavItems";
import StyledBrandName from "./StyledBrandName";
import Link from "next/link";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CategorySelect from "./CategorySelect";
import GenderSelect from "./GenderSelect";
import KidsSelect from "./KidsSelect";
import ProductSelect from "./ProductSelect";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  CATEGORIES,
  COLORS,
  GENDER_AGE_GROUP,
  MATERIALS,
  OCCASIONS,
} from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { PopoverOccassion } from "./PopoverOccassion";
import { PopoverFabric } from "./PopoverFabric";
import { PopoverPrice } from "./PopoverPrice";
import { PopoverColor } from "./PopoverColor";
import { formatKsh } from "@/lib/help";
import { ScrollArea } from "../ui/scroll-area";
import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
const FilterSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

  const handleclicklink = () => {
    setIsSheetOpen(false);
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
    <nav className="">
      <Sheet open={isSheetOpen}>
        <SheetTrigger
          className="align-middle"
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          <div className="lg:hidden flex bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] rounded-full p-1 gap-2 text-black cursor-pointer hover:bg-gray-100">
            <TuneOutlinedIcon /> <div className="hidden lg:inline">Filter</div>
          </div>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-1 bg-white">
          <SheetTitle>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div>
                  <TuneOutlinedIcon />
                </div>
                <div>Filter</div>
              </div>
              <button
                onClick={handleclicklink}
                className="flex justify-center top-[-5px] items-center h-12 w-12 text-black hover:bg-black hover:text-white rounded-full"
              >
                <CloseOutlinedIcon />
              </button>
            </div>
          </SheetTitle>

          <Separator className="border border-gray-50" />
          <ScrollArea className="p-3 h-[80vh]">
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
          <div className="w-full p-2">
            <button
              type="submit"
              onClick={() => handlebutton()}
              className="bg-[#000000] w-full p-4 text-xs rounded-sm text-white h-full"
            >
              <SearchIcon /> Search
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default FilterSheet;
