"use client";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

type FormInputs = { fullName: string; email: string; address: string; city: string; postalCode: string; country: string; };

const CheckoutForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
  const router = useRouter();
  const { items: cartItems, clearCart } = useCartStore();

  const onSubmit: SubmitHandler<FormInputs> = async (shippingAddress) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, shippingAddress }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch { /* Ignore if not JSON */ }
        throw new Error(errorMessage);
      }
      alert('Order placed successfully!');
      clearCart();
      router.push('/dashboard/orders');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
        <input {...register('fullName', { required: 'Full name is required' })} id="fullName" type="text" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
        <input {...register('email', { required: 'Email is required' })} id="email" type="email" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-300">Street Address</label>
        <input {...register('address', { required: 'Address is required' })} id="address" type="text" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
          <input {...register('city', { required: 'City is required' })} id="city" type="text" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300">Postal Code</label>
          <input {...register('postalCode', { required: 'Postal code is required' })} id="postalCode" type="text" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
          {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-300">Country</label>
        <input {...register('country', { required: 'Country is required' })} id="country" type="text" className="mt-1 block w-full rounded-md border border-border-color bg-dark-base/50 shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
        {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting || cartItems.length === 0} className="w-full rounded-md bg-light-text/90 py-3 font-bold text-dark-base transition-all hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20 disabled:cursor-not-allowed disabled:bg-gray-500">
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};
export default CheckoutForm;