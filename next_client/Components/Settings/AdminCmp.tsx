import { UserData } from "@/types/UserData";
import { useState } from "react";
import UserDataCmp from "./UserDataCmp";
import AdminUserCmp from "./AdminUserCmp";

type Props = {
  usersList: [UserData];
};

const AdminCmp = ({ usersList }: Props) => {
  const [user, setUser] = useState<UserData>();

  return (
    <>
      <select
        onChange={(event) => {
          const user = usersList.find(
            (user) => user.id === Number(event.target.value)
          );
          setUser(user);
        }}
        className="w-1/2 mt-5 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option key={0} value={""}>
          Select User
        </option>
        {usersList.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id}: {user.first_name}
          </option>
        ))}
      </select>
      <UserDataCmp user_data={user} />
      {user && (
        <div>
          <AdminUserCmp user={user} setUser={setUser} />
        </div>
      )}
    </>
  );
};

export default AdminCmp;
