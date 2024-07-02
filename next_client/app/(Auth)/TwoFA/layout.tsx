import { AuthProvider } from "@/config/context/AuthProvider";
import ToastProvider from "@/Providers/ToastProvider";

export default function TwoFALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
