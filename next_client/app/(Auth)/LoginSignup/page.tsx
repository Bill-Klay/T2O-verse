"use client";

import { useState } from "react";
import LoginPage from "../../../Components/Login/page";
import SignupPage from "../../../Components/Signup/page";

const LoginSignupPage = () => {
  const [type, setType] = useState("login");

  const handleClick = (type: string) => {
    setType(type);
  };

  return (
    <div className=" flex flex-col items-center border-t-primaryDark border-t-4 border-b-4 border-b-normal-1 rounded-md  w-[650px] h-[600px] bg-normal-1 shadow-md">
      <div className="flex h-16 w-full rounded-b-lg">
        <button
          className={`hover:bg-primary hover:text-normal-1 transition duration-500 w-full text-xl ${
            type === "login" ? "border-b-2 border-b-primaryDark" : "opacity-50"
          }`}
          onClick={() => handleClick("login")}
        >
          Login
        </button>
        <button
          className={`hover:bg-primary hover:text-normal-1 transition duration-500 w-full text-xl ${
            type === "signup" ? "border-b-2 border-b-primaryDark" : "opacity-50"
          }`}
          onClick={() => handleClick("signup")}
        >
          Signup
        </button>
      </div>
      <div className="flex items-center justify-center h-full w-full">
        {type === "login" ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
};

export default LoginSignupPage;
