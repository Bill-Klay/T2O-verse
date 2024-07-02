import React from "react";
import DefaultLayout from "@/Components/Layouts/DefaultLayout";
import Profile from "./Profile/page";
import { AuthProvider } from "@/config/context/AuthProvider";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <AuthProvider>
        <Profile />
      </AuthProvider>
    </DefaultLayout>
  );
};

export default Dashboard;
