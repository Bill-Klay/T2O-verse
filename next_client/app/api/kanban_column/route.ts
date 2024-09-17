import { base_url } from "@/lib/Constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = cookies().get("session");
  const CSRFToken = cookies().get("X-CSRFToken");
  const req_data = await req.json();

  try {
    const res = await fetch(`${base_url}/boards/${req_data.board_id}/columns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        name: req_data.name,
        position: req_data.position,
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
    const res = await fetch(`${base_url}/boards/${req_data.board_id}/columns`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${session?.name}=${session?.value}`,
        "X-CSRFToken": `${CSRFToken?.value}`,
      },
      body: JSON.stringify({
        id: req_data.id,
        name: req_data.name,
        position: req_data.id,
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

  try {
    const res = await fetch(`${base_url}/boards/${req_data.board_id}/columns`, {
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

    if (res.status === 403) {
      const errorMessage = await res.json();
      return NextResponse.json(errorMessage.error, { status: 403 });
    }

    return NextResponse.json({ status: 204 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
