'use client'
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
    theme: "stripe",
  };

  return (
    <form 
      id="payment-form" 
      onSubmit={handleSubmit}
      className="max-w-screen-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
      
      <div className="mb-6">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>

      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="flex mx-auto w-[10%] bg-orange-500 hover:bg-orange-600 justify-center items-center text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>

      {message && (
        <div 
          id="payment-message" 
          className={`mt-4 p-4 rounded-md ${
            message.includes("error") || message.includes("unexpected") 
              ? "bg-red-50 text-red-700" 
              : "bg-green-50 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}