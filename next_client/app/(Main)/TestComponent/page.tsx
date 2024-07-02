import React from "react";
import { cookies } from "next/headers";

const reqToken = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("session");

  const resp = await fetch("http://localhost:3000/api/setCookie", {
    method: "GET",
    headers: {
      Cookie: `session=${cookie?.value}`,
    },
  });

  const check = await resp.json();

  const res = await fetch("http://localhost:5000/check_auth_status", {
    method: "GET",
    // credentials: "include",
    headers: {
      Cookie: `session=${cookie?.value}`,
    },
  });

  const data = await res.json();
  return data;
};

const TestComponent = async () => {
  const cookieStore = cookies();
  let flag;
  flag = await reqToken();
  let flag1 = cookieStore.get("session")?.value;

  return (
    <div className="border-2">
      Amerikaya: {typeof window}{" "}
      {"Cookie" +
        JSON.stringify(flag, null, 4) +
        JSON.stringify(flag1, null, 4)}
    </div>
  );
};

export default TestComponent;
