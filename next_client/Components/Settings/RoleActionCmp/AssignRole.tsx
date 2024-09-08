import { assignRole, fetchRoles } from "@/handlers/Settings/handlers";
import { Role } from "@/types/RoleTypes";
import { useEffect, useState } from "react";

type Props = {
  usersList: [any];
};

export const AssignRole = ({ usersList }: Props) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
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
        htmlFor="select_user"
        className="mb-2 font-medium text-black dark:text-white"
      >
        Select User:{" "}
      </label>
      <select
        id="select_user"
        name="select_user"
        onChange={(event) => {
          setSelectedUser(event.target.value);
        }}
        className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value="">
          Select User
        </option>
        {usersList?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id} {user.first_name}
          </option>
        ))}
      </select>
      <label
        htmlFor="assign_role"
        className="my-2 font-medium text-black dark:text-white"
      >
        Assign Role:{" "}
      </label>
      <select
        id="assign_role"
        name="assign_role"
        onChange={(event) => {
          setSelectedRole(event.target.value);
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
          assignRole(selectedUser, selectedRole);
        }}
        className="w-45 my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
      >
        Assign Role
      </button>
    </div>
  );
};
