const sanityClient = require('@sanity/client');

// Create a new Sanity client
const client = sanityClient({
  projectId: 'j3iowggy',
  dataset: 'production',
  useCdn: false
  // Add any other configuration options here
});

const query = `*[_type == "product" && _id == "product-6589381804210"] {
  _id,
  title,
  description,
  price,
  inStock,
  options
}`;
async function getProducts() {
  const products = await client.fetch(query);
  return products;
}

// Example usage
getProducts().then((products) => {
  console.log(products);
});


const productId = 'product-6589381804210';

async function removeOptions() {
  try {
    const product = await client.getDocument(productId);

    // Remove the options field from the product object
    delete product.options;

    // Update the product document in the Sanity dataset
    await client
      .patch(productId)
      .set(product)
      .commit();

    console.log('Options removed successfully');
  } catch (error) {
    console.error('Error removing options:', error);
  }
}

// Example usage
removeOptions();