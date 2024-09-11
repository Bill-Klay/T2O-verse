"use client";

import { runErrorToast, runSuccessToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";

interface RecurringData {
  interval: string;
}

interface PriceData {
  unit_amount: number;
  currency: string;
  product_id: string;
  active?: boolean;
  recurring?: RecurringData;
}

const CreatePriceForm: React.FC = () => {
  const initialFormData: PriceData = {
    unit_amount: 0,
    currency: "usd",
    product_id: "",
    active: true,
  };

  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState<PriceData>(initialFormData);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/get_products", {
        method: "POST",
      });

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: {
        ...prevData[fieldName],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const priceData = {
        ...formData,
        billing_scheme: "per_unit", // Set billing scheme to per_unit by default
      };

      const response = await fetch("/api/create_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: priceData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Price created successfully:", data);
        runSuccessToast("Price Successfully Created");
        setFormData(initialFormData);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating price:", error);
      runErrorToast("Error Creating Price");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6 mx-auto my-6">
      <div className="space-y-4 w-full mx-auto pb-6 text-center">
        {/* Unit Amount */}
        <div className="flex flex-col">
          <label
            htmlFor="unit_amount"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Unit Amount (in dollars):
          </label>
          <input
            id="unit_amount"
            name="unit_amount"
            type="number"
            step="0.01"
            value={formData.unit_amount}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        {/* Currency and Product Selection */}
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="currency"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Currency:
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
          </div>

          <div className="flex flex-col w-1/2">
            <label
              htmlFor="product_id"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Product ID:
            </label>
            <select
              id="product_id"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
            >
              <option key={0} value="">
                Select Product
              </option>
              {products.map((product, index) => (
                <option key={index} value={product.product_id}>
                  {product.product_id}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recurring Interval */}
        <div className="flex flex-col">
          <label
            htmlFor="recurring_interval"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Recurring Interval:
          </label>
          <select
            id="recurring_interval"
            name="interval"
            value={formData.recurring?.interval || ""}
            onChange={(e) => handleNestedChange(e, "recurring")}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select interval</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          Create Price
        </button>
      </div>
    </form>
  );
};

export default CreatePriceForm;
