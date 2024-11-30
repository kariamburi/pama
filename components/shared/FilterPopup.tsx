"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
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
import { COLORS, GENDER_AGE_GROUP, MATERIALS, OCCASIONS } from "@/constants";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { ScrollArea } from "../ui/scroll-area";
import { formatKsh } from "@/lib/help";
//type deleteProps = {
// adId: string;
// imageUrls: string[];
//};
export const FilterPopup = () => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");

  const toggleColor = (color: string) => {
    setSelectedColor((prev: any) =>
      prev.includes(color)
        ? prev.filter((c: any) => c !== color)
        : [...prev, color]
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.3)] rounded-full p-1 gap-2 text-black cursor-pointer hover:bg-gray-100">
          <TuneOutlinedIcon /> <div className="hidden lg:inline">Filter</div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h2 className="text-lg font-bold mb-4">Filters</h2>
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            <ScrollArea className="p-0 h-[80vh]">
              <div className="p-4 bg-gray-100">
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
                <div className="mb-4">
                  <label className="block font-semibold">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color.title}
                        className={`border p-2 rounded-md text-sm font-medium ${
                          selectedColor.includes(color.title)
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
                  <label className="block font-semibold">
                    Gender & Age Group
                  </label>
                  <select
                    className="border p-2 w-full"
                    onChange={(e) => setSelectedGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    {GENDER_AGE_GROUP.map((group) =>
                      group.subOptions ? (
                        group.subOptions.map((sub) => (
                          <option
                            key={`${group.category}-${sub}`}
                            value={`${group.category}-${sub}`}
                          >
                            {`${group.category} - ${sub}`}
                          </option>
                        ))
                      ) : (
                        <option key={group.category} value={group.category}>
                          {group.category}
                        </option>
                      )
                    )}
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
                    onChange={(e) =>
                      console.log("Selected Material", e.target.value)
                    }
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
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              //  startTransition(async () => {
              //  await deleteProduct({ adId, deleteImages, path: pathname });
              // })
              {}
            }
          >
            Filter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
