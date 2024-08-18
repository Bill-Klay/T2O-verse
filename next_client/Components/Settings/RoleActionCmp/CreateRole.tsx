import { useState } from "react";
import { createRole } from "@/handlers/Settings/handlers";

export const CreateRole = () => {
  const [role, setRole] = useState("");
  return (
    <div className=" flex flex-col items-center">
      <label
        htmlFor="create_role"
        className="mb-2 font-medium text-black dark:text-white"
      >
        Create Role:{" "}
      </label>
      <input
        id="create_role"
        name="create_role"
        type="text"
        placeholder="Admin..."
        onChange={(event) => {
          setRole(event.target.value);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <button
        onClick={() => {
          createRole(role);
        }}
        className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Create Role
      </button>
    </div>
  );
};
