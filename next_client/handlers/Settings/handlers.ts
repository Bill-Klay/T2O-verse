import { UserData } from "@/types/UserData";
import { Dispatch, SetStateAction } from "react";

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
