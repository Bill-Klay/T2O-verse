"use client";

import { AuthProvider } from "@/config/context/AuthProvider";
import LoginPage from "./(Auth)/Login/page";

export default function Home() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
