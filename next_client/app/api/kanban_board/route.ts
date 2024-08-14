import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();

  try {
    const res = await fetch(`${base_url}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        name: req_data.name,
      }),
    });

    if (res.status === 403) {
      const errorMessage = await res.json();
      return NextResponse.json(errorMessage.error, { status: 403 });
    }

    const res_data = await res.json();
    return NextResponse.json(res_data, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();

  try {
    const res = await fetch(`${base_url}/boards`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        id: req_data.id,
        name: req_data.name,
      }),
    });

    if (res.status === 403) {
      const errorMessage = await res.json();
      return NextResponse.json(errorMessage.error, { status: 403 });
    }

    const res_data = await res.json();
    return NextResponse.json(res_data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();
  console.log(req_data.id);

  try {
    const res = await fetch(`${base_url}/boards`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        id: req_data.id,
      }),
    });

    console.log("CODE >>", res.status);
    if (!res.ok) {
      // const errorMessage = await res.json();
      return NextResponse.json(
        // { error: errorMessage.error },
        { status: res.status }
      );
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    console.error("Error during DELETE request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
