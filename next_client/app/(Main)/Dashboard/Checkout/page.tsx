// pages/checkout/index.tsx
"use client";
import CheckoutForm from "@/Components/Stripe/CheckOutForm";
import { runErrorToast } from "@/utils/toast";
import { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    // Fetch subscriptions from your backend API
    (async () => {
      try {
        const response = await fetch("/api/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        runErrorToast("Error fetching subscriptions");
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      {subscriptions.length > 0 ? (
        <CheckoutForm subscriptions={subscriptions} />
      ) : (
        <p>Loading subscriptions...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
