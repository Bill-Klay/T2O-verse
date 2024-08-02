import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { ReactNode } from "react";
import ToastProvider from "@/Providers/ToastProvider";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Settings" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ToastProvider>{children}</ToastProvider>
      </div>
    </div>
  );
};

export default SettingsLayout;
