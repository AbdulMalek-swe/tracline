import Button from "@mui/material/Button";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
 
import axios from "../../service/apiService";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./Checkout";
 
export default function Stripe() {
  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    axios
      .post(`/api/create-payment-intend`, { payment_type: "subscription" })
      .then((response) => {
        //  console.log("payment intent data",response?.data);
        setPaymentIntent(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const stripePromise = loadStripe(paymentIntent?.publishable_key);

  const appearance = {
    theme: "light",
    labels: "floating",
  };

  const options = {
    clientSecret: paymentIntent?.client_secret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={paymentIntent?.amount} />
    </Elements>
  );
}