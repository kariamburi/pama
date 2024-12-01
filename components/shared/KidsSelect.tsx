"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";
const KidsSelect = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
}) => {
  const kidsCategories = ["Girls", "Boys", "Babies"];
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const handleRoote = (kids: string) => {
    let newUrl = "";

    if (kids) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "kids",
        value: kids,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["kids"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-2 lg:w-[200px] cursor-pointer border-r">
          <div className="flex flex-col items-start">
            <label className="text-xs lg:text-sm font-medium text-black">
              Kids
            </label>
            <div className="text-gray-500 text-xs lg:text-sm">
              {selected || "Search"}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search kids category..." />
          <CommandList>
            <CommandEmpty>No options found</CommandEmpty>
            <CommandGroup>
              {kidsCategories.map((kids: any) => (
                <CommandItem
                  key={kids}
                  onSelect={() => {
                    onChange(kids);
                    handleRoote(kids);
                    setOpen(false);
                  }}
                >
                  {kids}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === kids ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default KidsSelect;
