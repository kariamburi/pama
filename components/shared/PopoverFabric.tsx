"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MATERIALS } from "@/constants";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type MaterialProps = {
  category: string;
  gender: string;
};

export function PopoverFabric({ category }: MaterialProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (material: string) => {
    const isSelected = selectedMaterial.includes(material);
    const updatedSelection = isSelected
      ? selectedMaterial.filter((selected) => selected !== material)
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

  const handleReset = () => {
    setSelectedMaterial([]); // Reset selection
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["material"],
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      {category === "Clothes" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <div className="flex text-xs items-center gap-1">
                <div>Material</div>
                <KeyboardArrowDownOutlinedIcon />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="flex items-center space-y-2 border-b p-2 justify-between">
                <h4 className="font-medium leading-none">Material</h4>
                <button
                  onClick={handleReset}
                  className="border text-gray-900 py-1 px-2 text-xs rounded-full hover:bg-gray-100"
                  aria-label="Reset materials selection"
                >
                  Reset
                </button>
              </div>
              <div className="mb-0">
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
                        onChange={() => handleCheckboxChange(material)}
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
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
