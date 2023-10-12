import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, paymentMethodId, customerEmail } = req.body;

    try {
      // Create a new PaymentIntent with the amount, currency, and payment method ID
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        receipt_email: customerEmail,
        confirm: true,
      });

      // Send a success response back to the client
      res.status(200).json({ success: true });
    } catch (error) {
      // Send an error response back to the client
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your payment.' });
    }
  } else {
    // Send a "Method Not Allowed" response if the request method is not POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
