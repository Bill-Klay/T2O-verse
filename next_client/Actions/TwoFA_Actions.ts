"use server";
import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";

export const getURI = async () => {
  const session = cookies().get("session");
  const res = await fetch(`${base_url}/twofa_uri`, {
    method: "GET",
    headers: {
      Cookie: `${session?.name}=${session?.value}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Uri Failed");
  }
  const resData = await res.json();
  return resData.uri;
};

export const setTwoFA = async (flag: boolean, token: string) => {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const res = await fetch(`${base_url}/update_twofa`, {
    method: "POST",
    headers: {
      "X-CSRFToken": `${CSRFToken?.value}`,
      Cookie: `session=${session?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled: flag,
      token: token,
    }),
  });

  if (!res.ok) {
    throw new Error("2FA Failed");
  }
  const resData = await res.json();
  return resData;
};
