const express = require('express');
const stripe = require('stripe')('sk_test_51QB9mNFVlr9lrfFnOOKcxRiKEe24MnHLraTj9Ze4XIVqZzyeDZCZdyhkwyzlUesQkfqsQnZX12QCkeWNthJLUKjH00QYpE9DfL'); // Replace with your Stripe secret key
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// CORS Configuration
const allowedOrigins = ['http://localhost:5173']; // List allowed origins (frontend URLs)
app.use(cors({
  origin: allowedOrigins, // Allows requests from your frontend
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed request headers
}));

// Middleware
app.use(express.json());

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { product } = req.body; // Get product info from the request body

    // Create a checkout session with the Stripe API
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description,
            },
            unit_amount: product.price * 100, // Stripe expects price in cents
          },
          quantity: 1, // Number of items in the cart (change this if needed)
        },
      ],
      mode: 'payment', // Indicates that the payment is for a one-time transaction
      success_url: `${process.env.CLIENT_URL}/success`, // Redirect after successful payment
      cancel_url: `${process.env.CLIENT_URL}/cancel`, // Redirect if payment is canceled
    });

    // Respond with the session ID so the frontend can use it to complete the payment
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error during checkout session creation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(4242, () => {
  console.log('Server running on http://localhost:4242');
});
