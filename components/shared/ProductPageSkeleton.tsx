import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Section: Image */}
      <div>
        <Skeleton variant="rectangular" width="100%" height={500} />
      </div>

      {/* Right Section: Product Details */}
      <div className="space-y-6">
        {/* Product Title */}
        <Skeleton variant="text" width="70%" height={30} />
        {/* Price */}
        <Skeleton variant="text" width="50%" height={30} />

        {/* Select Size */}
        <div className="space-y-4">
          <Skeleton variant="text" width="30%" height={20} />
          <div className="flex gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} variant="circular" width={40} height={40} />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-4">
          <Skeleton variant="text" width="30%" height={20} />
          <div className="flex items-center gap-4">
            <Skeleton variant="rectangular" width={40} height={40} />
            <Skeleton variant="rectangular" width={60} height={40} />
            <Skeleton variant="rectangular" width={40} height={40} />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Skeleton variant="rectangular" width="100%" height={50} />
          <Skeleton variant="rectangular" width="100%" height={50} />
        </div>

        {/* Payment Methods */}
        <div>
          <Skeleton variant="rectangular" width="100%" height={30} />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="col-span-2 mt-12">
        <Skeleton variant="text" width="40%" height={30} className="mb-4" />
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="text" width="90%" height={20} />
          ))}
        </div>
      </div>

      {/* Sizes In Stock Section */}
      <div className="col-span-2 mt-12">
        <Skeleton variant="text" width="40%" height={30} className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="30%" height={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Social Share Section */}
      <div className="col-span-2 mt-12">
        <Skeleton variant="text" width="40%" height={30} className="mb-4" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="circular" width={40} height={40} />
          ))}
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="col-span-2 mt-12">
        <Skeleton variant="text" width="60%" height={30} className="mb-4" />
        <Skeleton variant="text" width="30%" height={20} />
      </div>

      {/* Footer */}
      <div className="col-span-2 mt-16">
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="90%" height={20} className="mt-4" />
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
