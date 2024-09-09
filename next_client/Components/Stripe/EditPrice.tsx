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
  price_id: string;
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

const EditPriceForm: React.FC = () => {
  const initialFormData: PriceData = {
    price_id: "",
    unit_amount: 0,
    currency: "",
    product_id: "",
    active: true,
    billing_scheme: "",
    lookup_key: "",
    nickname: "",
    recurring: {} as RecurringData,
    // tiers: null,
    // tiers_mode: null,
  };

  // const [formData, setFormData] = useState<PriceData>(initialFormData);
  const [price, setPrice] = useState<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    getProducts();
    getPrices();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/get_products", {
        method: "POST",
      });

      const data = await res.json();
      console.log("Products >>", data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrices = async () => {
    try {
      const res = await fetch("/api/get_prices", {
        method: "POST",
      });

      const data = await res.json();
      console.log("Prices >>", data);
      setPrices(data); // Commented out as we're not using this in the current implementation
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const { name, value } = e.target;
    setPrice((prevData) => ({
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
      const response = await fetch("/api/edit-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(price),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Price edited successfully:", data);
      runSuccessToast("Price Successfully Edited");
    } catch (error) {
      console.error("Error editing price:", error);
      runErrorToast("Error Editing Price");
    }
  };

  const selectProduct = (price_id: string) => {
    const [price] = prices.filter((price) => price.price_id === price_id);
    console.log(price);
    setPrice(price);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6 mx-auto my-6">
      <div className="space-y-4 w-full mx-auto pb-6 text-center">
        <div>
          <select
            id="product_id"
            name="product_id"
            // value={formData.name}
            onChange={(e) => {
              selectProduct(e.target.value);
            }}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option key={0} value={undefined}>
              Select Price
            </option>
            {prices?.map((price: any, index) => (
              <option key={index} value={price.price_id}>
                {price.price_id}
              </option>
            ))}
          </select>
          {/* <span>{JSON.stringify(product, null, 4)}</span> */}
        </div>
        {price !== null && price !== undefined ? (
          <>
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
                value={price.unit_amount}
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
                  value={price.currency}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                >
                  <option value="">Select</option>
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
                  value={price.product_id}
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
                  value={price.billing_scheme || ""}
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
                  value={price.lookup_key || ""}
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
                value={price.nickname || ""}
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
                  value={price.recurring?.interval || ""}
                  onChange={(e) => handleNestedChange(e, "recurring")}
                  className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="">Select interval</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-1">
              <button
                type="submit"
                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                Edit Price
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default EditPriceForm;
