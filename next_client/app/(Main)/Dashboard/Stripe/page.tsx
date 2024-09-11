"use client";

import CreateProductForm from "@/Components/Stripe/CreateProductForm";
import CreatePriceForm from "@/Components/Stripe/CreatePriceFrom";
import { useState } from "react";
import CreateSubscription from "@/Components/Stripe/CreateSubscription";
import EditPrice from "@/Components/Stripe/EditPrice";
import EditProduct from "@/Components/Stripe/EditProduct";
import EditSubscription from "@/Components/Stripe/EditSubscription";

const StripePage = () => {
  const [action, setAction] = useState("create_product");

  const handleActionChange = (value: string) => {
    setAction(value);
  };

  return (
    <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-3">
      <select
        id="action"
        name="action"
        value={action}
        onChange={(event) => handleActionChange(event.target.value)}
        className="rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="create_product">Create Product</option>
        <option value="create_price">Create Price</option>
        <option value="create_subscription">Create Subscription</option>
        <option value="edit_product">Edit Product</option>
        <option value="edit_price">Edit Price</option>
        <option value="edit_subscription">Edit Subscription</option>
      </select>
      {(() => {
        switch (action) {
          case "create_product":
            return <CreateProductForm />;
          case "create_price":
            return <CreatePriceForm />;
          case "create_subscription":
            return <CreateSubscription />;
          case "edit_product":
            return <EditProduct />;
          case "edit_price":
            return <EditPrice />;
          case "edit_subscription":
            return <EditSubscription />;
          default:
            return (
              <div className="flex flex-col items-center">
                <p>Refresh In Case You See This.</p>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default StripePage;
