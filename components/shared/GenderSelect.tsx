"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import React from "react";

const GenderSelect = ({
  selected,
  onChange,
  options,
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
  options: string[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const handleRoote = (gender: string) => {
    let newUrl = "";

    if (gender) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "gender",
        value: gender,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["gender"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-2 lg:w-[150px] cursor-pointer border-r">
          <div className="flex flex-col items-start">
            <label className="text-sm lg:text-base font-medium text-black">
              Gender
            </label>
            <div className="text-gray-500 text-sm lg:text-base">
              {selected || "Search"}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search gender..." />
          <CommandList>
            <CommandEmpty>No options found</CommandEmpty>
            <CommandGroup>
              {options.map((gender: any) => (
                <CommandItem
                  key={gender}
                  onSelect={() => {
                    onChange(gender);
                    handleRoote(gender);
                    setOpen(false);
                  }}
                >
                  {gender}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === gender ? "opacity-100" : "opacity-0"
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

export default GenderSelect;
