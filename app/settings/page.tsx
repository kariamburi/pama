import Navbar from "@/components/shared/navbar";
import SettingsEdit from "@/components/shared/SettingsEdit";
import { getUserById, getUserDetails } from "@/lib/actions/user.actions";
import { Toaster } from "@/components/ui/toaster";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Footersub from "@/components/shared/Footersub";
import Footer from "@/components/shared/Footer";
const Settings = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  const isAdCreator = true;

  return (
    <>
      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="max-w-6xl mb-20 lg:mb-0 mx-auto justify-center">
            <section className="w-full rounded-lg bg-white p-1">
              <div className="w-full p-2 flex flex-col lg:flex-row lg:justify-between">
                <div className="flex text-lg mb-1 gap-1 font-bold">
                  <SettingsOutlinedIcon />
                  <h3 className="font-bold text-[25px]">Settings</h3>
                </div>
              </div>
            </section>

            <SettingsEdit user={user} type="Update" userId={userId} />
            <Toaster />
          </div>
        </div>
      </div>
      <footer className="bg-gray-100">
        <Footer comp={comp} />
      </footer>
    </>
  );
};
export default Settings;
