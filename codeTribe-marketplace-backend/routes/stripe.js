// backend/routes/stripe.js
const express = require('express');
const stripe = require('stripe')('sk_test_51QB9mNFVlr9lrfFnOOKcxRiKEe24MnHLraTj9Ze4XIVqZzyeDZCZdyhkwyzlUesQkfqsQnZX12QCkeWNthJLUKjH00QYpE9DfL'); // Replace with your Stripe secret key
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  try {
    // Create the Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // You can change the currency
            product_data: {
              name: 'Product Name', // Name of the product you're selling
            },
            unit_amount: 1000, // Amount in cents (e.g., 1000 = $10)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success`, // Redirect on successful payment
      cancel_url: `${req.headers.origin}/cancel`, // Redirect on canceled payment
    });

    // Send the session ID to the frontend
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).send("Error creating Checkout session: " + err.message);
  }
});

module.exports = router;
