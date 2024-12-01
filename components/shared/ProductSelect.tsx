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

const ProductSelect = ({
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
  const handleRoote = (product: string) => {
    let newUrl = "";

    if (product) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "product",
        value: product,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["product"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-2 lg:w-[150px] p-2 cursor-pointer">
          <div className="flex flex-col items-start">
            <label className="text-xs lg:text-sm font-medium text-black">
              Product
            </label>
            <div className="text-gray-500 text-xs lg:text-sm">
              {selected || "Search"}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList>
            <CommandEmpty>No options found</CommandEmpty>
            <CommandGroup>
              {options.map((product: any) => (
                <CommandItem
                  key={product}
                  onSelect={() => {
                    onChange(product);
                    handleRoote(product);
                    setOpen(false);
                  }}
                >
                  {product}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === product ? "opacity-100" : "opacity-0"
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

export default ProductSelect;
