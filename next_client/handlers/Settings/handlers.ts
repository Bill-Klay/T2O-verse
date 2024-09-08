import { base_url } from "@/lib/Constants";
import { runSuccessToast } from "@/utils/toast";

export const fetchCurrentUser = async () => {
  const res = await fetch(`/api/current_user_details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user_data = await res.json();
  console.log("UserData >>>", user_data);
  return user_data.data.message;
};

export const fetchAllUsers = async () => {
  try {
    const res = await fetch(`${base_url}/all_user_profiles`, {
      method: "GET",
      credentials: "include",
    });

    const users_data = await res.json();
    return users_data.message;
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const createRole = async (role: string) => {
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
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const fetchRoles = async () => {
  try {
    const res = await fetch(`${base_url}/roles`, {
      method: "GET",
      credentials: "include",
    });

    const roles_data = await res.json();
    return roles_data.roles;
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const createPermission = async (permission: string) => {
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
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const fetchPermissions = async () => {
  try {
    const res = await fetch(`${base_url}/permissions`, {
      method: "GET",
      credentials: "include",
    });

    const permissions_data = await res.json();
    return permissions_data.permissions;
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const assignPermission = async (
  role_name: string,
  permission_name: string
) => {
  try {
    const res = await fetch(`/api/assign_permission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role_name,
        permission_name,
      }),
    });

    const resStatus = res.status;
    console.log("Res Status >>", resStatus);
    const res_data = await res.json();
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const assignRole = async (
  selectedUser: string,
  selectedRole: string
) => {
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
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const deletePermission = async (selectedPermission: number) => {
  try {
    const res = await fetch(`/api/delete_permission`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        permission_id: selectedPermission,
      }),
    });

    const res_data = await res.json();
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const deleteRole = async (selectedRole: number) => {
  try {
    const res = await fetch(`/api/delete_role`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role_id: selectedRole,
      }),
    });

    const res_data = await res.json();
    runSuccessToast(res_data.message);
  } catch (error) {
    console.log("Error >>", error);
  }
};
