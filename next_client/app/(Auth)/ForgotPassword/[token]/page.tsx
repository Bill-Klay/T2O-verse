"use client";

import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { passwordValidation } from "@/utils/FormValidation";
import { usePathname } from "next/navigation";
import { base_url } from "@/lib/Constants";
import { runErrorToast, runSuccessToast } from "@/utils/toast";

const ResetPasswordPage = () => {
  const [type, setType] = useState("password");
  const [displayPass, setDisplayPass] = useState(false);
  const pathName = usePathname();

  const handleToggle = () => {
    setDisplayPass(!displayPass);
    if (displayPass === true) {
      setType("text");
    } else {
      setType("password");
    }
  };

  function getStringAfterPort(url: string) {
    const searchString = "ForgotPassword/";
    const index = url.indexOf(searchString);

    if (index === -1) {
      return null; // searchString not found in the URL
    }

    return url.substring(index + searchString.length);
  }

  function getEmailFromUrl(url: string) {
    const searchString = "ForgotPassword/%22";
    const index = url.indexOf(searchString);

    if (index === -1) {
      return null; // searchString not found in the URL
    }

    const remainingString = url.substring(index + searchString.length);
    const emailEndIndex = remainingString.indexOf("%22");

    if (emailEndIndex === -1) {
      return null; // Closing %22 not found
    }

    return decodeURIComponent(remainingString.substring(0, emailEndIndex));
  }

  const Formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: passwordValidation,
    onSubmit: async (values) => {
      console.log("PathName>>>>", pathName);
      const routeNToken = getStringAfterPort(pathName);
      const email = getEmailFromUrl(pathName);
      console.log("TOKEN:....", routeNToken);
      console.log("EMAIL:....", email);
      try {
        if (values.password === values.confirm_password) {
          const res = await fetch(`${base_url}/reset_password/${routeNToken}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password: values.password,
            }),
          });
          const data = await res.json();
          runSuccessToast(data.message);
        } else {
          runErrorToast("Passwords Do Not Match");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

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
                Enter New Password
              </h2>
              <form onSubmit={Formik.handleSubmit} noValidate>
                <div className="mb-2">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      onChange={Formik.handleChange}
                      type={type}
                      placeholder="Enter Password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <button type="button" onClick={handleToggle}>
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
                              d="M11 3C6.272 3 2.351 6.186 1 11C2.351 15.814 6.272 19 11 19C15.728 19 19.649 15.814 21 11C19.649 6.186 15.728 3 11 3ZM11 17C7.241 17 4.154 14.24 3 11C4.154 7.76 7.241 5 11 5C14.759 5 17.846 7.76 19 11C17.846 14.24 14.759 17 11 17ZM11 7.5C9.067 7.5 7.5 9.067 7.5 11C7.5 12.933 9.067 14.5 11 14.5C12.933 14.5 14.5 12.933 14.5 11C14.5 9.067 12.933 7.5 11 7.5ZM11 13C9.897 13 9 12.103 9 11C9 9.897 9.897 9 11 9C12.103 9 13 9.897 13 11C13 12.103 12.103 13 11 13Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <span className="text-danger block">
                    {Formik.errors.password && Formik.touched.password
                      ? `${Formik.errors.password}`
                      : ""}
                  </span>
                </div>

                <div className="mb-2">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm Password:
                  </label>
                  <div className="relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      onChange={Formik.handleChange}
                      type="password"
                      placeholder="Confirm Password"
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
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <span className="text-danger block">
                    {Formik.errors.confirm_password &&
                    Formik.touched.confirm_password
                      ? `${Formik.errors.confirm_password}`
                      : ""}
                  </span>
                </div>

                <div className="my-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
                  >
                    Reset Password
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

export default ResetPasswordPage;
