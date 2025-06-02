import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CartPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton variant="rectangular" width={150} height={40} />
        <div className="flex gap-4">
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={50} height={20} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>

      {/* Page Title */}
      <Skeleton variant="text" width={200} height={30} className="mb-6" />
      <div className="lg:m-1 space-y-0 lg:flex lg:space-x-5 gap-8">
        {/* Cart Items */}

        <div className="lg:flex-1">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 p-4 border rounded-lg shadow"
            >
              <Skeleton variant="rectangular" width={100} height={100} />
              <div className="flex-grow">
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton variant="rectangular" width={40} height={30} />
                  <Skeleton variant="text" width={40} height={30} />
                  <Skeleton variant="rectangular" width={40} height={30} />
                </div>
              </div>
              <Skeleton variant="text" width={60} height={30} />
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8 flex flex-col items-start lg:items-end">
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={150} height={20} className="mb-4" />
          <Skeleton variant="rectangular" width={200} height={40} />
        </div>
      </div>
      {/* Footer */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Skeleton variant="text" width={150} height={20} className="mb-4" />
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              variant="text"
              width="90%"
              height={20}
              className="mb-2"
            />
          ))}
        </div>
        <div>
          <Skeleton variant="text" width={150} height={20} className="mb-4" />
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              variant="text"
              width="90%"
              height={20}
              className="mb-2"
            />
          ))}
        </div>
        <div>
          <Skeleton variant="text" width={150} height={20} className="mb-4" />
          {[1, 2, 3].map((item) => (
            <Skeleton
              key={item}
              variant="text"
              width="90%"
              height={20}
              className="mb-2"
            />
          ))}
        </div>
        <div>
          <Skeleton variant="text" width={200} height={20} className="mb-4" />
          <Skeleton variant="rectangular" width="90%" height={40} />
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
