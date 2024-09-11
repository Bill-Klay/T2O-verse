"use client";

import { runErrorToast, runSuccessToast } from "@/utils/toast";
import React, { useEffect, useState } from "react";

interface SubscriptionData {
  subscription_id: string;
  user_id: string;
  price_id: string;
  email: string;
}

interface UpdatedSubscriptionData {
  subscription_id: string;
  user_id: string;
  new_price_id: string;
  email: string;
}

const UpdateSubscriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<UpdatedSubscriptionData>({
    subscription_id: "",
    user_id: "",
    new_price_id: "",
    email: "",
  });
  const [prices, setPrices] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  // Fetch subscriptions from the backend
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      runErrorToast("Error fetching subscriptions");
    }
  };

  // Fetch prices from the backend
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

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that subscription_id and new_price_id are selected
    if (!formData.subscription_id || !formData.new_price_id) {
      runErrorToast("Please select a subscription and a new price.");
      return;
    }

    try {
      const response = await fetch("/api/update_subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Subscription updated successfully:", data);
        runSuccessToast("Subscription updated successfully");
        setFormData({
          subscription_id: "",
          user_id: "",
          new_price_id: "",
          email: "",
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      runErrorToast("Error updating subscription");
    }
  };

  const handleDelete = async () => {
    if (!formData.subscription_id) {
      runErrorToast("Please select a subscription to delete.");
      return;
    }

    try {
      const response = await fetch(`/api/delete_subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription_id: formData.subscription_id }),
      });

      if (response.ok) {
        runSuccessToast("Subscription deleted successfully");
        // Remove the deleted subscription from the list
        // setSubscriptions((prevSubscriptions) =>
        //   prevSubscriptions.filter(
        //     (sub) => sub.subscription_id !== formData.subscription_id
        //   )
        // );
        // setFormData({
        //   subscription_id: "",
        //   user_id: "",
        //   email: "",
        //   new_price_id: "",
        // });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      runErrorToast("Error deleting subscription");
    }
  };

  // Fetch subscriptions and prices when the component mounts
  useEffect(() => {
    fetchSubscriptions();
    getPrices();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-6">
      <div className="space-y-4 w-full mx-auto px-5 pb-6 text-center">
        {/* Subscription Selection */}
        <div className="flex flex-col">
          <label
            htmlFor="subscription_id"
            className="mb-2 font-medium text-black dark:text-white"
          >
            Select Subscription to Update:
          </label>
          <select
            id="subscription_id"
            name="subscription_id"
            value={formData.subscription_id}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select Subscription</option>
            {subscriptions?.map((subscription) => (
              <option
                key={subscription.subscription_id}
                value={subscription.subscription_id}
              >
                {subscription.subscription_id} - {subscription.user_id} (Current
                Price: {subscription.price_id})
              </option>
            ))}
          </select>
        </div>

        {/* New Price Selection */}
        <div className="flex flex-col">
          <label
            htmlFor="new_price_id"
            className="mb-2 font-medium text-black dark:text-white"
          >
            Select New Price:
          </label>
          <select
            id="new_price_id"
            name="new_price_id"
            value={formData.new_price_id} // Bind the selected value to formData
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select New Price</option> {/* Default option */}
            {prices?.map((p: any) => (
              <option key={p.price_id} value={p.price_id}>
                {p.price_id} - {p.price_name} {/* Display price name */}
              </option>
            ))}
          </select>
        </div>

        {/* User ID Input */}
        <div className="flex flex-col">
          <label
            htmlFor="user_id"
            className="mb-2 font-medium text-black dark:text-white"
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

        {/* Email Input */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 font-medium text-black dark:text-white"
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

        {/* Submit Button */}
        <div className="flex justify-end space-x-1">
          <button
            type="button"
            onClick={handleDelete}
            className={`inline-flex justify-center rounded-md border border-transparent bg-meta-1 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-meta-1 focus:ring-offset-2`}
          >
            Delete Subscription
          </button>
          <button
            type="submit"
            className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Update Subscription
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateSubscriptionForm;
