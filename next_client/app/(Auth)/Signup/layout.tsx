"use client";

import ToastProvider from "@/Providers/ToastProvider";
import { ReactNode } from "react";

const SignupLayout = ({ children }: { children: ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default SignupLayout;
