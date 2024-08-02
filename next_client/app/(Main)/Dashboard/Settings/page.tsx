"use client";

import UserDataCmp from "@/Components/Settings/UserDataCmp";
import { updateProfileAction } from "@/Actions/UpdateProfile_Action";
import { FormEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserData } from "@/types/UserData";
import { toast } from "react-toastify";
import { profileUpdateValidation } from "@/utils/FormValidation";

const SettingsPage = () => {
  const [userData, setUserData] = useState<UserData>();

  const fetchCurrentUser = async () => {
    const res = await fetch(`/api/current_user_details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user_data = await res.json();
    console.log("UserData >>>", user_data);
    setUserData(user_data?.data.message);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const Formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
    },
    validationSchema: profileUpdateValidation,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 4));
      toast.success(`Hello Friend`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello");
    toast.success(`Hello Friend`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <UserDataCmp user_data={userData} />
      <div className="w-5/6 mx-auto px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <form onSubmit={Formik.handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start">
              <label
                htmlFor="first_name"
                className="mb-2.5 font-medium text-black dark:text-white"
              >
                First Name:{" "}
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder={userData?.first_name}
                onChange={Formik.handleChange}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger block">
                {Formik.errors.first_name && Formik.touched.first_name
                  ? Formik.errors.first_name
                  : null}
              </span>
            </div>
            <div className="flex flex-col items-start">
              <label
                htmlFor="last_name"
                className="mb-2.5 font-medium text-black dark:text-white"
              >
                Last Name:{" "}
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder={userData?.last_name}
                onChange={Formik.handleChange}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger block">
                {Formik.errors.last_name && Formik.touched.last_name
                  ? Formik.errors.last_name
                  : null}
              </span>
            </div>
          </div>
          <div className="w-full mt-3 flex flex-col items-start">
            <label
              htmlFor="email"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Email:{" "}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={userData?.email}
              onChange={Formik.handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-danger block">
              {Formik.errors.email && Formik.touched.email
                ? Formik.errors.email
                : null}
            </span>
          </div>
          <div className="w-full mt-3 flex flex-col items-start">
            <label
              htmlFor="username"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Username:{" "}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder={userData?.username}
              onChange={Formik.handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-danger block">
              {Formik.errors.username && Formik.touched.username
                ? Formik.errors.username
                : null}
            </span>
          </div>
          <div className="w-full mt-3 flex flex-col items-start">
            <label
              htmlFor="password"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Password:{" "}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={Formik.handleChange}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <span className="text-danger block">
              {Formik.errors.password && Formik.touched.password
                ? Formik.errors.password
                : null}
            </span>
          </div>
          <div className="w-full mt-3 flex flex-col items-start">
            <label
              htmlFor="cnf-password"
              className="mb-2.5 font-medium text-black dark:text-white"
            >
              Confirm Password:{" "}
            </label>
            <input
              id="cnf-password"
              name="cnf-password"
              type="password"
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mt-5 mb-5">
            <button
              type="submit"
              onClick={() => {
                console.log(Formik.values);
              }}
              className="w-full rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
