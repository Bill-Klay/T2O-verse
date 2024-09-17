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
  price_id?: string;
}

const EditPriceForm: React.FC = () => {
  const initialFormData: PriceData = {
    unit_amount: 0,
    currency: "usd",
    product_id: "",
    active: true,
  };

  const [products, setProducts] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);
  const [price, setPrice] = useState<PriceData | null>(initialFormData);
  const [flag, setFlag] = useState(false);

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

  const getPrices = async () => {
    try {
      const res = await fetch("/api/get_prices", {
        method: "POST",
      });

      const data = await res.json();
      setPrices(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getPrices();
  }, [flag]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPrice((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/edit_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }), // Send the updated price
      });

      if (response.ok) {
        const data = await response.json();
        runSuccessToast("Price Successfully Edited");
        setFlag(!flag);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing price:", error);
      runErrorToast("Error Editing Price");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/delete_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price_id: price?.price_id }), // Send the price_id to delete
      });

      if (response.ok) {
        const data = await response.json();
        runSuccessToast("Price Successfully Deleted");
        setPrice(initialFormData); // Reset form after successful deletion
        setFlag(!flag);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting price:", error);
      runErrorToast("Error Deleting Price");
    }
  };

  const selectProduct = (price_id: string) => {
    const [selectedPrice] = prices.filter((p) => p.price_id === price_id);
    setPrice(selectedPrice);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6 mx-auto my-6">
      <div className="space-y-6 w-full pb-6">
        {/* Select Price Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="product_id"
            className="mb-2 font-medium text-black dark:text-white"
          >
            Select Price:
          </label>
          <select
            id="product_id"
            name="product_id"
            onChange={(e) => selectProduct(e.target.value)}
            className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option key={0} value={undefined}>
              Select Price
            </option>
            {prices?.map((p: any, index) => (
              <option key={index} value={p.price_id}>
                {p.price_id}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Rendering if Price is Selected */}
        {price && (
          <>
            {/* Currency and Product ID */}
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="currency"
                  className="mb-2 font-medium text-black dark:text-white"
                >
                  Currency:
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={price.currency}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="product_id"
                  className="mb-2 font-medium text-black dark:text-white"
                >
                  Product ID:
                </label>
                <select
                  id="product_id"
                  name="product_id"
                  value={price.product_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                value={price.unit_amount}
                onChange={handleChange}
                className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
            </div>

            {/* Submit and Delete Buttons */}
            <div className="flex justify-end space-x-1">
              <button
                type="button"
                onClick={handleDelete}
                className={`inline-flex justify-center rounded-md border border-transparent bg-meta-1 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-meta-1 focus:ring-offset-2`}
              >
                Delete Price
              </button>
              <button
                type="submit"
                className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                Edit Price
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default EditPriceForm;
