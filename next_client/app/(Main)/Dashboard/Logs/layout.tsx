import { ReactNode } from "react";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "T2O-Verse",
  description: "This Page Displays the Logs",
};

const LogsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Breadcrumb pageName="Logs" />
      <div className="overflow-x-scroll rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col gap-10">{children}</div>
      </div>
    </>
  );
};

export default LogsLayout;
