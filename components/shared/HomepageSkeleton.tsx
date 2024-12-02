import React from "react";
import Skeleton from "@mui/material/Skeleton";

const HomepageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4 text-center">
        <Skeleton variant="text" width="40%" height={40} className="mx-auto" />
        <Skeleton variant="text" width="60%" height={20} className="mx-auto" />
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={50}
          />
        ))}
      </div>

      {/* Sort and Filter Options */}
      <div className="flex justify-between items-center">
        <Skeleton variant="rectangular" width={100} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-4">
            {/* Image */}
            <Skeleton variant="rectangular" width="100%" height={200} />
            {/* Text Details */}
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            {/* Price */}
            <Skeleton variant="text" width="40%" height={20} />
            {/* Buttons */}
            <div className="flex justify-between">
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton variant="text" width="50%" height={20} />
            {[...Array(4)].map((_, subIndex) => (
              <Skeleton key={subIndex} variant="text" width="80%" height={15} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomepageSkeleton;
