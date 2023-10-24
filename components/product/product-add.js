import React, { useState } from "react"

import cx from "classnames"

const ProductAdd = ({ activeVariant, product, quantity = 1, className, children }) => {
  const [isAdding, setIsAdding] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [products, setProducts] = useState([]);

  function findVariant(product, activeVariant) {
    for (let i = 0; i < product.variants.length; i++) {
      if (product.variants[i].id === activeVariant.id) {
        return product.variants[i]
      }
    }
    return null
  }

  function addToLocalStorage(activeVariant, quantity) {
    setIsAdding(true)
    const variant = findVariant(product, activeVariant)
    const productWithVariant = {
      ...product,
      variant,
      quantity: quantity
    }
    delete productWithVariant.variants
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = updateQuantityIfExists(productWithVariant, existingProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    const updateCheckout = new CustomEvent('updateCheckoutCount', { detail: { quantity } });
    window.dispatchEvent(updateCheckout);
    setIsAdding(false)  
  }

  function updateQuantityIfExists(newProduct, existingProducts) {
    let productExists = false;
    const updatedProducts = existingProducts.map(product => {
      if (product.variant.id === newProduct.variant.id) {
        product.quantity += newProduct.quantity;
        productExists = true;
      }
      return product;
    });
    if (!productExists) {
      updatedProducts.push(newProduct);
    }
    return updatedProducts;
  }






  return (
    <>
        <button
          className={cx(className, { 'is-disabled': isAdding })}
        onClick={() => addToLocalStorage(activeVariant, quantity)}
        >
          {isAdding ? 'Adding...' : <>{children ? children : 'Add to Cart'}</>}
      </button>
    </>
  )
}

export default ProductAdd