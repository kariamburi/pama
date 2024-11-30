"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OCCASIONS } from "@/constants";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type occassionProps = {
  category: string;
  gender: string;
};

export function PopoverOccassion({ category, gender }: occassionProps) {
  const [selectedoccassion, setSelectedoccassion] = useState<String[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

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
  };

  return (
    <>
      {category === "Clothes" && gender === "Women" && (
        <>
          {" "}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <div className="flex text-xs items-center gap-1">
                  <div>Occassion</div>
                  <KeyboardArrowDownOutlinedIcon />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="flex items-center space-y-2 border-b p-2 justify-between">
                  <div>
                    <h4 className="font-medium leading-none">Occassion</h4>
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
                <div className="mb-0">
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
                        <label htmlFor={occassion} className="cursor-pointer">
                          {occassion}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
}
