const axios = require('axios');

const getProducts = async () => {
  try {
    const response = await axios.get(
      `https://api.printify.com/v1/shops/11473637/products.json`,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImRhNTgxYzczNjg2MmQyM2U3YWJiNDc0YjI2MTcyNWVlMmRhM2ViMWFjNDRkMWFhNTM5MjdiYmNkYWM1Y2VmM2E5MDU1YWQyZTEwYTlkODllIiwiaWF0IjoxNjk3MzE4OTAxLjc4MjU4OSwibmJmIjoxNjk3MzE4OTAxLjc4MjU5MywiZXhwIjoxNzI4OTQxMzAxLjc3NTEwMiwic3ViIjoiMTUwMTI3NzkiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIl19.AcdgF2OoEB1rnx9FqZf2vxqHvOK2AjY6rWNC6sQ3WU5S9HRsPriHqazuKwYELW8zg0DBASg7GIAMio9dosM`,
        },
      }
    );
    console.log(...response.data.data)
  } catch (error) {
    console.log(error)
  }
}

getProducts();