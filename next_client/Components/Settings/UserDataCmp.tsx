import Image from "next/image";
import { UserData } from "@/types/UserData";

const UserDataCmp = (user_data: any) => {
  const { first_name, last_name, email, username, roles, twofa_enabled } =
    user_data.user_data;
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
      {/* {JSON.stringify(user_data, null, 4)} */}
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="mt-8 grid grid-cols-2">
          <h3 className="mb-1.5 text-lg font-semibold text-meta-5 dark:text-meta-5">
            <span className="font-semibold text-black dark:text-white">
              Name:
            </span>
            {" " + first_name} {last_name}
          </h3>
          <h3 className="mb-1.5 text-lg font-semibold text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">
              Email:
            </span>
            {" " + email}
          </h3>
          <h3 className="mt-2 mb-1.5 text-lg font-semibold text-meta-5 dark:text-meta-5">
            <span className="font-semibold text-black dark:text-white">
              Username:
            </span>
            {" " + username}
          </h3>
          <h3 className="mt-2 mb-1.5 text-lg font-semibold text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">
              Roles:
            </span>
            {roles?.map((role: string) => (
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
            {twofa_enabled ? " Enabled" : " Disabled"}
          </h3>
        </div>
      </div>
    </>
  );
};

export default UserDataCmp;
