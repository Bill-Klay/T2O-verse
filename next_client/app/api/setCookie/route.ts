// // app/api/set-cookie/route.js
// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET(request: NextRequest) {
//   const cookie = cookies().get("session");
//   const response = NextResponse.json({ message: "Cookie has been set" });
//   response.cookies.set("panini", `${cookie?.value}`, {
//     httpOnly: false,
//     path: "/",
//   });
//   console.log("DATA", response.headers.getSetCookie());
//   return response;
// }
