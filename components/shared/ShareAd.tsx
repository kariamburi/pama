import React, { useState } from "react";
import Head from "next/head";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import { updateshared } from "@/lib/actions/ad.product";
import { IProduct } from "@/lib/database/models/product.model";

interface ShareProps {
  product: IProduct;
}

const ShareAd: React.FC<ShareProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);

  const shareUrl = `https://www.pama.co.ke/product/${product._id}`;
  const shareTitle = `${product.productName}, Price: Ksh ${(
    product.price -
    (product.price * Number(product.discount ?? 0)) / 100
  ).toLocaleString()}`;
  const shareDescription = product.description;
  const imageUrl = product.imageUrls?.[0] || "";

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const shared = (Number(product.shared ?? "0") + 1).toString();
      await updateshared({
        _id: product._id,
        shared,
        path: `/product/${product._id}`,
      });
      console.log("Shared successfully!");
    } catch (error) {
      console.error("Error updating share count:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderShareButton = (
    ShareComponent: React.ElementType,
    IconComponent: React.ElementType,
    additionalProps = {}
  ) => (
    <ShareComponent url={shareUrl} onClick={handleShare} {...additionalProps}>
      <IconComponent size={32} round />
    </ShareComponent>
  );

  return (
    <>
      <Head>
        <meta property="og:title" content={product.productName} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Pama" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.productName} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={shareUrl} />
      </Head>

      <div className="flex gap-5 w-full p-1">
        {renderShareButton(FacebookShareButton, FacebookIcon, {
          title: shareTitle,
          quote: shareDescription,
        })}
        {renderShareButton(WhatsappShareButton, WhatsappIcon, {
          title: `${shareTitle}\n${shareDescription}`,
          separator: ": ",
        })}
        {renderShareButton(TwitterShareButton, TwitterIcon, {
          title: `${shareTitle}\n${shareDescription}`,
        })}
        {renderShareButton(EmailShareButton, EmailIcon, {
          subject: shareTitle,
          body: shareDescription,
        })}
      </div>

      {isLoading && <p>Sharing...</p>}
    </>
  );
};

export default ShareAd;
