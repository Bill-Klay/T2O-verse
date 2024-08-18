"use client";

import { useEffect, useState } from "react";
import { UserData } from "@/types/UserData";
import UserCmp from "@/Components/Settings/UserCmp";
import RoleCmp from "@/Components/Settings/RoleCmp";
import { fetchCurrentUser } from "@/handlers/Settings/handlers";

const SettingsPage = () => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    (async () => {
      const data = await fetchCurrentUser();
      setUserData(data);
    })();
  }, []);

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
          {userData !== undefined ? (
            <UserCmp userData={userData} setUserData={setUserData} />
          ) : null}
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
