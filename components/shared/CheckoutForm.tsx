"use client";
import React, { useEffect, useState } from "react";

import ContactForm from "@/components/shared/ContactForm";
import DeliveryDetails from "@/components/shared/DeliveryDetails";
import ShippingMethod from "@/components/shared/ShippingMethod";
import PaymentSection from "@/components/shared/PaymentSection";
import TipSection from "@/components/shared/TipSection";
import OrderSummary from "@/components/shared/OrderSummary";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import { transactionStatus } from "@/lib/actions/transactionstatus";
import { useRouter } from "next/navigation";
import { requestOrder } from "@/lib/actions/requestOrder";
import { updateOrdersByIds } from "@/lib/actions/order.actions";

type CartProps = {
  data: any;
  totalAmount: number;
  deliv: any;
  userId: string;
  userEmail: string;
  //  userName: string;
};
export const CheckoutForm = ({
  data,
  totalAmount,
  deliv,
  userId,
}: CartProps) => {
  const [tip, setTip] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [shippingId, setShippingId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Kenya");
  const [contact, setContact] = useState("");
  const [enablenewoffers, setEnablenewoffers] = useState(true);

  const [errorsfirstname, seterrorsfirstname] = useState("");
  const [errorslastname, seterrorslastname] = useState("");
  const [errorsaddress, seterrorsaddress] = useState("");
  const [errorsphone, seterrorsphone] = useState("");
  const [errorscontact, seterrorscontact] = useState("");
  const [errorscity, seterrorscity] = useState("");

  const handleCountryOnchange = (
    country: string,
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    postalcode: string,
    phone: string
  ) => {
    setCountry(country);
    setFirstname(firstname);
    setLastname(lastname);
    setAddress(address);
    setCity(city);
    setPostalcode(postalcode);
    setPhone(phone);
  };
  const handlecontactOnchange = (newValue: any, checked: boolean) => {
    setContact(newValue);
    setEnablenewoffers(checked);
  };
  const handleShippingOnclick = (newValue: any, _id: string) => {
    setShipping(newValue);
    setShippingId(_id);
  };
  const handleTipOnclick = (newValue: any) => {
    setTip(newValue);
  };
  function generateRandomOrderId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
    return `ORDER_${timestamp}_${randomString.toUpperCase()}`;
  }

  const handlePay = async () => {
    seterrorsfirstname("");
    seterrorslastname("");
    seterrorsaddress("");
    seterrorsphone("");
    seterrorscontact("");
    seterrorscity("");
    if (!contact) {
      seterrorscontact("Contact is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Contact empty!",
        duration: 5000,
      });
      return;
    }
    if (!firstname) {
      seterrorsfirstname("First name is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "First name empty!",
        duration: 5000,
      });
      return;
    }
    if (!lastname) {
      seterrorslastname("Last name is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Last name empty!",
        duration: 5000,
      });
      return;
    }
    if (!address) {
      seterrorsaddress("Address is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Address empty!",
        duration: 5000,
      });
      return;
    }
    if (!city) {
      seterrorscity("City is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "City empty!",
        duration: 5000,
      });
      return;
    }
    if (!phone) {
      seterrorsphone("Phone is required.");
      toast({
        variant: "destructive",
        title: "Failed!",
        description: "Phone empty!",
        duration: 5000,
      });
      return;
    }
    //implement pesapal checkout
    const total = totalAmount + tip + shipping;
    const referenceId = generateRandomOrderId();
    const orderDetails = {
      id: referenceId,
      currency: "KES",
      amount: Number(total),
      description: "Payment for product",
      callback_url: "https://localhost:3000/pesapal",
      notification_id: "",
      billing_address: {
        email: contact,
        phone_number: phone,
        first_name: firstname,
        last_name: lastname,
      },
    };

    try {
      // Send the order details to the API
      const response = await requestOrder(orderDetails);

      // Extract the referenceId and orderId from the response

      const orderId = response.order_tracking_id;

      const redirect_url = response.redirect_url;

      // Extract the IDs to update
      const ids: string[] = data.map((item: any) => item._id);

      // Wait for the update process to complete
      await updateOrdersByIds(
        ids,
        orderId,
        referenceId,
        contact,
        firstname,
        lastname,
        phone,
        shippingId
      );

      // Check the redirect URL and redirect if valid
      if (redirect_url !== "error") {
        // Redirect the user to the payment page
        window.location.href = redirect_url;
      } else {
        console.error("Error in redirect URL");
      }
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <div className="lg:max-w-6xl lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 bg-white p-3 lg:p-6 rounded-md shadow-sm">
        <ContactForm
          onChange={handlecontactOnchange}
          errorscontact={errorscontact}
        />
        <DeliveryDetails
          onChange={handleCountryOnchange}
          errorsfirstname={errorsfirstname}
          errorslastname={errorslastname}
          errorsaddress={errorsaddress}
          errorsphone={errorsphone}
          errorscity={errorscity}
        />
        <ShippingMethod
          deliv={deliv}
          shipping={shipping}
          onChange={handleShippingOnclick}
        />
        <PaymentSection />
        <TipSection
          selected={tip}
          total={totalAmount}
          onClick={handleTipOnclick}
          handlePayNow={handlePay}
        />
      </div>

      {/* Right Section: Order Summary */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <OrderSummary
          cart={data}
          totalAmount={totalAmount}
          shipping={shipping}
          tip={tip}
          handlePayNow={handlePay}
        />
        <Toaster />
      </div>
    </div>
  );
};
