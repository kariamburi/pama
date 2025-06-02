"use server"
import axios from "axios";

//export const checkTransactionStatus = async () => {
    export async function checkTransactionStatus(orderTrackingId:any, token:any) {
    try {
        const regueststatusurl = `https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`;
      const payUrl='https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus?trackingId=${trackingId}';
      const response = await axios.get(
        regueststatusurl,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // Use the OAuth token
          },
        }
      );
  
      return response.data; // Contains transaction status
    } catch (error:any) {
      console.error('Error fetching transaction status:', error.response?.data || error.message);
      throw new Error('Failed to fetch transaction status');
    }
  };
  