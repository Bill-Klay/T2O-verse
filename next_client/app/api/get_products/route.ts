import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { base_url } from "@/lib/Constants";

export async function POST() {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");

  try {
    const res = await fetch(`${base_url}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
    });

    const res_data = await res.json();
    return NextResponse.json(res_data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
