import axios from 'axios';

export default async function cancelOrder(req, res) {
  const { order_id } = req.body;

  try {
    const response = await axios.post(`https://api.printify.com/v1/shops/{shop_id}/orders/${order_id}/cancel`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      },
    });

    if (response.status === 200) {
      return { success: true, data: null };
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cancel order' });
  }
}
