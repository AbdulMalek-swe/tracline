import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Ctest';

const stripePromise =  loadStripe('pk_test_51MvGRULyPagBwcPn8cfry3uU9i9gGASSwjiGcTz10T4zUROjvtfdtuyx4NGQYwWX8gRqbAjFV3E9rW4B44WsP161006YllnuPM');

const PaymentForm = async () => {
   
  const [product, setProduct] = useState([]);
//   useEffect(() => {
//     const url = `https://car-ecomerce-api-m6a7.vercel.app/orders/${id}`
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         // console.log(data);
//         setProduct(data);
//       })
//   }, []);

 
  const price = 90;
  console.log(stripePromise);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
       
        // product={product}
      />
    </Elements>
//   const [error, setError] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const stripe = await stripePromise;

//     try {
//       const response = await fetch('/api/payment/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 1000 }), // Replace with your desired amount
//       });

//       const session = await response.json();

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         setError(result.error.message);
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Pay Now</button>
//       {error && <p>{error}</p>}
//     </form>
  );
};

export default PaymentForm;
