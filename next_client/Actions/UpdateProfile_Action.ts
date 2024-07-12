import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const session = cookies().get("session");
const CSRFToken = cookies().get("X-CSRFToken");

export const updateProfileAction = async (form_data: FormData) => {
  "use server";
  if (form_data.get("password") !== "" && form_data.get("password") !== null) {
    const password = form_data.get("password")?.toString();
    const cnf_password = form_data.get("cnf_password")?.toString();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;

    if (password?.match(passwordRegex) && password === cnf_password) {
      const res = await fetch(`${base_url}/update_profile`, {
        method: "POST",
        headers: {
          Cookie: `${session?.name}=${session?.value}`,
          "X-CSRFToken": `${CSRFToken?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: form_data.get("first_name"),
          last_name: form_data.get("last_name"),
          email: form_data.get("email"),
          username: form_data.get("username"),
        }),
      });

      revalidatePath("/Dasboard/Settings");
      const res_data = await res.json();
      console.log(res_data);
    } else {
      console.log("Password does not match requirements");
    }
  } else {
    const res = await fetch(`${base_url}/update_profile`, {
      method: "POST",
      headers: {
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: form_data.get("first_name"),
        last_name: form_data.get("last_name"),
        email: form_data.get("email"),
        username: form_data.get("username"),
      }),
    });
    revalidatePath("/Dasboard/Settings");
    console.log(CSRFToken);
    const res_data = await res.json();
    console.log(res_data);
  }
};
