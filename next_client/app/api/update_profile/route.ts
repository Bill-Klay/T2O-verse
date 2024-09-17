import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const data = await req.json();

  try {
    if (data.password !== "" && data.password !== null) {
      const password = data.password;
      const cnf_password = data.cnf_password;
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
            user_id: data.user_id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            password: data.password,
          }),
        });

        const res_data = await res.json();
        return Response.json(res_data);
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
          user_id: data.user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.username,
        }),
      });

      console.log(res.status);
      const res_data = await res.json();
      return Response.json(res_data);
    }
  } catch (error) {
    return Response.json(error);
  }
}
