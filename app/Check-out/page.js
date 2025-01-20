'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';  // Update this import

import CheckoutForm from "@/app/Components/Checkout/CheckoutForm";
import CompletePage from "@/app/Components/Checkout/CompletePage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const cart = useSelector((state) => state.authUser.cart);
  const router = useRouter();

  React.useEffect(() => {
    setConfirmed(new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ));
  });

  React.useEffect(() => {
    if (!cart.length) {
      router.push('/Cart');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    console.log('Full Cart Checkout :', {
      items: cart,
      subtotal: subtotal,
      shipping: subtotal > 100 ? 0 : 10
    });

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Payment Intent Error:', error);
        router.push('/Cart');  // This stays the same
      });
  }, [cart, router]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App mt-32">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? <CompletePage /> : <CheckoutForm />}
        </Elements>
      )}
    </div>
  );
}