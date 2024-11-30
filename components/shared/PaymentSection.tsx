"use client";
import React from "react";
import ShortcutOutlinedIcon from "@mui/icons-material/ShortcutOutlined";
const PaymentSection: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Payment</h2>
      <div className="border-0 p-0 rounded-md">
        <p className="mb-2 text-sm">
          All transactions are secure and encrypted.
        </p>
        <div className="flex p-2 text-sm w-full border justify-between items-center bg-blue-50">
          <div className="flex items-center">Pesapal</div>
          <div className="flex items-center">
            <img
              src="/assets/images/visa.png"
              alt="Visa"
              className="h-6 mr-2"
            />
            <img src="/assets/images/mpesa.png" alt="Mpesa" className="h-6" />
          </div>
        </div>
        <div className="flex p-2 text-sm w-full border flex-col items-center bg-gray-50">
          <div className="flex items-center">
            <img src="/assets/images/out.png" alt="pesapal" className="h-14" />
          </div>
          <div className="m-4 text-xs items-center justify-center text-gray-700">
            After clicking “Pay now”, you will be redirected to Pesapal to
            complete your purchase securely.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
