'use client'
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import CheckoutForm from "@/app/Components/Checkout/CheckoutForm";
import CompletePage from "@/app/Components/Checkout/CompletePage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SingleProductCheckout({ params }) {
  const resolvedParams = React.use(params);
  const [clientSecret, setClientSecret] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const cart = useSelector((state) => state.authUser.cart);
  const router = useRouter();

  React.useEffect(() => {
    const product = cart.find(item => item.id.toString() === resolvedParams.productId);
    
    if (!product) {
      router.push('/Cart');
      return;
    }

    const singleItem = [{
      ...product,
      quantity: 1 // Force quantity to 1 for single product purchase
    }];

    console.log('Single Product Checkout:', singleItem);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: singleItem }),
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
        router.push('/Cart');
      });
  }, [resolvedParams.productId, cart, router]);

  // ... rest of the code same as regular checkout page
  // ... (appearance, options, return statement)
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
