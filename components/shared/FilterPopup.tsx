"use client";

import { useEffect, useState, useTransition } from "react";
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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
import Input from "@mui/material/Input";
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
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  //const [selectedMaterial, setSelectedMaterial] = useState("");
  // const [selectedOccasion, setSelectedOccasion] = useState("");
  const searchParams = useSearchParams();
  const [selectedcolor, setSelectedcolor] = useState<string[]>([]);
  let updatedSelection: string[] = [];
  const toggleColor = (color: string) => {
    const isSelected = selectedcolor.includes(color);
    const updatedSelection = isSelected
      ? selectedcolor.filter((selected) => selected !== color)
      : [...selectedcolor, color];

    setSelectedcolor(updatedSelection);

    const newUrl = updatedSelection.length
      ? formUrlQuery({
          params: searchParams.toString(),
          key: "color",
          value: updatedSelection.join(","),
        })
      : removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["color"],
        });

    router.push(newUrl, { scroll: false });
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

  const [selectedoccassion, setSelectedoccassion] = useState<String[]>([]);

  const handleCheckboxChange = (occassion: string) => {
    const isSelected = selectedoccassion.includes(occassion);
    const updatedSelection = isSelected
      ? selectedoccassion.filter((selected) => selected !== occassion)
      : [...selectedoccassion, occassion];

    setSelectedoccassion(updatedSelection);

    const newUrl = updatedSelection.length
      ? formUrlQuery({
          params: searchParams.toString(),
          key: "occassion",
          value: updatedSelection.join(","),
        })
      : removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["occassion"],
        });

    router.push(newUrl, { scroll: false });
  };

  const handleReset = () => {
    setSelectedoccassion([] as String[]); // Reset selection
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["occassion"],
    });
    router.push(newUrl, { scroll: false });
  };
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const handleCheckboxChangeM = (material: string) => {
    const isSelected = selectedMaterial.includes(material);
    const updatedSelection = isSelected
      ? selectedMaterial.filter((selected: any) => selected !== material)
      : [...selectedMaterial, material];

    setSelectedMaterial(updatedSelection);

    const newUrl = updatedSelection.length
      ? formUrlQuery({
          params: searchParams.toString(),
          key: "material",
          value: updatedSelection.join(","),
        })
      : removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["material"],
        });

    router.push(newUrl, { scroll: false });
  };

  const handleResetM = () => {
    setSelectedMaterial([]); // Reset selection
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["material"],
    });
    router.push(newUrl, { scroll: false });
  };
  useEffect(() => {
    handleResetM();
    handleReset();
    handleResetColor();
    onSelectPriceClear();
  }, []);
  const handleResetColor = () => {
    setSelectedcolor([]); // Reset selection
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["color"],
    });
    router.push(newUrl, { scroll: false });
  };
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");

  const handlebutton = () => {
    let newUrl = "";

    if (minPrice && maxPrice) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "price",
        value: minPrice + "-" + maxPrice,
      });
    } else {
      setminPrice("");
      setmaxPrice("");
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["price"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  const onSelectPriceClear = () => {
    let newUrl = "";
    newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["price"],
    });

    setminPrice("");
    setmaxPrice("");

    router.push(newUrl, { scroll: false });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex bg-black rounded-full p-2 gap-2 text-white cursor-pointer hover:bg-gray-700">
          <TuneOutlinedIcon /> <div className="">Filter</div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white w-full lg:w-[80vw] lg:max-w-[800px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              <AlertDialogAction className="bg-white hover:bg-white">
                <button className="flex justify-center items-center h-12 w-12 text-black hover:bg-black hover:text-white rounded-full">
                  <CloseOutlinedIcon />
                </button>
              </AlertDialogAction>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-grey-600">
            <ScrollArea className="p-2 h-[70vh]">
              <div className="w-full bg-white rounded-xl border justify-between flex">
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

              <div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-y-2 border-b p-2 justify-between">
                      <label className="block text-lg font-semibold">
                        Price range
                      </label>
                      <button
                        onClick={onSelectPriceClear}
                        className="border text-gray-900 py-1 px-2 text-xs rounded-full hover:bg-gray-100"
                        aria-label="Reset materials selection"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="grid grid-cols-2 items-center gap-4">
                        <label htmlFor="width" className="text-xs">
                          Min. Price
                        </label>
                        <Input
                          onChange={(e) => setminPrice(e.target.value)}
                          id="min"
                          type="number"
                          value={minPrice}
                          defaultValue=""
                          className="col-span-2 rounded-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <label htmlFor="maxWidth" className="text-xs">
                          Max. Price
                        </label>
                        <Input
                          onChange={(e) => setmaxPrice(e.target.value)}
                          id="max"
                          type="number"
                          value={maxPrice}
                          defaultValue=""
                          className="col-span-2 rounded-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={() => handlebutton()}
                        className="bg-[#000000] w-full p-1 text-xs rounded-sm text-white h-full"
                      >
                        <SearchIcon /> Search Price
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 border rounded-xl p-1">
                    <div className="flex items-center space-y-2 border-b p-2 justify-between">
                      <label className="block text-lg font-semibold">
                        Color
                      </label>
                      <button
                        onClick={handleResetColor}
                        className="border text-gray-900 py-1 px-2 text-xs rounded-full hover:bg-gray-100"
                        aria-label="Reset materials selection"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-1">
                      {COLORS.map((color) => (
                        <button
                          key={color.title}
                          className={`border p-2 rounded-full text-sm font-medium ${
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

                  <div className="grid gap-4">
                    <div className="flex items-center space-y-2 border-b p-2 justify-between">
                      <div>
                        <h4 className="font-medium text-lg">Occassion</h4>
                      </div>
                      <div>
                        <button
                          onClick={handleReset}
                          className="border text-gray-900 py-1 px-2 text-xs rounded-full hover:bg-gray-100"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                    <div className="m-0">
                      <ul className="p-2 w-full rounded">
                        {OCCASIONS.map((occassion) => (
                          <li
                            key={occassion}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded"
                          >
                            <input
                              type="checkbox"
                              id={occassion}
                              value={occassion}
                              checked={selectedoccassion.includes(occassion)}
                              onChange={() => handleCheckboxChange(occassion)}
                              className="mr-2"
                            />
                            <label
                              htmlFor={occassion}
                              className="cursor-pointer"
                            >
                              {occassion}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center space-y-2 border-b p-2 justify-between">
                      <h4 className="font-medium text-lg">Material</h4>
                      <button
                        onClick={handleResetM}
                        className="border text-gray-900 py-1 px-2 text-xs rounded-full hover:bg-gray-100"
                        aria-label="Reset materials selection"
                      >
                        Reset
                      </button>
                    </div>
                    <div className="m-0">
                      <ul className="p-2 w-full rounded">
                        {MATERIALS.map((material) => (
                          <li
                            key={material}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded"
                          >
                            <input
                              type="checkbox"
                              id={material}
                              value={material}
                              checked={selectedMaterial.includes(material)}
                              onChange={() => handleCheckboxChangeM(material)}
                              className="mr-2"
                              aria-labelledby={`label-${material}`}
                            />
                            <label
                              id={`label-${material}`}
                              htmlFor={material}
                              className="cursor-pointer"
                            >
                              {material}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
