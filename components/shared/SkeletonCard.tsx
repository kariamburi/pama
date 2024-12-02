import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonCard = () => (
  <>
    <div className="space-y-4">
      {/* Image */}

      <Skeleton
        variant="rectangular"
        style={{
          width: "100%",
          //borderRadius: "0.75rem",
          borderTopLeftRadius: "0.75rem", // equivalent to `rounded-t-xl`
          borderTopRightRadius: "0.75rem",
          height: "24rem", // equivalent to `h-72`
        }}
      />
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
  </>
);

export default SkeletonCard;
