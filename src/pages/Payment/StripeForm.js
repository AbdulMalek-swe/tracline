 
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
 
import axios from "../../service/apiService";
 
import React, { useEffect, useState } from "react";
import CheckoutForm from "./Checkout";
 
export default   function Stripe() {
  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    axios
      .post(`/api/payment-method/get-payment-intent/`, { payment_type: "subscription" })
      .then((response) => {
        console.log(response,'please give me the error');
        //  console.log("payment intent data",response?.data);
        setPaymentIntent(response?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const stripePromise = loadStripe(paymentIntent?.publish_key);

  const appearance = {
    theme: "light",
    labels: "floating",
  };

  const options = {
    clientSecret: paymentIntent?.client_secret,
    appearance,
  };
  
  let d = Promise.reject(stripePromise)
  // console.log(d);
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={paymentIntent?.amount} />
    </Elements>
  );
}