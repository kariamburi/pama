"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "@/lib/actions/ad.product";
type deleteProps = {
  adId: string;
  imageUrls: string[];
};
export const DeleteConfirmation = ({ adId, imageUrls }: deleteProps) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  let deleteImages: string[] = [];
  for (let index = 0; index < imageUrls.length; index++) {
    const image = imageUrls[index];
    const url = new URL(image);
    const filename = url.pathname.split("/").pop();
    if (filename) {
      deleteImages.push(filename);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="cursor-pointer hover:text-red-400">
          <DeleteOutlineOutlinedIcon />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this Product
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteProduct({ adId, deleteImages, path: pathname });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
