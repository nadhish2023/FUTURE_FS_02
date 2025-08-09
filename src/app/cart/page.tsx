"use client";
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto min-h-screen px-4 py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-light-text">Your Cart</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>Your cart is empty.</p>
          <Link href="/products" className="mt-4 inline-block text-brand-accent transition-colors hover:text-light-text">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-border-color bg-black/20 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-md bg-white/10"><Image src={item.thumbnail} alt={item.title} layout="fill" objectFit="contain" className="p-2"/></div>
                  <div>
                    <h3 className="font-semibold text-light-text">{item.title}</h3>
                    <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-md border border-border-color px-2 py-1 hover:bg-border-color">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-md border border-border-color px-2 py-1 hover:bg-border-color">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border-color bg-black/20 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-semibold text-light-text">Order Summary</h2>
              <div className="mb-2 flex justify-between text-gray-400"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="mb-4 flex justify-between text-gray-400"><span>Shipping</span><span>FREE</span></div>
              <div className="my-4 border-t border-border-color"></div>
              <div className="flex justify-between text-xl font-bold text-light-text"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
              <Link href="/checkout" className="mt-6 block w-full rounded-md bg-light-text/90 py-3 text-center font-semibold text-dark-base transition-all duration-300 hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;