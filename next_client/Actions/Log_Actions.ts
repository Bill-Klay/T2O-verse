"use server";

import { cookies } from "next/headers";

type Props = {
  page: number;
  per_page: number;
};

export const getLogsAction = async ({ page, per_page }: Props) => {
  const session = cookies().get("session");
  const response = await fetch(
    `http://192.168.100.167:5000/logs?page=${page}&per_page=${per_page}`,
    {
      method: "GET",
      headers: {
        Cookie: `${session?.name}=${session?.value}`,
        "Content-Type": "application/json",
      },

      cache: "no-store",
    }
  );
  const data = await response.json();
  console.log(data.total_pages);
  return data;
};
