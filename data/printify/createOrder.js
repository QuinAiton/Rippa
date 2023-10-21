import axios from 'axios';

export default async function createOrder(req, res) {
  const { product_id, variant_id, shipping_method_id, shipping_address } = req.body;

  try {
    const response = await axios.post(
      `https://api.printify.com/v1/shops/${process.env.NEXT_PUBLIC_PRINTIFY_SHOP_ID}/orders .json`,
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_TOKEN}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Printify order', error });
  }
}
