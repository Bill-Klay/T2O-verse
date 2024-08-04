import { UserData } from "@/types/UserData";
import Image from "next/image";

const UserDataCmp = (user_data: any) => {
  const userData = user_data.user_data;
  return (
    <>
      <Image
        src={"/images/cover/cover-01.png"}
        alt="profile cover"
        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        width={970}
        height={260}
        style={{
          width: "auto",
          height: "auto",
        }}
      />
      {/* {JSON.stringify(userData, null, 4)} */}
      <div className="px-4 pb-3 text-center lg:pb-5 xl:pb-5">
        <div className="mt-8 grid grid-cols-2">
          <h3 className="mb-1.5 text-lg font-semibold text-meta-5 dark:text-meta-5">
            <span className="font-semibold text-black dark:text-white">
              Name:
            </span>
            {" " + userData?.first_name} {userData?.last_name}
          </h3>
          <h3 className="mb-1.5 text-lg font-semibold text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">
              Email:
            </span>
            {" " + userData?.email}
          </h3>
          <h3 className="mt-2 mb-1.5 text-lg font-semibold text-meta-5 dark:text-meta-5">
            <span className="font-semibold text-black dark:text-white">
              Username:
            </span>
            {" " + userData?.username}
          </h3>
          <h3 className="mt-2 mb-1.5 text-lg font-semibold text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">
              Roles:
            </span>
            {userData?.roles?.map((role: string) => (
              <p className="mt-4.5" key={role}>
                {role}
              </p>
            ))}
          </h3>
        </div>
        <div className="mx-auto max-w-180 mt-5">
          <h3 className="mt-2 mb-1.5 text-lg font-semibold text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">
              Two-Factor Authentication:
            </span>
            {userData?.twofa_enabled ? " Enabled" : " Disabled"}
          </h3>
        </div>
      </div>
    </>
  );
};

export default UserDataCmp;
