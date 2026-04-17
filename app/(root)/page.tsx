import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import HomepageSkeleton from "@/components/shared/HomepageSkeleton";
import Navbarhome from "@/components/shared/navbarhome";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import CollectionInfinite from "@/components/shared/CollectionInfinite";
import { getUserDetails } from "@/lib/actions/user.actions";

export default async function Home({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();

  const userId = (sessionClaims?.userId as string) || "";
  const userName = (sessionClaims?.userName as string) || "";
  const userImage = (sessionClaims?.userImage as string) || "";

  const page = Number(searchParams?.page) || 1;
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

  let company = null;
  let comp = null;
  let user = null;

  if (userId) {
    company = await getUserDetails(userId);
    comp = company?.adminUser ?? null;
    user = company?.user ?? null;
  }

  return (
    <main>
      <div className="min-h-screen bg-gray-100">
        <div className="w-full h-full">
          <div className="sm:hidden fixed top-0 z-10 w-full">
            <Navbarhome
              userstatus={user?.status || "User"}
              comp={comp}
              userId={userId}
            />
          </div>

          <div className="hidden sm:inline">
            <div className="w-full">
              <Navbarhome
                userstatus={user?.status || "User"}
                comp={comp}
                userId={userId}
              />
            </div>
          </div>

          <div className="max-w-6xl bg-gray-100 mx-auto flex mt-0">
            <div className="flex-1">
              <div className="p-2 mt-[195px] lg:mt-0 mb-5 lg:mb-0">
                <CollectionInfinite
                  gender={gender}
                  kids={kids}
                  emptyTitle="No Products Found"
                  emptyStateSubtext="Come back later"
                  collectionType="All_Ads"
                  limit={20}
                  product={product}
                  material={material}
                  occassion={occassion}
                  price={price}
                  color={color}
                  userId={userId}
                  userName={userName}
                  userImage={userImage}
                  searchText={searchText}
                  sortby={sortby}
                  category={category}
                  comp={comp}
                />
              </div>
            </div>
          </div>

          <Toaster />

          <footer className="bg-white lg:bg-gray-100 border-t">
            <Footer comp={comp} />
          </footer>
        </div>
      </div>
    </main>
  );
}