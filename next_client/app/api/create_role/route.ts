import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();

  try {
    const res = await fetch(`${base_url}/create_role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        name: req_data.role,
      }),
    });

    const res_data = await res.json();
    return Response.json(res_data);
  } catch (error) {
    return Response.json(error);
  }
}
