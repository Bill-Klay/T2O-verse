import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("session");

  const res = await fetch(`${base_url}/current_user_details`, {
    method: "GET",
    headers: {
      Cookie: `${session?.name}=${session?.value}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return Response.json({ data });
}
