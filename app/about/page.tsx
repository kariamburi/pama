import Navbar from "@/components/shared/navbar";
import SettingsEdit from "@/components/shared/SettingsEdit";
import { getUserById, getUserDetails } from "@/lib/actions/user.actions";
import { Toaster } from "@/components/ui/toaster";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { auth } from "@clerk/nextjs/server";

import Image from "next/image";
import BottomNavigation from "@/components/shared/BottomNavigation";
import Footersub from "@/components/shared/Footersub";
import Head from "next/head";
import Footer from "@/components/shared/Footer";
const About = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <>
      <Head>
        <title>About Us - Pama Collection</title>
        <meta
          name="description"
          content="Discover more about Pama Collection, your trusted source for high-quality Turkish wear, specializing in ladies' clothing. Learn about our mission, values, and commitment to fashion excellence."
        />
        <meta
          name="keywords"
          content="About Pama Collection, Turkish wear, ladies' clothing, high-quality fashion, Pama Collection mission"
        />
        <meta name="author" content="Pama Collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="About Us - Pama Collection" />
        <meta
          property="og:description"
          content="Learn more about Pama Collection, your go-to store for premium Turkish wear and ladies' fashion. Discover our journey and commitment to quality."
        />
        <meta property="og:url" content="https://www.pama.co.ke/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/asets/images/logo.png" />
      </Head>

      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" userId={userId} comp={comp} />
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-[20px] bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <div>
              <div className="max-w-4xl mx-auto p-6 bg-white border rounded-[20px]">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                  About Pama Collection
                </h1>
                <p className="text-gray-700 mb-6">
                  Welcome to <strong>Pama Collection</strong>, your ultimate
                  destination for high-quality Turkey wear, specializing in
                  elegant and stylish ladies&apos; clothing. At Pama Collection,
                  we are passionate about providing our customers with the best
                  in fashion, blending modern trends with timeless designs that
                  make you stand out.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Our Story
                </h2>
                <p className="text-gray-700 mb-6">
                  Founded with a vision to bring unique and premium-quality
                  clothing to the Kenyan market, Pama Collection has quickly
                  grown to become a trusted name in ladies&quot fashion. We are
                  inspired by the beauty and confidence of our customers, and
                  our carefully curated selection of Turkey wear is designed to
                  celebrate individuality and style.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  What We Offer
                </h2>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  <li>
                    <strong>Pure Turkey Wear:</strong> A wide range of authentic
                    and high-quality ladies&apos; outfits directly sourced from
                    Turkey.
                  </li>
                  <li>
                    <strong>Variety of Styles:</strong> From casual to formal
                    wear, we have something for every occasion.
                  </li>
                  <li>
                    <strong>Affordable Prices:</strong> Trendy fashion at prices
                    that suit your budget.
                  </li>
                  <li>
                    <strong>Online Shopping Experience:</strong> Browse our
                    latest collections on our website,{" "}
                    <a
                      href="https://www.pama.co.ke"
                      className="text-teal-600 underline"
                    >
                      www.pama.co.ke
                    </a>
                    , and shop from the comfort of your home.
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Our Commitment
                </h2>
                <p className="text-gray-700 mb-6">
                  At Pama Collection, we believe in:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  <li>
                    <strong>Customer Satisfaction:</strong> Your happiness is
                    our priority. We strive to provide excellent service and a
                    seamless shopping experience.
                  </li>
                  <li>
                    <strong>Quality Assurance:</strong> Each item in our
                    collection is handpicked to meet the highest quality
                    standards.
                  </li>
                  <li>
                    <strong>Convenience:</strong> We offer nationwide delivery
                    to ensure you get your favorite outfits delivered right to
                    your doorstep.
                  </li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Why Choose Us?
                </h2>
                <p className="text-gray-700 mb-6">
                  When you shop with Pama Collection, you are choosing a brand
                  that values quality, style, and affordability. Whether
                  you&apos;re looking for a chic dress for a party, professional
                  attire for work, or comfortable casual wear, we&apos;ve got
                  you covered.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Contact Us
                </h2>
                <p className="text-gray-700">
                  Do you have questions or need assistance? We are here to help!
                </p>
                <ul className="list-none pl-0 text-gray-700 mt-4">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:support@pama.co.ke"
                      className="text-teal-600 underline"
                    >
                      support@pama.co.ke
                    </a>
                  </li>
                  <li>
                    <strong>Phone:</strong> {comp.phone}
                  </li>
                  <li>
                    <strong>Visit Us:</strong> {comp.businessaddress}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-100">
        <Footer comp={comp} />
      </footer>
    </>
  );
};
export default About;
