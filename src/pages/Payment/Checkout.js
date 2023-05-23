import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../service/apiService";
import store from "../../redux/store/store";
// import { addUserActions } from "../../redux/features/addUser";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { addUserActions } from "../../redux/features/addUser/addUserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   const user = useSelector(state=>state?.reducer?.User)
   console.log(user);


  useEffect(() => {
     const payment_id = sessionStorage.getItem("paymentIntentId");
     if(payment_id!==null){
      submitForm(payment_id);
      sessionStorage.removeItem("paymentIntentId");
     }
     
   // console.log("value",payment_id)
   
  },[]);


  //make payment through stripe
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const loading = toast.loading(
      "Please wait a moment while we are processing your payment."
    );

    try {
      const data = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.href}/userprofile/subscriptions`,
        },
        redirect: "if_required",
      });
      toast.dismiss(loading);
      const { error } = data;
    
      if (error) {
        setMessage(error.message);
        toast.error(message);
        setIsLoading(false);
      } else {
        setMessage("Payment successfull !");
        toast.success(message);
        await submitForm(data?.paymentIntent?.id);
      }
    } catch (error) {
      setMessage("Error processing payment.");
      toast.error(message);
    }
  };


   useEffect(()=>{
     if(user?.is_subscribed){
       navigate("/")
     }
   },[])

  //save data to backend
  const navigate = useNavigate()
  async function submitForm(paymentIntentId) {
    console.log(paymentIntentId);
    sessionStorage.setItem("paymentIntentId", paymentIntentId);
    try {
      const res = await axios.post(`/api/payment-method/verify-payment/`, {
        payment_id: paymentIntentId,
      });
      const { status, data } = res;
     console.log("subscription submit response ", data);
      setIsLoading(false);
      sessionStorage.removeItem("paymentIntentId");
      if (status === 201) {
        toast.success(data?.message);
        store.dispatch(addUserActions.addUser(data?.data));
        // setIsLoading(true);
        console.log("");
        navigate("/user/myprofile")
        
       
        console.log(" is bakcsdfds");
      }
    } catch (error) {
      console.log(error);
      const { status, data } = error?.response;

      if (status === 422) {
     //   console.log("422 test");
        Object.entries(data?.errors)?.map((error) => toast.error(error[1][0]));
      } else {
        toast.error(data?.error);
      }
     // console.log("error from submit", error);
    }
  }

  return (
    <>
    <Backdrop
    sx={{ color: '#D4A934', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
    
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    <div className=" lg:p-20 md:p-10 p-5  mt-10 bg-white lg:w-2/3 xl:w-2/5 md:w-4/5 w-full border rounded-lg overflow-hidden mx-auto py-10">
      <h4 className="text-primary2 font-bold font-display text-center md:text-2xl text-xl lg:text-3xl  tracking-wide  pb-5">
        Subscribe  Traclin 
      </h4>
      <form onSubmit={handleSubmit} className="mt-2  ">
        <PaymentElement />

        <div className="mt-5 ">
          <Button
             name="Pay now"
            disabled={!stripe || isLoading}
            variant="contained"
            type="submit"
            className="lg:text-xl md:textlg text-base capitalize font-display font-bold w-full  py-2 bg-primary text-white hover:text-white hover:bg-primary2"
          >
            Pay Now £{amount}/Year
          </Button>
        </div>
      </form>

      <div className="mt-2 flex justify-end items-center">
        <small className="mr-2 text-caption font-weight-bold">powered by</small>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="35px"
          width="35px"
          viewBox="0 0 576 512"
        >
          <path
            fill="#1A2652"
            d="M492.4 220.8c-8.9 0-18.7 6.7-18.7 22.7h36.7c0-16-9.3-22.7-18-22.7zM375 223.4c-8.2 0-13.3 2.9-17 7l.2 52.8c3.5 3.7 8.5 6.7 16.8 6.7 13.1 0 21.9-14.3 21.9-33.4 0-18.6-9-33.2-21.9-33.1zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM122.2 281.1c0 25.6-20.3 40.1-49.9 40.3-12.2 0-25.6-2.4-38.8-8.1v-33.9c12 6.4 27.1 11.3 38.9 11.3 7.9 0 13.6-2.1 13.6-8.7 0-17-54-10.6-54-49.9 0-25.2 19.2-40.2 48-40.2 11.8 0 23.5 1.8 35.3 6.5v33.4c-10.8-5.8-24.5-9.1-35.3-9.1-7.5 0-12.1 2.2-12.1 7.7 0 16 54.3 8.4 54.3 50.7zm68.8-56.6h-27V275c0 20.9 22.5 14.4 27 12.6v28.9c-4.7 2.6-13.3 4.7-24.9 4.7-21.1 0-36.9-15.5-36.9-36.5l.2-113.9 34.7-7.4v30.8H191zm74 2.4c-4.5-1.5-18.7-3.6-27.1 7.4v84.4h-35.5V194.2h30.7l2.2 10.5c8.3-15.3 24.9-12.2 29.6-10.5h.1zm44.1 91.8h-35.7V194.2h35.7zm0-142.9l-35.7 7.6v-28.9l35.7-7.6zm74.1 145.5c-12.4 0-20-5.3-25.1-9l-.1 40.2-35.5 7.5V194.2h31.3l1.8 8.8c4.9-4.5 13.9-11.1 27.8-11.1 24.9 0 48.4 22.5 48.4 63.8 0 45.1-23.2 65.5-48.6 65.6zm160.4-51.5h-69.5c1.6 16.6 13.8 21.5 27.6 21.5 14.1 0 25.2-3 34.9-7.9V312c-9.7 5.3-22.4 9.2-39.4 9.2-34.6 0-58.8-21.7-58.8-64.5 0-36.2 20.5-64.9 54.3-64.9 33.7 0 51.3 28.7 51.3 65.1 0 3.5-.3 10.9-.4 12.9z"
          />
        </svg>
      </div>
    </div>
    </>
  );
};

export default CheckoutForm;