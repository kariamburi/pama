import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CheckoutPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Section */}
      <div className="col-span-2 space-y-8">
        {/* Contact Section */}
        <div>
          <Skeleton variant="text" width={200} height={30} className="mb-4" />
          <div className="space-y-4">
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="70%" height={20} />
          </div>
        </div>

        {/* Delivery Section */}
        <div>
          <Skeleton variant="text" width={200} height={30} className="mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </div>
        </div>

        {/* Shipping Method */}
        <div>
          <Skeleton variant="text" width={200} height={30} className="mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="rectangular" width="80%" height={30} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Order Summary */}
      <div className="col-span-1 space-y-8">
        {/* Order Summary */}
        <div>
          <Skeleton variant="text" width={150} height={30} className="mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton variant="rectangular" width={64} height={64} />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                </div>
                <Skeleton variant="text" width={50} height={20} />
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
          </div>
        </div>

        {/* Payment */}
        <div>
          <Skeleton variant="text" width={150} height={30} className="mb-4" />
          <Skeleton variant="rectangular" width="100%" height={50} />
          <Skeleton variant="text" width="80%" height={20} className="mt-4" />
        </div>

        {/* Add Tip */}
        <div>
          <Skeleton variant="text" width={150} height={30} className="mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={40}
              />
            ))}
          </div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={50}
            className="mt-4"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="col-span-3 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Skeleton
                variant="text"
                width={150}
                height={20}
                className="mb-4"
              />
              {[...Array(3)].map((__, idx) => (
                <Skeleton
                  key={idx}
                  variant="text"
                  width="90%"
                  height={20}
                  className="mb-2"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
