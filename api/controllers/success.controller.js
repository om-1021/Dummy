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
//   const { items } = req.body; // Items you want to include in the checkout
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 1,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://main--visionary-pothos-90879f.netlify.app/",
    });
    console.log(res);
    res.json({ sessionId: session.id });
    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
