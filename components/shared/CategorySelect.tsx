import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CATEGORIES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";

const CategorySelect = ({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const handleRoote = (category: string) => {
    let newUrl = "";

    if (category) {
      newUrl = formUrlQuery({
        params: "",
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: "",
        keysToRemove: ["category,product,gender,kids"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="p-2 lg:w-[150px] cursor-pointer border-r">
          <div className="flex flex-col items-start">
            <label className="text-xs lg:text-sm font-medium text-black">
              Category
            </label>
            <div className="text-gray-500 text-xs lg:text-sm">
              {selected || "Select Category"}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No categories found</CommandEmpty>
            <CommandGroup>
              {Object.keys(CATEGORIES).map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    onChange(category);
                    handleRoote(category);
                    setOpen(false);
                  }}
                >
                  {category}
                  <Check
                    className={cn(
                      "ml-auto",
                      selected === category ? "opacity-100" : "opacity-0"
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

export default CategorySelect;
