import axios from 'axios';

export default async function handler(req, res) {
  const { product_id, variant_id, shipping_method_id, shipping_address } = req.body;

  try {
    const response = await axios.post(
      'https://api.printify.com/v1/shops/{shop_id}/orders',
      {
        order: {
          line_items: [
            {
              product_id,
              variant_id,
              quantity: 1,
            },
          ],
          shipping_method_id,
          shipping_address,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Printify order' });
  }
}
