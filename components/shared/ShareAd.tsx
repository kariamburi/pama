import React, { useState } from "react";
import { FaTwitter } from "react-icons/fa";

import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { updateshared } from "@/lib/actions/ad.product";
import { IProduct } from "@/lib/database/models/product.model";

interface shareProps {
  product: IProduct;
}

const ShareAd: React.FC<shareProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const shareUrl = `https://www.pama.co.ke/product/${product._id}`;
  const shareTitle = `${product.productName}, Price: Ksh ${(
    product.price -
    (product.price * Number(product.discount)) / 100
  ).toLocaleString()}`;
  const shareDescription = product.description;
  const imageUrl = product.imageUrls[0];
  const handleShare = async () => {
    //console.log(`Shared via ${platform}`);
    const shared = (Number(product.shared ?? "0") + 1).toString();
    const _id = product._id;
    await updateshared({
      _id,
      shared,
      path: `/product/${product._id}`,
    });
    // You can add any analytics or event tracking here
  };
  return (
    <>
      <Head>
        <meta property="og:title" content={product.productName} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageUrls[0]} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Pama" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.productName} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.imageUrls[0]} />
        <meta name="twitter:url" content={shareUrl} />
      </Head>
      <div className="flex gap-5 w-full p-1">
        <FacebookShareButton
          url={shareUrl}
          title={shareTitle}
          quote={shareDescription} // Facebook uses 'quote' for description
          hashtag="" // Optionally add a hashtag
          onClick={() => handleShare()}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={`${shareTitle}\n${shareDescription}`} // WhatsApp uses 'title' as the shared message
          separator=": " // Separator between title and URL
          onClick={() => handleShare()}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={`${shareTitle}\n${shareDescription}`} // Twitter uses 'title' for the tweet content
          hashtags={[]} // Optionally add hashtags
          onClick={() => handleShare()}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={shareTitle} // Email uses 'subject' for the email subject
          body={shareDescription} // Email uses 'body' for the email content
          onClick={() => handleShare()}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareAd;
