import ToastProvider from "@/Providers/ToastProvider";

const LoginSignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default LoginSignupLayout;
