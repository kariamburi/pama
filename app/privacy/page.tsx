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

const Privacy = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <>
      <Head>
        <title>Privacy Policy - Pama Collection</title>
        <meta
          name="description"
          content="Read Pama Collection's Privacy Policy to understand how we collect, use, and protect your personal information when you shop with us."
        />
        <meta
          name="keywords"
          content="Privacy Policy, Pama Collection, personal information, data protection, customer privacy"
        />
        <meta name="author" content="Pama Collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Privacy Policy - Pama Collection" />
        <meta
          property="og:description"
          content="Learn how Pama Collection values your privacy and handles your personal information. Review our policies on data usage and protection."
        />
        <meta property="og:url" content="https://www.pama.co.ke/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo.png" />
      </Head>
      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-[20px] bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <div className="container mx-auto p-6 border text-gray-800 rounded-[20px] ">
              <h1 className="text-3xl font-bold text-center mb-6 text-black">
                Privacy Policy for Pama Collection
              </h1>
              <p className="text-sm text-center mb-4 text-gray-500">
                Last Updated: December 1, 2024
              </p>

              <p className="mb-4">
                Pama Collection is committed to protecting the privacy of our
                customers and website users. This Privacy Policy explains how we
                collect, use, and safeguard your information when you visit our
                website,{" "}
                <a
                  href="https://www.pama.co.ke"
                  className="text-teal-600 underline"
                >
                  www.pama.co.ke
                </a>
                .
              </p>
              <p className="mb-6">
                By accessing or using our website, you consent to the practices
                described in this Privacy Policy.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>
                  <b>Personal Information:</b> Name, contact details (email
                  address, phone number), delivery address, payment details.
                </li>
                <li>
                  <b>Non-Personal Information:</b> IP address, browser type,
                  device information, website usage data.
                </li>
                <li>
                  <b>Cookies and Tracking Technologies:</b> We use cookies to
                  enhance user experience. You can disable cookies in your
                  browser settings.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-black">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 mb-6">
                <li>To process orders and payments.</li>
                <li>To deliver purchased items to your address.</li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>
                  To send promotional emails, newsletters, or offers (if you
                  opt-in).
                </li>
                <li>
                  To improve our website functionality and user experience.
                </li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-black">
                3. How We Protect Your Information
              </h2>
              <p className="mb-6">
                We implement security measures such as encryption, secure
                payment processing, and regular website audits to safeguard your
                information.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                4. Sharing of Information
              </h2>
              <p className="mb-6">
                We do not sell your personal information. However, we may share
                your information with service providers or for legal compliance.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                5. Your Rights
              </h2>
              <ul className="list-disc pl-6 mb-6">
                <li>
                  <b>Access:</b> Request details of the personal information we
                  hold about you.
                </li>
                <li>
                  <b>Correction:</b> Update or correct your personal
                  information.
                </li>
                <li>
                  <b>Deletion:</b> Request deletion of your personal
                  information, subject to legal obligations.
                </li>
                <li>
                  <b>Opt-Out:</b> Unsubscribe from promotional emails or
                  newsletters.
                </li>
              </ul>
              <p className="mb-6">
                To exercise these rights, email us at{" "}
                <a
                  href="mailto:privacy@pama.co.ke"
                  className="text-teal-600 underline"
                >
                  support@pama.co.ke
                </a>
                .
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                6. Third-Party Services
              </h2>
              <p className="mb-6">
                Our website may include links to third-party services. We are
                not responsible for their privacy practices.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                7. Children&apos;s Privacy
              </h2>
              <p className="mb-6">
                Our website is not intended for individuals under 18. We do not
                knowingly collect data from children.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                8. Changes to This Privacy Policy
              </h2>
              <p className="mb-6">
                We reserve the right to update this Privacy Policy. Changes will
                be posted on this page with the &quot;Last Updated`&quot; date.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-black">
                9. Contact Us
              </h2>
              <p className="mb-4">For questions or concerns, reach us at:</p>
              <ul className="list-disc pl-6">
                <li>
                  <b>Email:</b>{" "}
                  <a
                    href="mailto:privacy@pama.co.ke"
                    className="text-teal-600 underline"
                  >
                    support@pama.co.ke
                  </a>
                </li>
                <li>
                  <b>Phone:</b> {comp.phone}
                </li>
                <li>
                  <b>Address:</b> {comp.businessaddress}
                </li>
              </ul>
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

export default Privacy;
