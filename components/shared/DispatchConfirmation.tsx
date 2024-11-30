"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
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
import { updateDispatchedOrders } from "@/lib/actions/order.actions";
type dispatchProps = {
  _id: string;
};
export const DispatchConfirmation = ({ _id }: dispatchProps) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="bg-gray-100 p-1 rounded-lg cursor-pointer hover:bg-gray-200">
          <ScheduleSendOutlinedIcon />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Order Dispatch?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will notify the Client
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await updateDispatchedOrders(_id);
              })
            }
          >
            {isPending ? "Confirming..." : "Dispatch"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
