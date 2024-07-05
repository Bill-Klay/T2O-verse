"use client";

import ToastProvider from "@/Providers/ToastProvider";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default LoginLayout;
