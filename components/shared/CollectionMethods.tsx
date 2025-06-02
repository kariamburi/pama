import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Pagination from "./Pagination";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import MethodsWindowUpdate from "./MethodsWindowUpdate";
import { DeleteConfirmationMethods } from "./DeleteConfirmationMethods";

type CollectionProps = {
  data: any[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  totalPages: number;
  urlParamName?: string;
  userId: string;
  limit: number;
};

const CollectionMethods = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages,
  urlParamName,
  userId,
  limit,
}: CollectionProps) => {
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
                <th className="border border-gray-300 px-4 py-2">Method</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Areas</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Note</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((delivery: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100 text-sm">
                  <td className="border border-gray-300 px-4 py-2">
                    {delivery.method}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {delivery.location || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {delivery.areas && delivery.areas.length > 0
                      ? delivery.areas.join(", ")
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {delivery.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {delivery.note || "N/A"}
                  </td>
                  <td className="flex gap-2 border border-gray-300 px-4 py-2">
                    <div
                      onClick={() => handleOpenMethods(delivery)} // Pass the specific delivery
                      className="cursor-pointer hover:text-green-600"
                    >
                      <ModeEditOutlinedIcon />
                    </div>
                    <DeleteConfirmationMethods adId={delivery._id} />
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

      {/* Modal for displaying delivery details */}
      {selectedDelivery && (
        <MethodsWindowUpdate
          isOpen={isOpenMethods}
          onClose={handleCloseMethods}
          userId={userId}
          type="Update"
          delivery={selectedDelivery} // Pass the selected delivery
          deliveryId={selectedDelivery._id}
        />
      )}
    </div>
  );
};

export default CollectionMethods;
