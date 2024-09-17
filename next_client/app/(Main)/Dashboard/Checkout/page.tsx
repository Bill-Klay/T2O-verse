// pages/checkout/index.tsx
"use client";
import CheckoutForm from "@/Components/Stripe/CheckOutForm";
import { runErrorToast } from "@/utils/toast";
import { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    // Fetch prices from your backend API
    (async () => {
      try {
        const response = await fetch("/api/get_prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPrices(data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
        runErrorToast("Error fetching prices");
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      {prices.length > 0 ? (
        <CheckoutForm prices={prices} />
      ) : (
        <p>Loading Products...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
