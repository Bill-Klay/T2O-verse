"use client";

import { runErrorToast, runSuccessToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";

interface RecurringData {
  interval: string;
}

interface Tier {
  up_to: number;
  unit_amount: number;
}

interface TransformQuantity {
  divide_by: number;
  round: string;
}

interface PriceData {
  unit_amount: number;
  currency: string;
  product_id: string;
  active?: boolean;
  billing_scheme?: string;
  lookup_key?: string;
  price_metadata?: Record<string, string>;
  nickname?: string;
  transform_quantity?: null;
  recurring?: RecurringData;
  tiers?: null;
  tiers_mode?: null;
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
      const res = await fetch("/api/get_product", {
        method: "POST",
      });

      const data = await res.json();
      console.log("Products >>", data);
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
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;

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
    setFormData((prevData) => ({
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
      const response = await fetch("/api/create_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
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
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

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
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="billing_scheme"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Billing Scheme:
            </label>
            <select
              id="billing_scheme"
              name="billing_scheme"
              value={formData.billing_scheme || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select billing scheme</option>
              <option value="per_unit">Per Unit</option>
              <option value="tiered">Tiered</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="lookup_key"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Lookup Key:
            </label>
            <input
              id="lookup_key"
              name="lookup_key"
              type="text"
              value={formData.lookup_key || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="nickname"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Nickname:
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={formData.nickname || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
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
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select interval</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          {/* <div className="flex flex-col w-1/2">
            <label
              htmlFor="transform_quantity"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Transform Quantity:
            </label>
            <div className="flex space-x-4">
              <input
                id="divide_by"
                name="divide_by"
                type="number"
                placeholder="Divide By"
                value={formData.transform_quantity?.divide_by || ""}
                onChange={(e) => handleNestedChange(e, "transform_quantity")}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                id="round"
                name="round"
                type="text"
                placeholder="Round"
                value={formData.transform_quantity?.round || ""}
                onChange={(e) => handleNestedChange(e, "transform_quantity")}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div> */}
        </div>
      </div>

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
