import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonCard = () => (
  <Box
    style={{
      width: "100%",
      padding: "0",
      borderRadius: "0.75rem", // equivalent to `rounded-xl`
      // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // equivalent to `shadow-md`
      backgroundColor: "white",
    }}
  >
    {/* Image skeleton */}
    <Skeleton
      variant="rectangular"
      style={{
        width: "100%",
        borderRadius: "0.75rem",
        // borderTopLeftRadius: "0.75rem", // equivalent to `rounded-t-xl`
        // borderTopRightRadius: "0.75rem",
        height: "18rem", // equivalent to `h-72`
      }}
    />

    {/* Content skeleton */}
    <div
      style={{
        marginTop: "2px", // equivalent to `mt-4`
        padding: "5px", // equivalent to `p-4`
        display: "flex",
        flexDirection: "column",
        gap: "8px", // equivalent to `space-y-2`
      }}
    >
      {/* Title skeleton */}
      <Skeleton
        variant="text"
        style={{
          width: "80%", // equivalent to `w-4/5`
          height: "24px", // equivalent to `h-6`
        }}
      />

      {/* Price skeleton */}
      <Skeleton
        variant="text"
        style={{
          width: "40%", // equivalent to `w-2/5`
          height: "20px", // equivalent to `h-5`
        }}
      />

      {/* Location skeleton */}
      <Skeleton
        variant="text"
        style={{
          width: "40%", // equivalent to `w-2/5`
          height: "16px", // equivalent to `h-4`
        }}
      />

      {/* Review skeleton */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px", // equivalent to `space-x-2`
        }}
      >
        <Skeleton
          variant="text"
          style={{
            width: "20%", // equivalent to `w-1/5`
            height: "20px", // equivalent to `h-5`
          }}
        />
        <Skeleton
          variant="text"
          style={{
            width: "20%", // equivalent to `w-1/5`
            height: "20px",
          }}
        />
        <Skeleton
          variant="text"
          style={{
            width: "20%", // equivalent to `w-1/5`
            height: "20px",
          }}
        />
      </div>
    </div>
  </Box>
);

export default SkeletonCard;
