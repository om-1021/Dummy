import express, { json } from "express";
// import router from './user.route';
// const stripe = require('stripe')(process.env.STRIPE);
import Stripe from "stripe";
// import {stripe} from {stripe}
// const app = express();
const router = express.Router();

// app.use(json());
const stripe = new Stripe(process.env.STRIPE);

export const successController = async (req, res, next) => {
  const { items } = req.body; // Items you want to include in the checkout
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      success_url: "https://yourwebsite.com/success",
      cancel_url: "https://yourwebsite.com/cancel",
    });
    console.log(res);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
