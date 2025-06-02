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
const Terms = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <>
      <Head>
        <title>Terms and Conditions | Pama Collection</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for Pama Collection. Learn about our policies for purchasing Turkish wears online, delivery, returns, and more."
        />
        <meta
          name="keywords"
          content="Pama Collection, Terms and Conditions, Turkish wears, Ladies clothing, Online shopping, Delivery policy, Return policy"
        />
        <meta name="author" content="Pama Collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Terms and Conditions | Pama Collection"
        />
        <meta
          property="og:description"
          content="Learn about Pama Collection's Terms and Conditions. We specialize in Turkish wears, offering high-quality ladies' clothing with online shopping and parcel delivery."
        />
        <meta
          property="og:url"
          content="https://www.pama.co.ke/terms-and-conditions"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.pama.co.ke/assets/images/logo.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Terms and Conditions | Pama Collection"
        />
        <meta
          name="twitter:description"
          content="Explore Pama Collection's Terms and Conditions for online shopping of Turkish wears, delivery details, return policy, and more."
        />
        <meta
          name="twitter:image"
          content="https://www.pama.co.ke/assets/images/logo.png}"
        />

        <link rel="canonical" href="https://www.pama.co.ke/terms" />
      </Head>
      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-[20px] bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <div className="p-6 bg-white text-gray-800 max-w-4xl mx-auto rounded-[20px] border">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Terms and Conditions for Pama Collection
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Effective Date:</strong> December 1, 2024
              </p>
              <p className="mb-4">
                Welcome to Pama Collection! These Terms and Conditions (Terms)
                govern your use of our website{" "}
                <strong>
                  <a
                    href="https://www.pama.co.ke"
                    className="text-teal-600 hover:underline"
                  >
                    www.pama.co.ke
                  </a>
                </strong>{" "}
                (Website) and the purchase of our products. By accessing or
                using our Website, you agree to comply with these Terms. Please
                read them carefully before making any purchase.
              </p>

              <h2 className="text-lg font-semibold mb-2">
                1. General Overview
              </h2>
              <p className="mb-4">
                Pama Collection specializes in selling high-quality Turkish
                wear, with a particular focus on ladies&apos; clothing. Our
                online store allows buyers to select items, make purchases, and
                arrange for delivery.
              </p>

              <h2 className="text-lg font-semibold mb-2">2. Use of Website</h2>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  You must be at least 18 years old to place an order on our
                  Website.
                </li>
                <li>
                  All information provided on the Website is for general
                  informational purposes and may be updated without notice.
                </li>
                <li>
                  Misuse of the Website, including unauthorized access or data
                  tampering, is strictly prohibited.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mb-2">
                3. Orders and Payments
              </h2>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  All prices listed on the Website are in Kenyan Shillings (KES)
                  and are inclusive of VAT, where applicable.
                </li>
                <li>
                  Delivery charges are calculated and displayed at checkout.
                </li>
                <li>
                  Payments must be made in full before your order is processed.
                  We accept payments via mobile money (M-Pesa) and other payment
                  methods available on the Website.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mb-2">4. Delivery Policy</h2>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  Pama Collection delivers items to customers as parcels.
                  Delivery charges vary based on the location of the buyer and
                  will be clearly indicated during checkout.
                </li>
                <li>
                  We aim to dispatch orders within 24 hours of receiving
                  payment. Delivery times may vary depending on your location
                  and the courier service used.
                </li>
                <li>
                  Buyers are responsible for providing accurate delivery
                  information. Pama Collection will not be held liable for
                  delayed or failed deliveries due to incorrect addresses or
                  contact details.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mb-2">
                5. Return and Exchange Policy
              </h2>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  Due to the nature of clothing products, items can only be
                  returned or exchanged if:
                  <ul className="list-disc ml-6">
                    <li>The item is defective or damaged upon delivery.</li>
                    <li>The wrong item was delivered.</li>
                    <li>The issue with the fitting of the delivered item.</li>
                  </ul>
                </li>
                <li>
                  Requests for returns or exchanges must be made within 3 days
                  of receiving the item by contacting our customer service at{" "}
                  <strong>
                    <a
                      href="mailto:support@pama.co.ke"
                      className="text-teal-600 hover:underline"
                    >
                      support@pama.co.ke
                    </a>
                  </strong>{" "}
                  or {comp.phone}.
                </li>
                <li>
                  The item must be returned in its original condition, unworn,
                  and with all tags intact.
                </li>
                <li>
                  Delivery charges for returns or exchanges are non-refundable,
                  and the buyer bears the cost of return shipping.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mb-2">6. Privacy Policy</h2>
              <p className="mb-4">
                Pama Collection respects your privacy. Any personal information
                collected during your use of the Website will be used solely for
                order processing, delivery, and customer support. We will not
                share your information with third parties except as required for
                order fulfillment or by law.
              </p>

              <h2 className="text-lg font-semibold mb-2">
                7. Limitation of Liability
              </h2>
              <ul className="list-disc ml-6 mb-4">
                <li>
                  Pama Collection is not liable for any indirect, incidental, or
                  consequential damages arising from the use of the Website or
                  the purchase of products.
                </li>
                <li>
                  While we strive to ensure the accuracy of product
                  descriptions, colors, and images on the Website, minor
                  variations may occur, and we cannot guarantee an exact match.
                </li>
              </ul>

              <h2 className="text-lg font-semibold mb-2">8. Governing Law</h2>
              <p className="mb-4">
                These Terms are governed by and construed in accordance with the
                laws of Kenya. Any disputes arising out of or related to these
                Terms will be subject to the jurisdiction of the Kenyan courts.
              </p>

              <h2 className="text-lg font-semibold mb-2">9. Amendments</h2>
              <p className="mb-4">
                Pama Collection reserves the right to update or modify these
                Terms at any time. Changes will be posted on the Website, and
                your continued use of the Website constitutes acceptance of the
                revised Terms.
              </p>

              <h2 className="text-lg font-semibold mb-2">
                10. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions or concerns about these Terms, please
                contact us at:
              </p>
              <p className="mb-4">
                <strong>Pama Collection</strong>
                <br />
                Website:{" "}
                <a
                  href="https://www.pama.co.ke"
                  className="text-teal-600 hover:underline"
                >
                  www.pama.co.ke
                </a>
                <br />
                Email:{" "}
                <a
                  href="mailto:support@pama.co.ke"
                  className="text-teal-600 hover:underline"
                >
                  support@pama.co.ke
                </a>
                <br />
                Phone: {comp.phone ?? ""}
              </p>

              <p className="text-center font-semibold mt-4">
                By purchasing from Pama Collection, you agree to these Terms and
                Conditions. Thank you for choosing us for your fashion needs!
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100">
        <div>
          <Footer comp={comp} />
        </div>
      </footer>
    </>
  );
};
export default Terms;
