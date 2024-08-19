import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { ReactNode } from "react";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Settings" />
      {children}
    </div>
  );
};

export default SettingsLayout;
