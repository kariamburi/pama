"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formUrlQuery,
  formUrlQuerymultiple,
  removeKeysFromQuery,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export function RemoveCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlebutton = () => {
    let newUrl = "";
    newUrl = removeKeysFromQuery({
      params: "",
      keysToRemove: ["category,gender,kids,product"],
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <button
      type="submit"
      onClick={() => handlebutton()}
      className="ml-2 px-2 py-1 underline bg-black text-xs rounded-xl hover:font-bold text-white h-full"
    >
      Remove All
    </button>
  );
}
