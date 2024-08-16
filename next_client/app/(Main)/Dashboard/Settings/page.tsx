"use client";

import UserDataCmp from "@/Components/Settings/UserDataCmp";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { UserData } from "@/types/UserData";
import { toast } from "react-toastify";
import { profileUpdateValidation } from "@/utils/FormValidation";
import UserCmp from "@/Components/Settings/UserCmp";
import RoleCmp from "@/Components/Settings/RoleCmp";

const SettingsPage = () => {
  const [userData, setUserData] = useState<UserData>();
  const [cnf_password, setCnfPassword] = useState("");
  const [type, setType] = useState(true);

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

  const profileFormik = useFormik({
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
      try {
        const res = await fetch(`/api/update_profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            username: values.username,
            password: values.password,
            cnf_password: cnf_password,
          }),
        });

        if (!res.ok) {
          const error = await res.json();
          const errorMessage = error.message;
          throw new Error(`${errorMessage}`);
        } else {
          const status = await res.json();
          toast.success(`${status.message}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchCurrentUser();
        }
      } catch (error) {
        console.log("Error >>", error);
      }
    },
  });

  return (
    <div
      className={`${
        userData?.roles.includes("Admin")
          ? "md:flex lg:flex xl:flex justify-between"
          : "w-full"
      }`}
    >
      <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full mx-auto px-5 pb-6 text-center">
          <UserCmp
            Formik={profileFormik}
            userData={userData}
            setCnfPassword={setCnfPassword}
          />
        </div>
      </div>
      {userData?.roles.includes("Admin") ? (
        <div>
          <div className="w-full mx-auto text-center border-stroke bg-white rounded-md border shadow-default dark:border-strokedark dark:bg-boxdark">
            <RoleCmp />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SettingsPage;
