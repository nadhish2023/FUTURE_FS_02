"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      alert('Registration successful! Please sign in.');
      router.push('/login');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
        <input
          {...register('fullName', { required: 'Full name is required' })}
          id="fullName"
          type="text"
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent disabled:opacity-50"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
        <input
          {...register('email', { 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
          id="email"
          type="email"
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent disabled:opacity-50"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
        <input
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          id="password"
          type="password"
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent disabled:opacity-50"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-light-text/90 py-3 font-bold text-dark-base transition-all hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20 disabled:cursor-not-allowed disabled:bg-gray-500">
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-brand-accent hover:underline">Sign in</Link>
      </p>
    </form>
  );
};
export default RegisterForm;