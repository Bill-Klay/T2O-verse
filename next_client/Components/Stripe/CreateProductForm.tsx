"use client";

import React, { SelectHTMLAttributes, useState } from "react";

interface ProductData {
  name: string;
  description?: string;
  active?: boolean;
  attributes?: string[];
  // caption?: string;
  images?: string[];
  metadata?: { [key: string]: string };
  package_dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  } | null;
  shippable?: boolean;
  statement_descriptor?: string;
  unit_label?: string;
  url?: string;
}

const CreateProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    active: true,
    attributes: [],
    // caption: "None",
    metadata: {},
    package_dimensions: null,
    shippable: false,
    statement_descriptor: "None",
    unit_label: "None",
    url: "None",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "attributes" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product created successfully:", data);
        alert("Product created successfully");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
    console.log("Submitting form:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6 my-6">
      <div className=" space-y-4 w-full mx-auto pb-6 text-center">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-2.5 font-medium text-black dark:text-white"
          >
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="active"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Active:
            </label>
            <select
              id="active"
              name="active"
              value={formData.active?.toString()}
              onChange={(e) => handleChange(e)}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="description"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Description:
            </label>
            <input
              id="description"
              name="description"
              type="textarea"
              value={formData.description || ""}
              onChange={(e) => handleChange(e)}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-full">
            <label
              htmlFor="attributes"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Attributes:
            </label>
            <input
              id="attributes"
              name="attributes"
              type="text"
              value={formData.attributes?.join(",") || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="shippable"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Shippable:
            </label>
            <select
              id="shippable"
              name="shippable"
              value={formData.shippable?.toString()}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="statement_descriptor"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Statement Descriptor:
            </label>
            <input
              id="statement_descriptor"
              name="statement_descriptor"
              type="text"
              value={formData.statement_descriptor || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="unit_label"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Unit Label:
            </label>
            <input
              id="unit_label"
              name="unit_label"
              type="text"
              value={formData.unit_label || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="url"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              URL:
            </label>
            <input
              id="url"
              name="url"
              type="text"
              value={formData.url || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Create Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
