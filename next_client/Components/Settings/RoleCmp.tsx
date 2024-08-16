import { base_url } from "@/lib/Constants";
import { Permission, Role, User } from "@/types/RoleTypes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RoleCmp = () => {
  const [action, setAction] = useState("create_role");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState("");
  const [existingRoles, setExistingRoles] = useState<Role[]>([]);
  const [existingPermissions, setExistingPermissions] = useState<Permission[]>(
    []
  );
  const [listedUsers, setListedUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const fetchData = async () => {
    try {
      const roles_res = await fetch(`${base_url}/roles`, {
        method: "GET",
        credentials: "include",
      });
      const permissions_res = await fetch(`${base_url}/permissions`, {
        method: "GET",
        credentials: "include",
      });
      const users_res = await fetch(`${base_url}/users/details`, {
        method: "GET",
        credentials: "include",
      });

      const roles_data = await roles_res.json();
      const permissions_data = await permissions_res.json();
      const users_data = await users_res.json();

      console.log("User >>>", users_data.users);

      setExistingRoles(roles_data.roles);
      setExistingPermissions(permissions_data.permissions);
      setListedUsers(users_data.users);
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const createRole = async () => {
    try {
      const res = await fetch(`/api/create_role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
        }),
      });

      const res_data = await res.json();
      toast.success(`${res_data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const createPermission = async () => {
    // Can be Better
    try {
      const res = await fetch(`/api/create_permission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission,
        }),
      });

      const resStatus = res.status;
      console.log("Res Status >>", resStatus);
      const res_data = await res.json();

      toast.success(`${res_data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const assignPermission = async () => {
    try {
      const res = await fetch(`/api/assign_permission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role_name: selectedRole,
          permission_name: selectedPermission,
        }),
      });

      const resStatus = res.status;
      console.log("Res Status >>", resStatus);
      const res_data = await res.json();

      toast.success(`${res_data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const assignRole = async () => {
    try {
      const user_id = Number(selectedUser);
      const role_id = Number(selectedRole);
      const res = await fetch(`/api/assign_role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          role_id,
        }),
      });

      const resStatus = res.status;
      console.log("Res Status >>", resStatus);
      const res_data = await res.json();

      toast.success(`${res_data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        </select>
      </div>
      <div className="mx-auto mb-2 w-11/12">
        <hr />
      </div>
      {(() => {
        switch (action) {
          case "create_role":
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
                  onClick={createRole}
                  className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
                >
                  Create Role
                </button>
              </div>
            );
          case "create_permission":
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
                  onClick={createPermission}
                  className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
                >
                  Create Permission
                </button>
              </div>
            );
          case "assign_permission":
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
                  className="w-1/2 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  className="w-1/2 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  onClick={assignPermission}
                  className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
                >
                  Assign Permission
                </button>
              </div>
            );
          case "assign_role":
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
                  className="w-1/2 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option key={0} value="">
                    Select User
                  </option>
                  {listedUsers?.map((user) => (
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
                  className="w-1/2 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  onClick={assignRole}
                  className="w-[45%] my-4 rounded-lg border border-primary bg-primary p-1
        text-white transition hover:bg-opacity-90"
                >
                  Assign Role
                </button>
              </div>
            );
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
