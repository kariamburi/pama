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

const Privacy = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const feedback = await getUserDetails(userId);
  const comp = feedback.adminUser;
  const user = feedback.user;
  return (
    <>
      <Head>
        <title>Pama | Buy Pure Turkey Ware in Kenya</title>
        <meta
          name="description"
          content="Pama is Kenya's premier online store specializing in Pure Turkey ware. Shop for the best quality clothes and accessories at affordable prices."
        />
        <meta
          property="og:title"
          content="Pama | Pure Turkey Ware Store in Kenya"
        />
        <meta
          property="og:description"
          content="Pama offers the finest Pure Turkey ware in Kenya. Browse our selection of high-quality clothes, and accessories available for delivery nationwide."
        />
        <meta property="og:image" content="/assets/images/logo.png" />
        <meta property="og:url" content="https://pama.co.ke" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="Pama, Pure Turkey ware, Turkey collections, Turkey clothes,Turkey accessories, Kenya"
        />
        <meta name="author" content="Pama" />
        <link rel="canonical" href="https://pama.co.ke" />
      </Head>
      <div className="z-10 top-0 fixed w-full">
        <Navbar userstatus="User" comp={comp} userId={userId} />
      </div>

      <div className="max-w-3xl mx-auto flex mt-20 p-1">
        <div className="hidden lg:inline mr-5"></div>

        <div className="flex-1">
          <div className="rounded-[20px] bg-white max-w-6xl mx-auto lg:flex-row mt-0 p-1 justify-center">
            <div className="privacy-policy p-6 text-gray-800">
              <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>

              <p className="mb-4">
                Your privacy is important to us at AutoYard.co.ke. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
                By using our site, you agree to the terms outlined in this
                policy. If you do not agree with the terms, please do not use
                our website.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Information We Collect
              </h2>

              <p className="mb-4">
                <strong>Personal Data:</strong> When you create an account, post
                a listing, or contact us, we may collect personal information
                such as:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Location</li>
                <li>Vehicle details (e.g., make, model, year)</li>
              </ul>

              <p className="mb-4">
                <strong>Usage Data:</strong> We may also collect information on
                how you access and use our website, including your:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit on our website</li>
                <li>Time and date of your visits</li>
                <li>Time spent on those pages</li>
                <li>Device information</li>
              </ul>

              <p className="mb-4">
                <strong>Cookies and Tracking Technologies:</strong> We use
                cookies, web beacons, and similar technologies to track your
                activity on our website and store certain information. Cookies
                are small data files that are placed on your device when you
                visit a website. You can instruct your browser to refuse all
                cookies or to indicate when a cookie is being sent, but this may
                limit your ability to use some features of our website.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                2. How We Use Your Information
              </h2>

              <p className="mb-4">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>To create and manage your account</li>
                <li>
                  To facilitate the posting and management of your vehicle
                  listings
                </li>
                <li>
                  To communicate with you regarding your account or listings
                </li>
                <li>
                  To respond to your inquiries and provide customer support
                </li>
                <li>
                  To send you updates, promotions, and marketing materials (with
                  your consent)
                </li>
                <li>
                  To monitor and analyze usage trends and improve our website
                  and services
                </li>
                <li>
                  To protect our website against fraud and unauthorized
                  activities
                </li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                3. Sharing Your Information
              </h2>

              <p className="mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>
                  <strong>With Service Providers:</strong> We may share your
                  information with third-party service providers who assist us
                  in operating our website, conducting our business, or serving
                  our users, as long as those parties agree to keep your
                  information confidential.
                </li>
                <li>
                  <strong>For Legal Compliance:</strong> We may disclose your
                  information if required by law, such as to comply with a
                  subpoena, or similar legal process, or to protect our rights.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a
                  merger, acquisition, or sale of all or a portion of our
                  assets, your information may be transferred as part of that
                  transaction.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your
                  information for any other purpose disclosed to you with your
                  consent.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Security of Your Information
              </h2>

              <p className="mb-4">
                We take reasonable measures to protect your personal information
                from unauthorized access, use, or disclosure. However, please be
                aware that no method of transmission over the Internet or method
                of electronic storage is 100% secure, and we cannot guarantee
                absolute security of your information.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                5. Your Data Protection Rights
              </h2>

              <p className="mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>
                  <strong>Access:</strong> You have the right to request a copy
                  of the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> You have the right to request
                  that we correct any information you believe is inaccurate or
                  complete information you believe is incomplete.
                </li>
                <li>
                  <strong>Deletion:</strong> You have the right to request that
                  we delete your personal information, under certain conditions.
                </li>
                <li>
                  <strong>Restriction:</strong> You have the right to request
                  that we restrict the processing of your personal information,
                  under certain conditions.
                </li>
                <li>
                  <strong>Objection:</strong> You have the right to object to
                  our processing of your personal information, under certain
                  conditions.
                </li>
                <li>
                  <strong>Data Portability:</strong> You have the right to
                  request that we transfer the data that we have collected to
                  another organization, or directly to you, under certain
                  conditions.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                6. Account Deletion Policy
              </h2>

              <p className="mb-4">
                If you choose to delete your account, please note the following:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>
                  Your account information and data will be permanently deleted
                  and cannot be recovered.
                </li>
                <li>
                  You will no longer have access to any data or content
                  associated with your account.
                </li>
                <li>
                  Any vehicle listings you have posted will be removed from the
                  website.
                </li>
                <li>
                  To delete your account: Go to &quot;Manage Account &quot; in
                  your account settings. Select the &quot;Security&quot; tab.
                  Click on the &quot;Delete Account&quot; button.
                </li>
                <li>
                  Please contact our support team if you need assistance with
                  account deletion.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                7. Changes to This Privacy Policy
              </h2>

              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                our website. You are advised to review this Privacy Policy
                periodically for any changes. Changes to this Privacy Policy are
                effective when they are posted on this page.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>

              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <ul className="list-disc list-inside ml-6 mb-4">
                <li>
                  Email:{" "}
                  <a href="mailto:support@autoyard.co.ke">
                    support@autoyard.co.ke
                  </a>
                </li>
              </ul>

              <p className="mb-4">
                Thank you for visiting AutoYard.co.ke and reviewing our Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div>
          <Footersub />
        </div>
      </footer>
    </>
  );
};

export default Privacy;
