"use server";
import { handleError } from '../utils';


import { connectToDatabase } from '../database';
import { CreateTransactionParams, TransactionStatusParams } from '@/types';
import axios from 'axios';
import { NextResponse } from 'next/server';

import User from '../database/models/user.model';
export async function transactionStatus(orderId:string) {
 
  const apiUrl = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken";
  const consumerKey = "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW";
  const consumerSecret = "osGQ364R49cXKeOYSpaOnT++rHs=";
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  
  const data = {
    "consumer_key": consumerKey,
    "consumer_secret": consumerSecret
  };
  
  try {
    const response = await axios.post(apiUrl, data, { headers });
  
    const responseData = response.data;
    
    if (responseData && responseData.token) {
      const token = responseData.token;
    
      // Construct the request URL for the second API call
      const regueststatusurl = `https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${orderId}`;
      
      // Set headers for the second request
      const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    
      try {
        const response = await axios.get(regueststatusurl, { headers: requestHeaders });
  
       const responseData = response.data;
       console.log(responseData)
        return responseData;
      
     
      } catch (error) {
        console.error('Error:', error);
        return "error";
        // Handle error appropriately
      }
    } else {
     // throw new Error('Unable to extract token from response');
     return "error";
    }
  } catch (error) {
    console.error('Error:', error);
    return "error";
    // Handle error appropriately
  }
  
  //redirect(session.url!)
}
