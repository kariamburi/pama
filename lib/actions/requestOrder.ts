"use server";

import axios from "axios";

export async function requestOrder(
  orderDetails: {
    id: string;
    currency: string;
    amount: number;
    description: string;
    callback_url: string;
    notification_id: string;
    billing_address: {
      email: string;
      phone_number: string;
      first_name: string;
      last_name: string;
    };
  }
) {
  // Construct the request URL
  const requestUrl = "https://craftinventors.co.ke/pesapal/SubmitOrderRequest.php";

  try {
    // Make the POST request with the order details
    const response = await axios.post(requestUrl, orderDetails, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Return the redirect URL or handle the response as needed

    return response.data;

  } catch (error: any) {
    console.error("Error submitting order:", error.message);
    return "error"; // Handle error appropriately
  }
}
