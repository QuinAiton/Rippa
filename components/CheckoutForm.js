import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";

import React from "react";
import { idMap } from "data/printify/IdMapper";

export default function CheckoutForm({ products }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const createLineItems = () => {
    const lineItems = [];
    products.forEach((product) => {
      console.log(product)
      lineItems.push({
        sku: idMap[product.variant.id],
        quantity: product.quantity,
      });
    });
    return lineItems
  }

  const parseName = (name) => {
    const splitName = name.split(' ');
    return { firstName: splitName[0], lastName: splitName[1] }
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
      if (!stripe || !elements) {
        return;
    }
    const addressElement = elements.getElement('address');
    const { complete, value } = await addressElement.getValue();
    const { address, name } = value
    try {
      if (complete) {
        const { firstName, lastName } = parseName(name)
        const orderData = {
          "line_items": createLineItems(),
          "shipping_method": 1,
          "send_shipping_notification": false,
          "address_to": {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": "0574 69 21 90",
            "country": address?.country,
            "region": address.state,
            "address1": address?.line1,
            "address2": address?.line2,
            "city": address?.city,
            "zip": address?.postal_code
          }
        }






        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000",
          },
          metadata: {
            ...orderData
          },
        });
      }


        //   // This point will only be reached if there is an immediate error when
        //   // confirming the payment. Otherwise, your customer will be redirected to
        //   // your `return_url`. For some payment methods like iDEAL, your customer will
        //   // be redirected to an intermediate site first to authorize the payment, then
        //   // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    }
  }

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <h3 className="pt-12">Contact info</h3>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)} />
        <h3 className="pt-12">Shipping</h3>
        <AddressElement id="address-element" options={{ mode: 'shipping' }} />
        <h3 className="pt-12">Payment</h3>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="bg-black px-10 py-6 text-white w-full mt-10 rounded-sm" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>

    </>
  );
}