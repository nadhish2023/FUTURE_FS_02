import LoginForm from "@/components/forms/LoginForm";
const LoginPage = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md space-y-8 rounded-lg border border-border-color bg-black/20 p-8 backdrop-blur-sm">
      <h1 className="text-center text-2xl font-bold text-light-text">Sign In to EchoPulse</h1>
      <LoginForm />
    </div>
  </div>
);
export default LoginPage;