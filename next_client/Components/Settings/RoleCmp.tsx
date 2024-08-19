import { useState } from "react";
import { CreateRole } from "./RoleActionCmp/CreateRole";
import { CreatePermission } from "./RoleActionCmp/CreatePermission";
import { AssignPermission } from "./RoleActionCmp/AssignPermission";
import { AssignRole } from "./RoleActionCmp/AssignRole";
import { DeletePermission } from "./RoleActionCmp/DeletePermission";
import { DeleteRole } from "./RoleActionCmp/DeleteRole";

type Props = {
  usersList: [any];
};

const RoleCmp = ({ usersList }: Props) => {
  const [action, setAction] = useState("create_role");

  return (
    <>
      <div className="py-3 px-10 flex flex-col justify-center items-center">
        <label
          htmlFor="action"
          className="mb-2 font-medium text-black dark:text-white "
        >
          Select Action:{" "}
        </label>
        <select
          id="action"
          name="action"
          onChange={(event) => {
            setAction(event.target.value);
          }}
          className="w-55 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="create_role">Create Role</option>
          <option value="create_permission">Create Permission</option>
          <option value="assign_permission">Assign Permission</option>
          <option value="assign_role">Assign Role</option>
          <option value="delete_permission">Delete Permission</option>
          <option value="delete_role">Delete Role</option>
        </select>
      </div>
      <div className="mx-auto mb-2 w-11/12">
        <hr />
      </div>
      {(() => {
        switch (action) {
          case "create_role":
            return <CreateRole />;
          case "create_permission":
            return <CreatePermission />;
          case "assign_permission":
            return <AssignPermission />;
          case "assign_role":
            return <AssignRole usersList={usersList} />;
          case "delete_permission":
            return <DeletePermission />;
          case "delete_role":
            return <DeleteRole />;
          default:
            return (
              <div className="flex flex-col items-center">
                <p>Refresh In Case You See This.</p>
              </div>
            );
        }
      })()}
    </>
  );
};

export default RoleCmp;
