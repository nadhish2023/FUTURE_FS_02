import RegisterForm from "@/components/forms/RegisterForm";
const RegisterPage = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md space-y-8 rounded-lg border border-border-color bg-black/20 p-8 backdrop-blur-sm">
      <h1 className="text-center text-2xl font-bold text-light-text">Create Your Account</h1>
      <RegisterForm />
    </div>
  </div>
);
export default RegisterPage;