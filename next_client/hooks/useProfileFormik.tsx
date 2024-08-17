import { UserData } from "@/types/UserData";
import { useFormik } from "formik";
import { profileUpdateValidation } from "@/utils/FormValidation";

import { fetchCurrentUser } from "@/handlers/Settings/handlers";
import { runSuccessToast } from "@/utils/toast";
import { Dispatch, SetStateAction } from "react";

const useProfileFormik = (
  user_data: UserData,
  cnf_password: string,
  setUserData: Dispatch<SetStateAction<UserData | undefined>>
) => {
  const profileFormik = useFormik({
    initialValues: {
      first_name: user_data.first_name,
      last_name: user_data.last_name,
      email: user_data.email,
      username: user_data.username,
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
            user_id: user_data?.id,
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
          runSuccessToast(status.message);
          console.log("Hello");
          const data = await fetchCurrentUser();
          setUserData(data);
        }
      } catch (error) {
        console.log("Error >>", error);
      }
    },
  });

  return profileFormik;
};

export default useProfileFormik;
