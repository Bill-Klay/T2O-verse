import UserDataCmp from "@/Components/Settings/UserDataCmp";
import { base_url } from "@/lib/Constants";
import { updateProfileAction } from "@/Actions/UpdateProfile_Action";

import { cookies } from "next/headers";

const SettingsPage = async () => {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");

  const res = await fetch(`${base_url}/current_user_details`, {
    method: "GET",
    headers: {
      Cookie: `${session?.name}=${session?.value}`,
    },
  });

  const user_data = await res.json();
  const { first_name, last_name, email, username } = user_data.message;

  return (
    <>
      <UserDataCmp user_data={user_data.message} />
      <div className="w-5/6 mx-auto px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <form action={updateProfileAction}>
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
                defaultValue={first_name}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
                defaultValue={last_name}
                className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
              defaultValue={email}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
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
              defaultValue={username}
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
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
              className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
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
