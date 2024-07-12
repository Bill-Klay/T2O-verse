"use client";
import React, { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { base_url } from "@/lib/Constants";
import { toast } from "react-toastify";

const TwoFA = () => {
  const [token, setToken] = useState("");
  const { setAuth, auth }: any = useAuth();
  const router = useRouter();

  const submitToken = async (event: FormEvent) => {
    const formData = new FormData();
    formData.append("username_or_email", auth.username_or_email);
    formData.append("password", auth.password);
    formData.append("token", token);
    try {
      const res = await fetch(`${base_url}/login`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log("Response:...", res);

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = "Something Went Wrong!";
        if (errorData) {
          errorMessage = errorData.message;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("DATA:...", JSON.stringify(data, null, 4));
      const user = data.user;
      setAuth(user);
      toast.success(`${data.message}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push(`/Dashboard/Profile`);
    } catch (error: any) {
      let errorMessage = "An error Occured";
      if (error.message) {
        errorMessage = error.message;
      }
      toast.error(`${errorMessage}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="xl:w-[30%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
            Enter Token
          </h2>
          <div className="mb-6">
            {/* <label className="mb-2.5 block font-medium text-black dark:text-white">
              Token
            </label> */}
            <div className="relative w-full flex justify-center items-center">
              <OTPInput
                value={token}
                onChange={setToken}
                numInputs={6}
                renderSeparator={<span>--</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-full rounded-md border border-strokedark bg-transparent py-1 text-center text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-5 w-full flex justify-center">
            <button
              type="submit"
              onClick={(event) => submitToken(event)}
              className="w-[30%] cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFA;
