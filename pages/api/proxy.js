import axios from 'axios';
export default async (req, res) => {
  const { url, orderData } = req.body;
  try {
    const response = await axios.post(
      `https://api.printify.com/v1/${url}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_TOKEN}`,
        },
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.log({ error })
    res.status(error.response.status).json(error.response.data);
  }
};
