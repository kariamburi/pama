"use server";

import DashboardSkeleton from "@/components/shared/DashboardSkeleton";
import HomeDashboard from "@/components/shared/HomeDashboard";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";
import {
  getAllProducts,
  getTotalProducts,
  getTrendingProducts,
} from "@/lib/actions/ad.product";
import { getAllDeliveries } from "@/lib/actions/delivery.actions";
import {
  getallOders,
  getGraphSales,
  getStatusOrders,
} from "@/lib/actions/order.actions";
import {
  getAdminProfile,
  getAllUsers,
  getUserDetails,
} from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const Home = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const userName = sessionClaims?.userName as string;
  const userImage = sessionClaims?.userImage as string;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 50;

  const orderId = (searchParams?.orderId as string) || "";
  const end = (searchParams?.end as string) || "";
  const start = (searchParams?.start as string) || "";

  const searchText = (searchParams?.query as string) || "";

  const sortby = (searchParams?.sortby as string) || "";

  const category = (searchParams?.category as string) || "";
  const gender = (searchParams?.gender as string) || "";
  const kids = (searchParams?.kids as string) || "";
  const product = (searchParams?.product as string) || "";
  const material = (searchParams?.material as string) || "";
  const occassion = (searchParams?.occassion as string) || "";
  const color = (searchParams?.color as string) || "";
  const price = (searchParams?.price as string) || "";
  const duration = (searchParams?.duration as string) || "week";
  const [minPrice, maxPrice] = price.split("-");

  const Products = await getAllProducts({
    query: searchText,
    sortby: sortby,
    category: category,
    gender: gender,
    kids: kids,
    product: product,
    material: material,
    occassion: occassion,
    price: price,
    color: color,
    page,
    limit: 20,
  });

  // const feedback = product ? gender + "-" + product : "Product";
  const orders = await getallOders(orderId, start, end, limit, page);
  const users = await getAllUsers(limit, page);
  const deliveries = await getAllDeliveries();
  const prodSum = await getTotalProducts();
  const orderSum = await getStatusOrders();
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  if (
    !Products ||
    !feedback ||
    !orders ||
    !users ||
    !deliveries ||
    !prodSum ||
    !orderSum
  ) {
    return (
      <div>
        <DashboardSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="fixed z-10 top-0 w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>
      <div className="w-full flex mt-20 mb-0 p-1">
        <HomeDashboard
          userId={userId}
          userName={userName}
          userImage={userImage}
          limit={limit}
          page={page}
          orders={orders?.data}
          totalPages={orders?.totalPages ?? 1}
          Products={Products?.data}
          totalPagesProducts={Products?.totalPages ?? 1}
          users={users}
          totalPagesUsers={users?.totalPages ?? 1}
          deliveries={deliveries}
          prodSum={prodSum}
          orderSum={orderSum}
          //trending={trending}
        />
        <Toaster />
      </div>
    </>
  );
};

export default Home;
