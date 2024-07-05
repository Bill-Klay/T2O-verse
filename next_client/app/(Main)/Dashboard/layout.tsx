import DefaultLayout from "@/Components/Layouts/DefaultLayout";
import { AuthProvider } from "@/config/context/AuthProvider";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DefaultLayout>
      <AuthProvider>{children}</AuthProvider>
    </DefaultLayout>
  );
};

export default DashboardLayout;
