// components/CheckoutForm.tsx
"use client";
import PlanCard from "@/Components/Stripe/PlanCard";
import { useAuth } from "@/hooks/useAuth";
import { runErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";

interface Props {
  prices: any;
}

const CheckoutForm: React.FC<Props> = ({ prices }) => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  const { auth }: any = useAuth();

  const handleCheckout = async () => {
    if (!selectedPlan) return;

    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        body: JSON.stringify({
          price_id: selectedPlan.price_id,
          user_id: auth?.id,
          quantity,
          mode: "payment",
        }),
      });

      const { checkout_url } = await response.json();
      window.location.href = checkout_url;
    } catch (error) {
      console.error("Error:", error);
      runErrorToast("An error occurred during checkout");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="space-y-1">
        {prices.map((price: any) => (
          <PlanCard
            key={price.price_id}
            price={price}
            isSelected={selectedPlan === price}
            onSelect={() => setSelectedPlan(price)}
          />
        ))}
      </div>
      {selectedPlan && (
        <>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
