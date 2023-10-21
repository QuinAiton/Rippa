// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);



export default async function handler(req, res) {
  const { orderData, paymentIntentId } = req.body;

  const metadata = {
    orderData: JSON.stringify(orderData),
  };

  try {
    await stripe.paymentIntents.update(paymentIntentId, { metadata });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }

};