import type { Metadata } from "next";
import { AuthProvider } from "@/config/context/AuthProvider";
import ToastProvider from "@/Providers/ToastProvider";

import "@/css/satoshi.css";
import "@/css/style.css";

export const metadata: Metadata = {
  title: "T2O-Verse",
  description: "Product by T2O-Verse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
