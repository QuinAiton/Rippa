import axios from 'axios';

import axios from 'axios';

export default async function handler(req, res) {
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
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Unable to send order to production' });
  }
}
