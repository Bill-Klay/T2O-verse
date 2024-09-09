"use client";

import React, { useState } from "react";

interface SubscriptionData {
  user_id?: string;
  email?: string;
  price_id: string;
  trial_period_days?: number;
}

const CreateSubscriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<SubscriptionData>({
    price_id: "",
    trial_period_days: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "trial_period_days" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Subscription created successfully:", data);
        alert("Subscription created successfully");
        setFormData({
          price_id: "",
          trial_period_days: 0,
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("Error creating subscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-6">
      <div className="space-y-4 w-full mx-auto px-5 pb-6 text-center">
        <div className="flex flex-col">
          <label
            htmlFor="price_id"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Price ID:
          </label>
          <input
            id="price_id"
            name="price_id"
            type="text"
            value={formData.price_id}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="user_id"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            User ID:
          </label>
          <input
            id="user_id"
            name="user_id"
            type="text"
            value={formData.user_id || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="trial_period_days"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Trial Period Days:
          </label>
          <input
            id="trial_period_days"
            name="trial_period_days"
            type="number"
            value={formData.trial_period_days}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Create Subscription
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateSubscriptionForm;
