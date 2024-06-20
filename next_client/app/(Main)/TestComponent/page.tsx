import React from "react";
import { getCookies } from "next-client-cookies/server";
import { csrf_request } from "@/lib/csrf_request";
// import { useAuth } from "@/hooks/useAuth";

// // const { setAuth }: any = useAuth();
// const reqToken = async () => {

//   // const
//   console.log("Token...", data.message);
//   // console.log("Cookie", get)
//   return "worked";
// };

const TestComponent = async () => {
  let flag = "Did not work";
  flag = await csrf_request();
  // const token = await reqToken();
  // const csrtToken = await token;
  // console.log("Token....", csrtToken);
  return (
    <div className="border-2">
      Amerikaya: {typeof window} {"Cookie" + JSON.stringify(flag, null, 4)}
    </div>
  );
};

export default TestComponent;
