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
type removeProps = {
  category: string;
  gender: string;
  kids: string;
  product: string;
};
export function RemoveAll({ category, gender, kids, product }: removeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlebutton = () => {
    let newUrl = "";
    if (kids) {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: category.toString(),
          gender: gender.toString(),
          kids: kids,
          product: product,
        },
      });
    } else {
      newUrl = formUrlQuerymultiple({
        params: "",
        updates: {
          category: category.toString(),
          gender: gender.toString(),
          product: product,
        },
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <button
      type="submit"
      onClick={() => handlebutton()}
      className=" p-1 text-xs underline hover:font-bold text-gray-700 h-full"
    >
      Remove All
    </button>
  );
}
