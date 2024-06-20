"use client";

// import { AuthProvider } from "@/config/context/AuthProvider";
import ToastProvider from "@/Providers/ToastProvider";
import { ReactNode } from "react";

const LoginSignupLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
    // </AuthProvider>
  );
};

export default LoginSignupLayout;
