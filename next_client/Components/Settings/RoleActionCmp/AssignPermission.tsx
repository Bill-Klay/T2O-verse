import {
  assignPermission,
  fetchPermissions,
  fetchRoles,
} from "@/handlers/Settings/handlers";
import { Permission, Role } from "@/types/RoleTypes";
import { useEffect, useState } from "react";

export const AssignPermission = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [existingRoles, setExistingRoles] = useState<Role[]>([]);
  const [existingPermissions, setExistingPermissions] = useState<Permission[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const roles = await fetchRoles();
      setExistingRoles(roles);

      const permissions = await fetchPermissions();
      setExistingPermissions(permissions);
    })();
  }, []);

  return (
    <div className=" flex flex-col items-center">
      <label
        htmlFor="role"
        className="mb-2 font-medium text-black dark:text-white"
      >
        Select Role:{" "}
      </label>
      <select
        id="role"
        name="role"
        onChange={(event) => {
          setSelectedRole(event.target.value);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value="">
          Select Role
        </option>
        {existingRoles?.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>

      <label
        htmlFor="assign_permission"
        className="my-2 font-medium text-black dark:text-white"
      >
        Assign Permission:{" "}
      </label>
      <select
        id="assign_permission"
        name="assign_permission"
        onChange={(event) => {
          setSelectedPermission(event.target.value);
          console.log(selectedPermission);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value="">
          Select Permission
        </option>
        {existingPermissions?.map((permission) => (
          <option key={permission.id} value={permission.name}>
            {permission.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          assignPermission(selectedRole, selectedPermission);
        }}
        className="w-45 my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Assign Permission
      </button>
    </div>
  );
};
