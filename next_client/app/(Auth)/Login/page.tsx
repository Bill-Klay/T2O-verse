"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { loginFormValidation } from "@/utils/FormValidation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { base_url } from "@/lib/Constants";

const LoginPage = () => {
  const [type, setType] = useState("password");
  const [displayPass, setDisplayPass] = useState(false);
  const { setAuth }: any = useAuth();
  const router = useRouter();

  const handleToggle = () => {
    setDisplayPass(!displayPass);
    if (displayPass === true) {
      setType("text");
    } else {
      setType("password");
    }
  };

  const Formik = useFormik({
    initialValues: {
      username_or_email: "",
      password: "",
    },
    validationSchema: loginFormValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username_or_email", values.username_or_email);
      formData.append("password", values.password);
      formData.append("token", "");
      try {
        const res = await fetch(`${base_url}/login`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        console.log("Response:...", res);

        if (!res.ok) {
          if (res.status === 400) {
            setAuth({
              username_or_email: values.username_or_email,
              password: values.password,
            });
            router.push(`/TwoFA`);
            return;
          }
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

              <p className="2xl:px-5">Welcome</p>
            </div>
          </div>

          <div className="w-full border-stroke xl:w-2/3 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login
              </h2>

              <form onSubmit={Formik.handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username Or Email
                  </label>
                  <div className="relative">
                    <input
                      id="username_or_email"
                      name="username_or_email"
                      onChange={Formik.handleChange}
                      placeholder="Enter username or email"
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
                  <span className="text-danger">
                    {Formik.errors.username_or_email &&
                    Formik.touched.username_or_email
                      ? `${Formik.errors.username_or_email}`
                      : ""}
                  </span>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
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
                  <span>
                    Forgot{" "}
                    <Link href="/ForgotPassword" className="text-primary">
                      Password?
                    </Link>
                  </span>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Login
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link href="/Signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
