import axios from 'axios';

export default async function getShippingCosts(shippingData) {

  try {
    const response = await axios.post(
      `https://api.printify.com/v1/shops/${process.env.NEXT_PUBLIC_PRINTIFY_SHOP_ID}/orders/shipping`,
      shippingData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
      }
    );
    console.log(response)
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error(error);
    return ({ error, message: 'Error calculating shipping costs' });
  }
}
