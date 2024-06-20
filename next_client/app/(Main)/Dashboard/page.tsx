import React from "react";
import DefaultLayout from "@/Components/Layouts/DefaultLayout";
import TestComponent from "../TestComponent/page";
import Link from "next/link";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <Link href={"/TestComponent"}>goto test</Link>
    </DefaultLayout>
  );
};

export default Dashboard;
