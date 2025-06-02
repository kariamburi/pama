"use client";

import React, { useState } from "react";
import { deleteOrder } from "@/lib/actions/order.actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Pagination from "./Pagination";
import Link from "next/link";
import { deleteProduct } from "@/lib/actions/ad.product";
import { DeleteConfirmation } from "./DeleteConfirmation";
import ProductWindowUpdate from "./ProductWindowUpdate";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import UsersWindowUpdate from "./UsersWindowUpdate";
type CollectionProps = {
  data: any[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages: number;
  urlParamName?: string;
  userId: string;
};

const CollectionUsers = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages,
  urlParamName,
  userId,
}: CollectionProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const pathname = usePathname();
  const { toast } = useToast();

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order); // Set the selected order to display in the modal
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  console.log(data);
  const handleClose = () => {
    setIsOpen(false);
  };

  const [isOpenUser, setIsOpenUser] = useState(false);
  const handleOpenUser = () => {
    setIsOpenUser(true);
  };

  const handleCloseUser = () => {
    setIsOpenUser(false);
  };
  const [selectedDelivery, setSelectedDelivery] = useState<any | null>(null); // State for selected delivery
  const [isOpenMethods, setIsOpenMethods] = useState(false);

  const handleOpenMethods = (delivery: any) => {
    setSelectedDelivery(delivery); // Set the selected delivery item
    setIsOpenMethods(true); // Open the modal
  };

  const handleCloseMethods = () => {
    setSelectedDelivery(null); // Clear the selected delivery
    setIsOpenMethods(false); // Close the modal
  };
  return (
    <div>
      {data.length > 0 ? (
        <div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">
                  Business Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">WhatsApp</th>

                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100 text-sm">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {user.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.businessname || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.whatsapp || "N/A"}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <div
                      onClick={() => handleOpenMethods(user)} // Pass the specific delivery
                      className="cursor-pointer hover:text-green-600"
                    >
                      <ModeEditOutlinedIcon />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="font-bold text-[16px] lg:text-[25px]">{emptyTitle}</h3>
          <p className="text-sm lg:p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
      {selectedDelivery && (
        <UsersWindowUpdate
          isOpen={isOpenMethods}
          onClose={handleCloseMethods}
          userId={selectedDelivery._id}
          type={"Update"}
          user={selectedDelivery}
        />
      )}
    </div>
  );
};

export default CollectionUsers;
