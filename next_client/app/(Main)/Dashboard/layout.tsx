import DefaultLayout from "@/Components/Layouts/DefaultLayout";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default DashboardLayout;
