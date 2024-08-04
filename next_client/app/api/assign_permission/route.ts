import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();
  console.log("Req >>>", req_data.role_name);

  try {
    const res = await fetch(`${base_url}/assign_permission_to_role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        role_name: req_data.role_name,
        permission_name: req_data.permission_name,
      }),
    });

    const res_data = await res.json();
    console.log(res_data);
    return NextResponse.json(res_data, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
}
