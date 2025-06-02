import React from "react";
import { useQRCode } from "next-qrcode";

interface ProductProps {
  sku: string;
}

const ProductQRCode: React.FC<ProductProps> = ({ sku }) => {
  const { Canvas } = useQRCode();
  const printQRCode = () => {
    window.print(); // This will open the browser's print dialog
  };

  return (
    <div>
      <div onClick={printQRCode} className="qr-code-container cursor-pointer">
        <Canvas
          text={sku}
          options={{
            errorCorrectionLevel: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductQRCode;
