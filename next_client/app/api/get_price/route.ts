import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { base_url } from "@/lib/Constants";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const { price_id } = await req.json();

  try {
    const res = await fetch(`${base_url}/price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        price_id,
      }),
    });

    const res_data = await res.json();
    return NextResponse.json(res_data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
