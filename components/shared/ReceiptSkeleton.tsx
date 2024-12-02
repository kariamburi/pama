import React from "react";
import Skeleton from "@mui/material/Skeleton";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const ReceiptSkeleton = () => {
  return (
    <Box sx={{ padding: 3 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Skeleton variant="rectangular" width={150} height={40} />
      </Box>

      {/* Order Receipt Content */}
      <Card>
        <CardContent>
          {/* Left Content */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width="50%" />
              </Typography>
              {[...Array(4)].map((_, index) => (
                <Typography key={index}>
                  <Skeleton width="80%" />
                </Typography>
              ))}
            </Grid>

            {/* Right Content */}
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              {[...Array(3)].map((_, index) => (
                <Typography key={index}>
                  <Skeleton width="60%" />
                </Typography>
              ))}
            </Grid>
          </Grid>

          {/* Table */}
          <Box sx={{ marginY: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={150} />
          </Box>

          {/* Total Amount */}
          <Box sx={{ textAlign: "right", marginBottom: 3 }}>
            <Skeleton width="30%" />
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="rectangular" width={100} height={40} />
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ marginTop: 5 }}>
        <Grid container spacing={3}>
          {/* Footer Section 1 */}
          <Grid item xs={12} md={4}>
            {[...Array(6)].map((_, index) => (
              <Typography key={index}>
                <Skeleton width="90%" />
              </Typography>
            ))}
          </Grid>

          {/* Footer Section 2 */}
          <Grid item xs={12} md={4}>
            {[...Array(4)].map((_, index) => (
              <Typography key={index}>
                <Skeleton width="80%" />
              </Typography>
            ))}
          </Grid>

          {/* Footer Section 3 */}
          <Grid item xs={12} md={4}>
            <Typography>
              <Skeleton width="50%" />
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Text */}
        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Skeleton width="40%" />
        </Box>
      </Box>
    </Box>
  );
};

export default ReceiptSkeleton;
