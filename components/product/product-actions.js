import {
  ProductAdd,
  ProductCounter,
  ProductWaitlist,
} from '@components/product'
import React, { useState } from 'react'

const ProductActions = ({ activeVariant, product, klaviyoAccountID }) => {
  // set default quantity
  const [quantity, setQuantity] = useState(1)
  return (
    <div className="product--actions">
      {activeVariant?.inStock ? (
        <>
          <ProductCounter
            id={activeVariant.id}
            max={10}
            onUpdate={setQuantity}
          />
          <ProductAdd
            activeVariant={activeVariant}
            product={product}
            quantity={quantity}
            className="btn is-primary is-large is-block"
          >
            Add To Cart
          </ProductAdd>
        </>
      ) : (
        <>
          {klaviyoAccountID ? (
            <ProductWaitlist
              variant={activeVariant.id}
              klaviyo={klaviyoAccountID}
            />
          ) : (
            <div className="btn is-large is-disabled is-block">
              Out of Stock
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductActions
