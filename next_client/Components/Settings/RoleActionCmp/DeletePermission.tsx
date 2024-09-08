import {
  deletePermission,
  fetchPermissions,
} from "@/handlers/Settings/handlers";
import { Permission } from "@/types/RoleTypes";
import { useEffect, useState } from "react";

export const DeletePermission = () => {
  const [selectedPermission, setSelectedPermission] = useState(0);
  const [existingPermissions, setExistingPermissions] = useState<Permission[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const permissions = await fetchPermissions();
      setExistingPermissions(permissions);
    })();
  }, []);

  return (
    <div className=" flex flex-col items-center">
      <label
        htmlFor="delete_permission"
        className="my-2 font-medium text-black dark:text-white"
      >
        Delete Permission:{" "}
      </label>
      <select
        id="delete_permission"
        name="delete_permission"
        onChange={(event) => {
          setSelectedPermission(Number(event.target.value));
          console.log(selectedPermission);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value="">
          Select Permission
        </option>
        {existingPermissions?.map((permission) => (
          <option key={permission.id} value={permission.id}>
            {permission.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          deletePermission(selectedPermission);
        }}
        className="w-45 my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Delete Permission
      </button>
    </div>
  );
};
