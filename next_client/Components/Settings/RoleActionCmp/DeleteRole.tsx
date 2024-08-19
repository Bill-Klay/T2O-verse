import { deleteRole, fetchRoles } from "@/handlers/Settings/handlers";
import { Role } from "@/types/RoleTypes";
import { useEffect, useState } from "react";

export const DeleteRole = () => {
  const [selectedRole, setSeletedRole] = useState(0);
  const [existingRoles, setExistingRoles] = useState<Role[]>([]);

  useEffect(() => {
    (async () => {
      const roles = await fetchRoles();
      setExistingRoles(roles);
    })();
  }, []);

  return (
    <div className=" flex flex-col items-center">
      <label
        htmlFor="delete_role"
        className="my-2 font-medium text-black dark:text-white"
      >
        Delete Role:{" "}
      </label>
      <select
        id="delete_role"
        name="delete_role"
        onChange={(event) => {
          setSeletedRole(Number(event.target.value));
          console.log(selectedRole);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value="">
          Select Role
        </option>
        {existingRoles?.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          deleteRole(selectedRole);
        }}
        className="w-45 my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Delete Role
      </button>
    </div>
  );
};
