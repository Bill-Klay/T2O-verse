// components/CheckoutForm.tsx
import PlanCard from "@/Components/Stripe/PlanCard";
import { runErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";

interface SubscriptionData {
  subscription_id: string;
  user_id: string;
  price_id: string;
  email: string;
}

interface Props {
  subscriptions: SubscriptionData[];
}

const CheckoutForm: React.FC<Props> = ({ subscriptions }) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionData | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const handleCheckout = async () => {
    if (!selectedPlan) return;

    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        body: JSON.stringify({
          price_id: selectedPlan.price_id,
          quantity,
          mode: "subscription",
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
        {subscriptions.map((subscription) => (
          <PlanCard
            key={subscription.subscription_id}
            subscription={subscription}
            isSelected={selectedPlan === subscription}
            onSelect={() => setSelectedPlan(subscription)}
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
