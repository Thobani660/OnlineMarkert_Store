const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-secret-key-here');
const cors = require('cors');

const app = express();
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title,
              description: description,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

app.listen(4242, () => console.log('Server is running on port 4242'));
