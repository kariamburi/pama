"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COLORS } from "@/constants";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
export function PopoverColor() {
  const [selectedcolor, setSelectedcolor] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex text-xs items-center gap-1">
            <div>Color</div>
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Color</h4>
          </div>
          <div className="mb-1">
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
