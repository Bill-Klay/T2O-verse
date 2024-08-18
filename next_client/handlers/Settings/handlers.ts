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
