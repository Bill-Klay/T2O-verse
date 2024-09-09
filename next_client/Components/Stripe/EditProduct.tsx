"use client";

import { runErrorToast, runSuccessToast } from "@/utils/toast";
import React, { SelectHTMLAttributes, useEffect, useState } from "react";

interface ProductData {
  product_id: string;
  name: string;
  description?: string;
  active?: boolean;
  attributes?: string[];
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
    product_id: "",
    name: "",
    active: true,
    attributes: [],
    metadata: {},
    package_dimensions: null,
    shippable: false,
    statement_descriptor: "None",
    unit_label: "None",
    url: "None",
  });
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any>();

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

  useEffect(() => {
    getProducts();
  }, []);

  const selectProduct = (product_id: string) => {
    const [product] = products.filter(
      (product) => product.product_id === product_id
    );
    console.log(product);
    setProduct(product);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prevData: any) => ({
      ...prevData,
      [name]: name === "attributes" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/edit_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product edited successfully:", data);
        runSuccessToast("Product Successfully Edited.");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing product:", error);
      runErrorToast("Error Editing Product.");
    }
    console.log("Submitting form:", product);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-6 my-6">
      <div className=" space-y-4 w-full mx-auto pb-6 text-center">
        <div>
          <select
            id="product_id"
            name="product_id"
            // value={formData.name}
            onChange={(e) => {
              selectProduct(e.target.value);
              // handleChange(e);
            }}
            className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option key={0} value="">
              Select Product
            </option>
            {products.map((product, index) => (
              <option key={index} value={product.product_id}>
                {product.name}
              </option>
            ))}
          </select>
          <span>{JSON.stringify(product, null, 4)}</span>
        </div>
        {product !== null ? (
          <>
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
                value={product?.name}
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
                  value={product?.active?.toString()}
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
                  value={product?.description || ""}
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
                  value={product?.attributes?.join(",") || ""}
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
                  value={product?.shippable?.toString()}
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
                  value={product?.statement_descriptor || ""}
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
                  value={product?.unit_label || ""}
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
                  value={product?.url || ""}
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
                Edit Product
              </button>
            </div>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default CreateProductForm;
