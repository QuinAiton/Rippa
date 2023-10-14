import React, { useEffect, useState } from 'react'
import {
  useCartCount,
  useCartItems,
  useCartTotals,
  useCheckout,
  useSiteContext,
  useToggleCart,
} from '@lib/context'

import CartItem from '@components/cart-item'
import FocusTrap from 'focus-trap-react'
import cx from 'classnames'
import { m } from 'framer-motion'

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    let count = 0;
    storedProducts.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
  }, []) // remove products from the dependency array

  useEffect(() => {
    calculateSubtotal()
    let count = 0;
    products.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
  }, [products]) // add products to the dependency array

  useEffect(() => {
    calculateSubtotal()
  }, [products])

  typeof window !== 'undefined' && window?.addEventListener('updateCheckoutCount', (event) => {
    let count = 0;
    setProducts(JSON.parse(localStorage.getItem('products')) || [])
    products?.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
    calculateSubtotal()
  });


  const calculateSubtotal = () => {
    let total = 0;
    products?.forEach(product => total += product.price * product.quantity)
    setSubTotal(total / 100)
  }


  const { isCartOpen, isUpdating } = useSiteContext()
  const checkoutURL = useCheckout()
  const toggleCart = useToggleCart()

  const [hasFocus, setHasFocus] = useState(false)
  const [checkoutLink, setCheckoutLink] = useState(checkoutURL)

  const handleKeyDown = (e) => {
    if (e.which === 27) {
      toggleCart(false)
    }
  }

  const goToCheckout = (e) => {
    e.preventDefault()
    toggleCart(false)

    setTimeout(() => {
      window.open(checkoutLink, '_self')
    }, 200)
  }

  // update our checkout URL to use our custom domain name
  useEffect(() => {
    if (checkoutURL) {
      const buildCheckoutLink = shop.storeURL
        ? checkoutURL.replace(
            /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g,
            shop.storeURL
          )
        : checkoutURL
      setCheckoutLink(buildCheckoutLink)
    }
  }, [checkoutURL])

  return (
    <>
      <FocusTrap
        active={isCartOpen && hasFocus}
        focusTrapOptions={{ allowOutsideClick: true }}
      >
        <m.div
          initial="hide"
          animate={isCartOpen ? 'show' : 'hide'}
          variants={{
            show: {
              x: '0%',
            },
            hide: {
              x: '100%',
            },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onKeyDown={(e) => handleKeyDown(e)}
          onAnimationComplete={(v) => setHasFocus(v === 'show')}
          className={cx('cart is-inverted', {
            'is-active': isCartOpen,
            'is-updating': isUpdating,
          })}
        >
          <div className="cart--inner">
            <div className="cart--header">
              <div className="cart--title">
                Your Cart <span className="cart--count">{cartCount}</span>
              </div>
              <button className="cart-toggle" onClick={() => toggleCart(false)}>
                Done
              </button>
            </div>

            <div className="cart--content">
              {products?.length ? (

                <CartItems products={products} />
              ) : (
                <EmptyCart />
              )}
            </div>
            {products?.length > 0 && (
              <div className="cart--footer">
                <div className="cart--subtotal">
                  <span>Subtotal</span>
                  <span>${subTotal}</span>
                </div>
                <a
                  href={checkoutLink}
                  onClick={(e) => goToCheckout(e)}
                  className="btn is-primary is-inverted is-large is-block"
                >
                  {isUpdating ? 'Updating...' : 'Checkout'}
                </a>

              </div>
            )}
          </div>
        </m.div>
      </FocusTrap>

      <div
        className={cx('cart--backdrop', {
          'is-active': isCartOpen,
        })}
        onClick={() => toggleCart(false)}
      />
    </>
  )
}

const CartItems = ({ products }) => {
  return (
    <div className="cart--items">
      {products?.map((product) => {
        return <CartItem key={product.id} product={product} />
      })}
    </div>
  )
}

const EmptyCart = () => (
  <div className="cart--empty">
    <p>Your cart is empty</p>
  </div>
)

export default Cart
