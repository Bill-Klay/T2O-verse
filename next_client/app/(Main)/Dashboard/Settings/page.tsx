"use client";

import { useEffect, useState } from "react";
import { UserData } from "@/types/UserData";
import UserCmp from "@/Components/Settings/UserCmp";
import RoleCmp from "@/Components/Settings/RoleCmp";
import { fetchAllUsers, fetchCurrentUser } from "@/handlers/Settings/handlers";
import AdminCmp from "@/Components/Settings/AdminCmp";
import { useAuth } from "@/hooks/useAuth";

const SettingsPage = () => {
  const [userData, setUserData] = useState<UserData>();
  const [usersList, setUsersList] = useState([]);
  const [type, setType] = useState(false);

  const { auth }: any = useAuth();

  useEffect(() => {
    (async () => {
      const data = await fetchCurrentUser();
      setUserData(data);

      if (auth.roles?.includes("Admin") || auth.roles.includes("Super Admin")) {
        const usersData = await fetchAllUsers();
        const filteredData = usersData.filter(
          (user: UserData) => user.id !== data?.id
        );
        console.log("Filtered: ", filteredData);
        setUsersList(filteredData);
      }
    })();
  }, []);

  return (
    <div
      className={`${
        userData?.roles.includes("Admin") ||
        userData?.roles.includes("Super Admin")
          ? "md:flex lg:flex xl:flex justify-between"
          : "w-full"
      }`}
    >
      {userData && (
        <div className="overflow-hidden rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {userData.roles.includes("Admin") ||
          userData.roles.includes("Super Admin") ? (
            <div className="flex w-full items-center justify-center text-center">
              <button
                onClick={() => {
                  setType(false);
                }}
                className={`w-[45%] my-4 rounded-xs ${
                  type ? "" : "border-b border-meta-5"
                }  p-1
        text-black transition hover:bg-meta-5 hover:bg-opacity-10`}
              >
                Update Profile
              </button>
              <button
                onClick={() => {
                  setType(true);
                }}
                className={`w-[45%] my-4 rounded-xs ${
                  type ? "border-b border-meta-5" : ""
                } p-1
        text-black transition hover:bg-meta-5 hover:bg-opacity-10`}
              >
                Update Users
              </button>
            </div>
          ) : null}
          <div className="w-full mx-auto px-5 pb-6 text-center">
            {userData !== undefined ? ( // Checks for current users data
              type === false ? (
                <UserCmp userData={userData} setUserData={setUserData} />
              ) : (
                <AdminCmp usersList={usersList as any} />
              )
            ) : null}
          </div>
        </div>
      )}
      {userData?.roles.includes("Admin") ||
      userData?.roles.includes("Super Admin") ? (
        <div>
          <div className="w-full mx-auto text-center border-stroke bg-white rounded-md border shadow-default dark:border-strokedark dark:bg-boxdark">
            <RoleCmp usersList={usersList as any} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SettingsPage;
