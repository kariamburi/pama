import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";

const DashboardSkeleton = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        <Skeleton width={200} />
      </Typography>

      <Grid container spacing={2}>
        {/* Overview Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton width="60%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton width="60%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton width="60%" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton width="60%" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graph and Trending Products */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Sales Line Graph */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Skeleton width={150} />
              </Typography>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </CardContent>
          </Card>
        </Grid>

        {/* Trending Products */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Skeleton width={200} />
              </Typography>
              {[...Array(3)].map((_, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={50} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSkeleton;
