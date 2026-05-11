"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { useToast } from "../ui/use-toast";

type DeleteProps = {
  adId: string;
  imageUrls?: string[];
};

export const DeleteConfirmation = ({ adId, imageUrls = [] }: DeleteProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const deleteImages = imageUrls
    .map((image) => {
      try {
        const url = new URL(image);
        return url.pathname.split("/").pop();
      } catch {
        return null;
      }
    })
    .filter(Boolean) as string[];

  const handleDelete = () => {
    startTransition(async () => {
      const res: any = await deleteProduct({
        adId,
        deleteImages,
        path: pathname,
      });

      if (res?.ok) {
        toast({
          title: "Deleted",
          description: "Product deleted successfully",
          className: "bg-[#30AF5B] text-white",
        });

        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: res?.message || "Product delete failed",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="cursor-pointer hover:text-red-500">
          <DeleteOutlineOutlinedIcon />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this product.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};