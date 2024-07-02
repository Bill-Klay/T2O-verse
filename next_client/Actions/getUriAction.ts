"use server";
import { cookies } from "next/headers";

export const getURI = async () => {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  console.log(CSRFToken);
  const res = await fetch("http://localhost:5000/update_twofa", {
    method: "POST",
    // credentials: "include",
    headers: {
      "X-CSRFToken": `${CSRFToken?.value}`,
      Cookie: `session=${session?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled: true,
    }),
  });

  if (!res.ok) {
    throw new Error("Uri Failed");
  }
  const resData = await res.json();
  console.log(resData);
  return resData.uri;
};
