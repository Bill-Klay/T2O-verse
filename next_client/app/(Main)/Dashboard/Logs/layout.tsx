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
      <Breadcrumb pageName="Tables" />
      <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Logs
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                ID
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Timestamp
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Log Level
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Message
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Client IP
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                User Agent
              </h5>
            </div>
          </div>
          <div className="flex flex-col gap-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LogsLayout;
