import axios from 'axios';
export default async (req, res) => {
  const { url, orderData, method } = req.body;
  let response;
  try {
    if (method === 'GET') {
      response = await axios.get(`https://api.printify.com/v1/${url}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_TOKEN}`,
        },
      });
      res.status(response.status).json(response.data);
    } else {
      response = await axios.post(
      `https://api.printify.com/v1/${url}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINTIFY_TOKEN}`,
        },
      }
    );
    res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.log(error.response)
    res.status(error.response.status).json(error.response.data);
  }
};
