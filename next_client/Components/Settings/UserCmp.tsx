import { UserData } from "@/types/UserData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserDataCmp from "./UserDataCmp";
import useProfileFormik from "@/hooks/useProfileFormik";

type Props = {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData | undefined>>;
};

const UserCmp = ({ userData, setUserData }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [cnf_password, setCnfPassword] = useState("");
  const [user, setUser] = useState<UserData>(userData);

  const Formik = useProfileFormik(userData, cnf_password, setUserData);

  useEffect(() => {
    console.log(userData?.roles.includes("Admin"));
    if (userData?.roles.includes("Admin")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        <select className="w-1/2 mt-5 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary">
          <option key={1} value={"User1"}>
            User 1
          </option>
          <option key={2} value={"User2"}>
            User 2
          </option>
        </select>
      ) : null}
      <UserDataCmp user_data={userData} />
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
              // placeholder={userData?.first_name}
              value={Formik.values.first_name}
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
              // placeholder={userData?.last_name}
              value={Formik.values.last_name}
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
            // placeholder={userData?.email}
            value={Formik.values.email}
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
            // placeholder={userData?.username}
            value={Formik.values.username}
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
            onChange={(event) => {
              setCnfPassword(event.target.value);
            }}
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
    </>
  );
};

export default UserCmp;
