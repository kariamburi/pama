"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
export function PopoverPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <div className="flex text-xs items-center gap-1">
            <div>Price</div>
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Price range</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Min. Price</Label>
              <Input
                onChange={(e) => setminPrice(e.target.value)}
                id="min"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. Price</Label>
              <Input
                onChange={(e) => setmaxPrice(e.target.value)}
                id="max"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <button
                type="submit"
                onClick={() => onSelectPriceClear()}
                className="bg-gray-400 w-full p-1 text-xs rounded-sm text-white h-full"
              >
                <CloseIcon className="text-white" sx={{ fontSize: 24 }} />
                Clear Price
              </button>

              <button
                type="submit"
                onClick={() => handlebutton()}
                className="bg-[#000000] w-full p-1 text-xs rounded-sm text-white h-full"
              >
                <SearchIcon /> Search Price
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
