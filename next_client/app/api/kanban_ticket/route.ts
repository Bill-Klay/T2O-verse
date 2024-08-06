import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();

  try {
    const res = await fetch(
      `${base_url}/columns/${req_data.column_id}/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `${session?.name}=${session?.value}`,
          "X-CSRFToken": `${CSRFToken?.value}`,
        },
        body: JSON.stringify({
          title: req_data.title,
          description: req_data.description,
          position: req_data.column_id,
        }),
      }
    );

    if (res.status === 403) {
      const errorMessage = await res.json();
      return NextResponse.json(errorMessage.error, { status: 403 });
    }

    const res_data = await res.json();
    console.log("Response >>", res_data);
    return NextResponse.json(res_data, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
