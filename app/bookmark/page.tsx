import NavItems from "@/components/shared/NavItems";

import { SearchParamProps } from "@/types";
//import DashboardMyads from "@/components/shared/dashboardMyads";

import Navbar from "@/components/shared/navbar";
import { getUserById, getUserDetails } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { getallBookmarkByuserId } from "@/lib/actions/bookmark.actions";
import DashboardBookmark from "@/components/shared/dashboardBookmark";
import { Toaster } from "@/components/ui/toaster";

const myads = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const adsPage = Number(searchParams?.adsPage) || 1;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;

  return (
    <>
      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>
      <div className="mt-20">
        <DashboardBookmark
          userId={userId}
          // data={bookmark?.data}
          user={user}
          emptyTitle="No ads have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Ads_Organized"
          limit={20}
          // page={adsPage}
          urlParamName="adsPage"
          //  totalPages={bookmark?.totalPages}
        />
        <Toaster />
      </div>
    </>
  );
};

export default myads;
