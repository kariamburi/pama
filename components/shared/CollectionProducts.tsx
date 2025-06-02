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

const CollectionProducts = ({
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

  const handleClose = () => {
    setIsOpen(false);
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="text-sm bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Product Image
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Discount</th>
                <th className="border border-gray-300 px-4 py-2">Colors</th>
                <th className="border border-gray-300 px-4 py-2">In Stock</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100 text-sm">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.imageUrls[0]}
                      alt={`${product.productName}`}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.productName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    KES {product.price.toLocaleString()}
                  </td>
                  {product.discount ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toLocaleString() +
                          " (-" +
                          product.discount +
                          "%)" || "N/A"}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-4 py-2">
                        KES 0
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    {product.color.join(", ")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.features.reduce((total: any, item: any) => {
                      return total + item.stock;
                    }, 0) + " Pieces"}
                  </td>

                  <td className="flex gap-2 border border-gray-300 px-4 py-2">
                    <div
                      onClick={() => handleOpenMethods(product)} // Pass the specific delivery
                      className="cursor-pointer hover:text-green-600"
                    >
                      <ModeEditOutlinedIcon />
                    </div>

                    <DeleteConfirmation
                      adId={product._id}
                      imageUrls={product.imageUrls}
                    />
                    {/* Modal for displaying order details */}
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
        <ProductWindowUpdate
          isOpen={isOpenMethods}
          onClose={handleCloseMethods}
          userId={userId}
          type={"Update"}
          product={selectedDelivery}
          productId={selectedDelivery._id}
        />
      )}
    </div>
  );
};

export default CollectionProducts;
