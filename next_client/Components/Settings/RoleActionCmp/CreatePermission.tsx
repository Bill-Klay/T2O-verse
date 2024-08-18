import React, { useState } from "react";
import { createPermission } from "@/handlers/Settings/handlers";

export const CreatePermission = () => {
  const [permission, setPermission] = useState("");

  return (
    <div className=" flex flex-col items-center">
      <label
        htmlFor="create_permission"
        className="mb-2 font-medium text-black dark:text-white"
      >
        Create Permission:{" "}
      </label>
      <input
        id="create_permission"
        name="create_permission"
        type="text"
        placeholder="Edit"
        onChange={(event) => {
          setPermission(event.target.value);
        }}
        className="w-1/2 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <button
        onClick={() => {
          createPermission(permission);
        }}
        className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Create Permission
      </button>
    </div>
  );
};
