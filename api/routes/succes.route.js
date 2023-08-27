import express, { json } from 'express';
const stripe = require('stripe')('YOUR_SECRET_KEY');
const app = express();

app.use(json());

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body; // Items you want to include in the checkout
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel',
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});