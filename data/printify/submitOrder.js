import axios from 'axios';

export default async function submitOrder(req, res) {
  const { method, body } = req;
  const { order_id } = body;
  if (method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post(`https://api.printify.com/v1/shops/{shop_id}/orders/${order_id}/send_to_production`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      },
    });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to send order to production' });
  }
}
