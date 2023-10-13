import React from "react"
import cx from "classnames"
const ProductAdd = ({ activeVariant, product, quantity = 1, className, children }) => {
  const [isAdding, setIsAdding] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)


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
      variant
    }
    delete productWithVariant.variants
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts.push(productWithVariant);
    localStorage.setItem('products', JSON.stringify(existingProducts));
    const event = new CustomEvent('updateCheckoutCount', { detail: { quantity } });
    window.dispatchEvent(event);
    setIsAdding(false)
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