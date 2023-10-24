import { ProductCounter, ProductPrice } from '@components/product'
import { useRemoveItem, useToggleCart, useUpdateItem } from '@lib/context'

import Link from 'next/link'
import Photo from '@components/photo'
import React from 'react'

function CartItem({ product }) {

  const toggleCart = useToggleCart()

  const changeQuantity = async (quantity) => {
    const storedProducts = await JSON.parse(localStorage.getItem('products')) || [];
    let oldQuantity = 0;
    storedProducts.forEach((storedProduct, index) => {
      if (storedProduct.id === product.id) {
        oldQuantity = storedProduct.quantity;
        storedProducts[index].quantity = quantity;
      }
    });
    localStorage.setItem('products', JSON.stringify(storedProducts));
    const quantityDiff = quantity - oldQuantity;
    const updateCheckout = new CustomEvent('updateCheckoutCount', { detail: { quantity: quantityDiff } });
    window.dispatchEvent(updateCheckout);
  }

  const removeItem = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const { quantity } = storedProducts.find((product) => product.variant.id === id);
    const updatedProducts = storedProducts.filter((product) => product.variant.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    const updateCheckout = new CustomEvent('updateCheckoutCount', { detail: { quantity: -quantity } });
    window.dispatchEvent(updateCheckout);
  }

  const getListingImageByVariant = () => {
    const color = product?.variant?.options[0]?.value
    const listingPhotos = product.photos.listing?.find((set) => {
      if (set.forOption.includes(color.trim())) {
        return set
      }
    })
    return listingPhotos
  }
  const photos = getListingImageByVariant()

  return (
    <div className="cart-item">
      {photos && (
        <Photo
          photo={photos?.default}
          srcSizes={[400]}
          sizes="(min-width: 768px) 400px, 35vw'"
          className="cart-item--photo"
        />
      )}
      <div className="cart-item--details">
        <div className="cart-item--header">
          <div className="cart-item--title">
            <div className="cart-item--variant">{product.variant.title}</div>
            <h2 className="cart-item--name">
              <Link
                href={`/products/${product.slug}?variant=${product.id}`}
                scroll={false}
              >
                <a
                  onClick={() => toggleCart(false)}
                  className="cart-item--link"
                >
                  {product.title}
                </a>
              </Link>
            </h2>
          </div>
          <ProductPrice price={product.price} />
        </div>
        <div className="cart-item--tools">
          <div className="cart-item--quantity">
            <ProductCounter
              key={product.id}
              id={product.id}
              defaultCount={product.quantity}
              onUpdate={changeQuantity}
              className="is-small"
            />
          </div>
          <button
            onClick={() => removeItem(product.variant.id)}
            className="btn is-text is-black"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
