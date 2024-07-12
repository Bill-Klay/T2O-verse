"use client";

import { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { base_url } from "@/lib/Constants";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const forgotPassword = async (
    event: FormEvent<HTMLFormElement>,
    email: string
  ) => {
    event.preventDefault();
    try {
      const res = await fetch(`${base_url}/forgot_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        toast.success(`${resData.message}`, {
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
    } catch (error: any) {
      console.log("Error: ", error);
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
      <div className="xl:w-1/2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/3">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <h1 className="font-bold text-2xl mb-2">T2O-Verse</h1>
                <Image
                  src={"/images/logo/verse-logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="2xl:px-5">Reset Password</p>
            </div>
          </div>

          <div className="w-full border-stroke xl:w-2/3 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Enter Email
              </h2>
              <form
                onSubmit={(event) => {
                  forgotPassword(event, email);
                }}
                noValidate
              >
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    placeholder="Enter email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>

                <div className="my-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
