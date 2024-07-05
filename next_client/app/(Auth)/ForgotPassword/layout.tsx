"use client";

import ToastProvider from "@/Providers/ToastProvider";
import { ReactNode } from "react";

const ForgotPassLayout = ({ children }: { children: ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default ForgotPassLayout;
