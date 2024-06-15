import LoginSignupLayout from "./(Auth)/LoginSignup/layout";
import LoginSignupPage from "./(Auth)/LoginSignup/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-normal-2">
      <LoginSignupLayout>
        <LoginSignupPage />
      </LoginSignupLayout>
    </main>
  );
}
