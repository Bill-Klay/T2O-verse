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
    <>
      <UserDataCmp user_data={userData} />
      <div className="w-5/6 mx-auto px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <button
          className="w-[45%] mb-4 rounded-lg border border-primary bg-primary p-2
        text-white transition hover:bg-opacity-90"
          onClick={() => setType(!type)}
        >
          {type ? "Switch To Roles" : "Switch to Profile"}
        </button>
        {type ? (
          <UserCmp
            Formik={profileFormik}
            userData={userData}
            setCnfPassword={setCnfPassword}
          />
        ) : (
          <RoleCmp />
        )}
      </div>
    </>
  );
};

export default SettingsPage;
