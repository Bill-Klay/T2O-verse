import type { Metadata } from "next";
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
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </body>
    </html>
  );
}
