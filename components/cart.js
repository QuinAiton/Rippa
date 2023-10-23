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
import CheckoutForm from "@components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import FocusTrap from 'focus-trap-react'
import cx from 'classnames'
import { loadStripe } from "@stripe/stripe-js";
import { m } from 'framer-motion'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);
  const { isCartOpen, isUpdating } = useSiteContext()
  const toggleCart = useToggleCart()
  const [hasFocus, setHasFocus] = useState(false)
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [shipping, setShipping] = React.useState(0);
  const [subtotal, setSubtotal] = React.useState(shipping + total);
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    let count = 0;
    storedProducts.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
  }, [])

  useEffect(() => {
    setSubtotal((shipping + total).toFixed(2))
  }, [shipping, total])

  useEffect(() => {
    calculateTotal()
    let count = 0;
    products.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
  }, [products]) // add products to the dependency array

  useEffect(() => {
    calculateTotal()
  }, [products])

  typeof window !== 'undefined' && window?.addEventListener('updateCheckoutCount', (event) => {
    let count = 0;
    setProducts(JSON.parse(localStorage.getItem('products')) || [])
    products?.forEach((product) => {
      count += product.quantity;
    })
    setCartCount(count)
    calculateTotal()
  });

  const calculateTotal = () => {
    let total = 0;
    products?.forEach(product => total += product.price * product.quantity)
    setTotal(total / 100)
  }


  const handleKeyDown = (e) => {
    if (e.which === 27) {
      toggleCart(false)
    }
  }

  const handleCheckout = async () => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => { setClientSecret(data.clientSecret), setPaymentIntentId(data.paymentIntentId) });

    setShowStripeForm(true)
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <>

      <div> 
        <FocusTrap
          active={isCartOpen && hasFocus}
          focusTrapOptions={{ allowOutsideClick: true }}>
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
            className={cx('cart', {
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
                  <>
                  <CartItems products={products} />
                  </>
                ) : (
                  <EmptyCart />
                )}
                {showStripeForm &&
                  (<div className='App mt-20' >
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm products={products} paymentIntentId={paymentIntentId} setShipping={setShipping} subtotal={subtotal} />
                      </Elements>
                    )}
                  </div>)
                }
            </div>
              {products?.length > 0 && (
              <div className="cart--footer">
                  <div className="cart--subtotal flex flex-col">
                    <div className='cart--subtotal'>
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                    <div className='cart--subtotal border-t'>
                      <span>Shipping</span>
                      <span>{shipping > 0 ? '$' + shipping : 'Calculated at next step'}</span>
                    </div>
                    <div className='cart--subtotal border-t'>
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                  </div>
                  {!showStripeForm && <button
                    onClick={handleCheckout}
                    className="btn is-primary is-large is-block"
                >
                  {isUpdating ? 'Updating...' : 'Checkout'}
                  </button>}

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
        /></div>
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




