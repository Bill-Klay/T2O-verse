// components/PlanCard.tsx
import React, { useEffect, useState } from "react";

interface Props {
  price: any;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<Props> = ({ price, isSelected, onSelect }) => {
  const [product, setProduct] = useState<any>();

  const getProductDetails = async () => {
    try {
      const res = await fetch("/api/get_product", {
        method: "POST",
        body: JSON.stringify({
          product_id: price.product_id,
        }),
      });

      const data = await res.json();

      console.log("DATA: ", data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  const priceString = `$${price.unit_amount.toFixed(2)}`;

  return (
    <div
      onClick={onSelect}
      className={`p-6 border rounded-lg cursor-pointer ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <h3 className="text-xl font-semibold">{price && priceString}</h3>
      <h3 className="text-xl font-semibold">{product?.name}</h3>
    </div>
  );
};

export default PlanCard;
