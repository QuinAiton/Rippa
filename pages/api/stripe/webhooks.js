import Stripe from 'stripe';
import axios from 'axios';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY, {
  apiVersion: "2023-08-16",
});


export default async function handler(req, res) {
    let event = req.body

    // try {
    //   const sig = req.headers['stripe-signature'];
    //   const rawBody = JSON.stringify(req.body);
    //   event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        const { orderData } = paymentIntentSucceeded.metadata
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`,
            {
              url: `shops/${process.env.NEXT_PUBLIC_PRINTIFY_SHOP_ID}/orders.json`,
              orderData
            }
           );
        } catch (error) {
          console.log(error.response.data)
          throw new Error('unable to create order', error.response.data)
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      case 'payment_intent.payment_failed':
        const paymentIntentPaymentFailed = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 res to acknowledge receipt of the event
  res.send();
}
