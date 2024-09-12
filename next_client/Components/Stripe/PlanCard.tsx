// components/PlanCard.tsx
import React, { useEffect, useState } from "react";

interface SubscriptionData {
  subscription_id: string;
  user_id: string;
  price_id: string;
  email: string;
}

interface RecurringData {
  interval: string;
}

interface PriceData {
  unit_amount: number;
  currency: string;
  product_id: string;
  active?: boolean;
  recurring?: RecurringData;
  price_id?: string;
}

interface Props {
  subscription: SubscriptionData;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<Props> = ({ subscription, isSelected, onSelect }) => {
  const initialPrice: PriceData = {
    price_id: "",
    currency: "",
    product_id: "",
    active: false,
    recurring: { interval: "Monthly" },
    unit_amount: 0,
  };
  const [price, setPrice] = useState<PriceData>(initialPrice);

  const getPriceDetails = async () => {
    try {
      const res = await fetch("/api/get_price", {
        method: "POST",
        body: JSON.stringify({
          price_id: subscription.price_id,
        }),
      });

      const data = await res.json();
      setPrice(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPriceDetails();
  }, []);
  const priceString = `$${(price.unit_amount / 100).toFixed(2)}`;

  return (
    <div
      onClick={onSelect}
      className={`p-6 border rounded-lg cursor-pointer ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <h3 className="text-xl font-semibold">{price && priceString}</h3>
      <p>Per Month</p>
    </div>
  );
};

export default PlanCard;
