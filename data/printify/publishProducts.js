const axios = require('axios');
const printifyProducts = require('./products.json');

const publishProducts = async () => {
  for (const product of printifyProducts) {
    try {
      console.log(`Publishing product ${product.id}`)
      const response = await axios.post(
        `https://api.printify.com/v1/shops/11473637/products/${product.id}/publishing_succeeded.json`,
        {
          "external": {
            "id": product.id,
            "handle": product.id
          }
        },
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImRhNTgxYzczNjg2MmQyM2U3YWJiNDc0YjI2MTcyNWVlMmRhM2ViMWFjNDRkMWFhNTM5MjdiYmNkYWM1Y2VmM2E5MDU1YWQyZTEwYTlkODllIiwiaWF0IjoxNjk3MzE4OTAxLjc4MjU4OSwibmJmIjoxNjk3MzE4OTAxLjc4MjU5MywiZXhwIjoxNzI4OTQxMzAxLjc3NTEwMiwic3ViIjoiMTUwMTI3NzkiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AcdgF2OoEB1rnx9FqZf2vxqHvOK2AjY6rWNC6sQ3WU5S9HRsPriHqazuKwYELW8zg0DBASg7GIAMio9dosM`,
          },
        }
      );

      console.log(`Product ${product.title} published successfully`);
    } catch (error) {
      console.log(error.response.data.errors)
      console.error(`Error publishing product ${product.title}: ${error.message}`);
    }
  }
};

publishProducts();