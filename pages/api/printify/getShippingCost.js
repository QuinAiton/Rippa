import axios from 'axios';

export default async function handler(req, res) {
  const { country_code, region_code, items } = req.body;

  try {
    const response = await axios.post(
      'https://api.printify.com/v1/shops/{shop_id}/orders/shipping',
      {
        destination: {
          country_code,
          region_code,
        },
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error calculating shipping costs' });
  }
}
