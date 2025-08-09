"use client";
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

type FormInputs = { email: string; password: string; };

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed.');
      }
      setUser(responseData.user);
      router.push('/');
    } catch (error: any) {
      alert(`Login Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
        <input {...register('email', { required: 'Email is required' })} id="email" type="email" disabled={isSubmitting} className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent disabled:opacity-50" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
        <input {...register('password', { required: 'Password is required' })} id="password" type="password" disabled={isSubmitting} className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent disabled:opacity-50" />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-light-text/90 py-3 font-bold text-dark-base transition-all hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20 disabled:cursor-not-allowed disabled:bg-gray-500">
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
      <p className="text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-brand-accent hover:underline">Sign up</Link>
      </p>
    </form>
  );
};
export default LoginForm;