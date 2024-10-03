// const express = require('express');
// const router = express.Router();
// const Stripe = require('stripe');
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use Stripe with your secret key

// // POST route to create a Stripe subscription payment session
// router.post('/create-payment', async (req, res) => {
//   const { paymentPlan } = req.body; // Get the payment plan from request body

//   // Define price IDs for different payment plans
//   const priceIds = {
//     '1-month': 'price_1MonthId',
//     '6-month': 'price_6MonthId',
//     '1-year': 'price_1YearId',
//   };

//   // Get the appropriate price ID based on the selected plan
//   const priceId = priceIds[paymentPlan];

//   // If no valid priceId is found, return an error response
//   if (!priceId) {
//     return res.status(400).json({ error: 'Invalid payment plan selected.' });
//   }

//   try {
//     // Create a checkout session for a subscription
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'subscription', // Set mode to subscription
//       line_items: [{ price: priceId, quantity: 1 }], // Use the selected price ID
//       success_url: `${process.env.CLIENT_URL}/success`, // URL on success
//       cancel_url: `${process.env.CLIENT_URL}/cancel`, // URL on cancellation
//     });

//     // Send back the session ID to the client
//     res.json({ id: session.id });
//   } catch (error) {
//     // Handle any Stripe or server errors
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
