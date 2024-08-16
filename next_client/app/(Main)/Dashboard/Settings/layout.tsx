import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { ReactNode } from "react";
import ToastProvider from "@/Providers/ToastProvider";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Settings" />
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
};

export default SettingsLayout;
