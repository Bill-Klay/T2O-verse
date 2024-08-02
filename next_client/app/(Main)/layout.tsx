import { ReactNode } from "react";
import { cookies } from "next/headers";
import { base_url } from "@/lib/Constants";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = cookies().get("session");
  if (session) {
    const res = await fetch(`${base_url}/check_auth_status`, {
      method: "GET",
      headers: {
        Cookie: `${session.name}=${session.value}`,
      },
    });

    const result = await res.json();
    if (result.success) {
      return <>{children}</>;
    } else {
      redirect("/");
    }
  } else {
    redirect("/");
  }
};

export default MainLayout;
