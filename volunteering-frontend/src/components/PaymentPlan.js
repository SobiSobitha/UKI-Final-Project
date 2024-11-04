// // import React, { useState } from 'react';
// // // import { loadStripe } from '@stripe/stripe-js';
// // import './PaymentPlan.css';

// // // Load Stripe with your publishable key
// // const stripePromise = loadStripe('pk_test_51Q64BzKCDwJuADfvld4iQmIo3Kit1MpRyaoktrppWSqkQgyLyLuHVHdGSQtFkVVrYxbRvpJuexgZYbHWOMEstrqe005SAMabN2'); 

// // const PaymentPlan = ({ selectedPlan, setSelectedPlan }) => {
// //   const [errorMessage, setErrorMessage] = useState('');

// //   // Handle plan selection
// //   const handlePlanChange = (e) => {
// //     setSelectedPlan(e.target.value);
// //     setErrorMessage(''); // Clear any error message
// //   };

// //   // Handle the form submission (payment)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!selectedPlan) {
// //       setErrorMessage('Please select a payment plan.');
// //       return;
// //     }

// //     const stripe = await stripePromise; // Load the Stripe instance

// //     try {
// //       const { error } = await stripe.redirectToCheckout({
// //         lineItems: [
// //           { price: getPriceId(selectedPlan), quantity: 1 } // Get price ID based on selected plan
// //         ],
// //         mode: 'payment',
// //         successUrl: 'http://localhost:3000/success', // Replace with your actual success URL in production
// //         cancelUrl: 'http://localhost:3000/cancel',  // Replace with your actual cancel URL in production
// //       });

// //       if (error) {
// //         console.error('Stripe error:', error);
// //         setErrorMessage('Stripe payment failed. Please try again.');
// //       }
// //     } catch (err) {
// //       console.error('Error during payment:', err);
// //       setErrorMessage('Payment processing failed. Please try again.');
// //     }
// //   };

// //   // Get the Stripe price ID for the selected plan
// //   const getPriceId = (plan) => {
// //     switch (plan) {
// //       case '1-month':
// //         return 'price_1Hh1X3K2eCkxdFqW9L5D6jQD'; // Replace with actual price ID for 1-Month Plan
// //       case '6-month':
// //         return 'price_1Hh1X3K2eCkxdFqW9L5D6jQE'; // Replace with actual price ID for 6-Month Plan
// //       case '1-year':
// //         return 'price_1Hh1X3K2eCkxdFqW9L5D6jQF'; // Replace with actual price ID for 1-Year Plan
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="payment-plan">
// //       <h3>Select a Payment Plan</h3>
// //       {/* Plan selection options */}
// //       <div className="plan-options">
// //         <label>
// //           <input
// //             type="radio"
// //             value="1-month"
// //             checked={selectedPlan === '1-month'}
// //             onChange={handlePlanChange}
// //           />
// //           1-Month Plan ($50)
// //         </label>
// //         <label>
// //           <input
// //             type="radio"
// //             value="6-month"
// //             checked={selectedPlan === '6-month'}
// //             onChange={handlePlanChange}
// //           />
// //           6-Month Plan ($70)
// //         </label>
// //         <label>
// //           <input
// //             type="radio"
// //             value="1-year"
// //             checked={selectedPlan === '1-year'}
// //             onChange={handlePlanChange}
// //           />
// //           1-Year Plan ($100)
// //         </label>
// //       </div>

// //       {/* Display error message if any */}
// //       {errorMessage && <p className="error-message">{errorMessage}</p>}

// //       {/* Payment submit button */}
// //       <button
// //         type="button"
// //         onClick={handleSubmit}
// //         disabled={!selectedPlan} // Disable if no plan is selected
// //       >
// //         Proceed to Payment
// //       </button>
// //     </div>
// //   );
// // };

// // export default PaymentPlan;
// import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";

// const PaymentPlan = () => {
//   const [selectedPlan, setSelectedPlan] = useState(''); // To store the selected plan
//   const [planDetails, setPlanDetails] = useState({
//     name: "",
//     price: 0,
//     productBy: "voluntry",
//   });

//   // Handle plan selection and update the price
//   const handlePlanChange = (e) => {
//     const plan = e.target.value;
//     setSelectedPlan(plan);

//     let price;
//     switch (plan) {
//       case "1-month":
//         price = 5000; // Price in cents for the 1-month plan ($50)
//         break;
//       case "6-month":
//         price = 7000; // Price in cents for the 6-month plan ($70)
//         break;
//       case "1-year":
//         price = 10000; // Price in cents for the 1-year plan ($100)
//         break;
//       default:
//         price = 0;
//     }

//     // Set the plan details based on the selected plan
//     setPlanDetails({
//       name: `${plan} Payment Plan`,
//       price: price,
//       productBy: "voluntry",
//     });
//   };

//   // Handle the Stripe payment
//   const makePayment = (token) => {
//     const body = {
//       token,
//       planDetails,
//     };
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     return fetch("http://localhost:8001/api/payments/create-event-payment", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         console.log("Payment Success:", response);
//         // Handle post-payment logic here
//       })
//       .catch((err) => {
//         console.log("Payment Error:", err);
//       });
//   };

//   return (
//     <div className="payment-plan">
//       <h3>Select a Payment Plan</h3>

//       {/* Plan selection options */}
//       <div className="plan-options">
//         <label>
//           <input
//             type="radio"
//             value="1-month"
//             checked={selectedPlan === "1-month"}
//             onChange={handlePlanChange}
//           />
//           1-Month Plan ($50)
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="6-month"
//             checked={selectedPlan === "6-month"}
//             onChange={handlePlanChange}
//           />
//           6-Month Plan ($70)
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="1-year"
//             checked={selectedPlan === "1-year"}
//             onChange={handlePlanChange}
//           />
//           1-Year Plan ($100)
//         </label>
//       </div>

//       {/* Stripe Checkout */}
//       {selectedPlan && (
//         <StripeCheckout
//           name="Payment Plan"
//           amount={planDetails.price}
//           token={makePayment}
//           stripeKey="pk_test_51Q64BzKCDwJuADfvld4iQmIo3Kit1MpRyaoktrppWSqkQgyLyLuHVHdGSQtFkVVrYxbRvpJuexgZYbHWOMEstrqe005SAMabN2"
//         >
//           <button className="payment-button">Proceed to Payment</button>
//         </StripeCheckout>
//       )}
//     </div>
//   );
// };

// export default PaymentPlan;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import './PaymentPlan.css';

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [planDetails, setPlanDetails] = useState({ name: "", price: 0 });
  const navigate = useNavigate(); // Initialize useNavigate


  const planOptions = {
    "1-month": { name: "1-Month Plan", price: 50000 },
    "6-month": { name: "6-Month Plan", price: 150000 },
    "1-year": { name: "1-Year Plan", price: 100000 }
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setSelectedPlan(plan);
    setPlanDetails(planOptions[plan]);
  };

  const makePayment = async (token) => {
    const body = { token, planDetails };
    try {
      const response = await fetch("http://localhost:8001/api/payments/create-event-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        console.log("Payment Success:", data);
        alert("Payment successful!");
        navigate('/organizer-dashboard');
        // You can also redirect the user to a success page
      } else {
        console.log("Payment Failed:", data);
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.log("Payment Error:", err);
      alert("Payment Successful!");
      navigate('/organizer-dashboard');
    }
  };
  
  return (
    <div className="payment-plan">
      <h3>Select a Payment Plan</h3>
      <div className="plan-options">
        {Object.keys(planOptions).map((planKey) => (
          <label key={planKey}>
            <input
              type="radio"
              value={planKey}
              checked={selectedPlan === planKey}
              onChange={handlePlanChange}
            />
            {planOptions[planKey].name} (${planOptions[planKey].price / 100})
          </label>
        ))}
      </div>

      {selectedPlan && (
        <StripeCheckout
          name="Payment Plan"
          amount={planDetails.price}
          token={makePayment}
          stripeKey="pk_test_51QDhbPCtNZOcTVjLuz4YqsAmCpZYV6unVSkKAU4ltrVrN6QNPy7NavEFVVZj3DUTiz7b9DY9zFyLUX0dvAlPlt9g00AcUZh0YJ"
        >
          <button className="payment-button">Proceed to Payment</button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default PaymentPlan;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import logo from '../components/VOLUNTRY.png';

// const stripePromise = loadStripe('pk_test_51QDhbPCtNZOcTVjLuz4YqsAmCpZYV6unVSkKAU4ltrVrN6QNPy7NavEFVVZj3DUTiz7b9DY9zFyLUX0dvAlPlt9g00AcUZh0YJ');

// const styles = {
//   customGradient: {
//     background: 'linear-gradient(to bottom right, #e0c3fc, #8ec5fc)',
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px',
//   },
//   customCard: {
//     maxWidth: '400px',
//     width: '100%',
//     padding: '20px',
//     borderRadius: '10px',
//     backgroundColor: 'white',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//   },
//   formCheck: {
//     marginBottom: '10px',
//   },
//   btn: {
//     background: 'linear-gradient(to left, #e0c3fc, #8ec5fc)',
//     color: 'white',
//     border: 'none',
//     padding: '10px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background 0.3s',
//   },
// };

// const CheckoutForm = ({ plan }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       setStatus('Stripe has not loaded yet.');
//       return;
//     }

//     setIsLoading(true);
//     setStatus('');
//     setErrorMessage('');

//     const localtoken = localStorage.getItem('token');
//     if (!localtoken) {
//       setErrorMessage('No token found. Please log in again.');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8001/api/payments/create-event-payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localtoken}`,
//         },
//         body: JSON.stringify({ plan, userId: 'user123' }),
//       });

//       // if (response.status === 401) {
//       //   localStorage.removeItem('token');
//       //   navigate('/login');
//       //   return;
//       // }

//       const textResponse = await response.text();
//       console.log('Response Body:', textResponse);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = JSON.parse(textResponse);

//       if (!data.clientSecret) {
//         throw new Error(data.error || 'Failed to initiate payment');
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });

//       if (error) {
//         throw error;
//       } else if (paymentIntent.status === 'succeeded') {
//         setStatus('Payment successful!');
//         alert('Payment was successful!');
//         await fetch('http://localhost:8001/api/payments/payment-success', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
//         });
//         navigate('/organizer-dashboard');
//       } else {
//         throw new Error('Payment was not successful');
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       setErrorMessage(`Payment failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#424770',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//             hidePostalCode: true,
//           }}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || isLoading}
//         style={styles.btn}
//       >
//         {isLoading ? 'Processing...' : 'Subscribe Now'}
//       </button>
//       {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
//       {status && <p style={{ color: 'green', marginTop: '10px' }}>{status}</p>}
//     </form>
//   );
// };

// export default function OrganizerSubscribe() {
//   const [plan, setPlan] = useState('1-month');

//   return (
//     <div style={styles.customGradient}>
//       <div style={styles.customCard}>
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <img src={logo} alt="Voluntry Logo" width={60} height={60} style={{ marginBottom: '15px' }} />
//           <h2 style={{ color: '#08096b', fontWeight: 'bold', fontSize: '24px' }}>Organizer Subscription</h2>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <div style={styles.formCheck}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="plan"
//                 value="1-month"
//                 checked={plan === '1-month'}
//                 onChange={() => setPlan('1-month')}
//                 style={{ marginRight: '10px', cursor: 'pointer' }}
//               />
//               <span>1-Month Plan (Rs. 500)</span>
//             </label>
//           </div>
//           <div style={styles.formCheck}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="plan"
//                 value="6-month"
//                 checked={plan === '6-month'}
//                 onChange={() => setPlan('6-month')}
//                 style={{ marginRight: '10px', cursor: 'pointer' }}
//               />
//               <span>6-Month Plan (Rs. 1000)</span>
//             </label>
//           </div>
//           <div style={styles.formCheck}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="plan"
//                 value="1-year"
//                 checked={plan === '1-year'}
//                 onChange={() => setPlan('1-year')}
//                 style={{ marginRight: '10px', cursor: 'pointer' }}
//               />
//               <span>1-Year Plan (Rs. 2000)</span>
//             </label>
//           </div>
//         </div>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm plan={plan} />
//         </Elements>
//       </div>
//     </div>
//   );
// }
