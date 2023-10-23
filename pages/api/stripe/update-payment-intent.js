// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

// import axios from "axios";
const axios = require('axios');

// const calculateOrderAmount = (items) => {
//   let total = 0
//   items.forEach(async item => {
//     const { sku, quantity } = item
//     try {
//       const { data: { data: itemData } } = await axios.post(
//         // `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`,
//         `http://localhost:3000/api/proxy`,
//         {
//           // url: `shops/${process.env.NEXT_PUBLIC_PRINTIFY_SHOP_ID}/products.json?sku=${sku}`,
//           url: `shops/11473637/products/${sku}.json`,
//           method: 'GET'
//         }
//       );
//       console.log(itemData)
//     } catch (error) {
//       console.error(error)
//     }
//   })
// }
// const calculateOrderAmount = async (items) => {
//   let total = 0;
//   for (const item of items) {
//     const { sku, quantity } = item;
//     try {
//       const { data: { data: productData } } = await axios.post(
//         // `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`,
//         `http://localhost:3000/api/proxy`,
//         {
//           // url: `shops/${process.env.NEXT_PUBLIC_PRINTIFY_SHOP_ID}/products.json?sku=${sku}`,
//           url: `shops/11473637/products/${sku}.json`,
//           method: 'GET'
//         }
//       );

//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return total;
// };

// calculateOrderAmount([
//   {
//     sku: '33345060427486528807',
//     quantity: 1
//   }
// ])


export default async function handler(req, res) {
  const { orderData, paymentIntentId, subtotal } = req.body;

  const metadata = {
    orderData: JSON.stringify(orderData),
  };


  try {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata, amount: Math.round(Number(subtotal) * 100),
    });
    console.log(paymentIntent)
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }

};