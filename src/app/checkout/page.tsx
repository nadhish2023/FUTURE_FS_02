"use client";
import CheckoutForm from "@/components/forms/CheckoutForm";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

const CheckoutPage = () => {
  const { items } = useCartStore();
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto min-h-screen px-4 py-24">
      <div className="mb-12 text-center"><h1 className="text-4xl font-bold text-light-text">Checkout</h1></div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="rounded-lg border border-border-color bg-black/20 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-semibold">Shipping Information</h2>
          <CheckoutForm />
        </div>
        <div>
          <div className="sticky top-24 rounded-lg border border-border-color bg-black/20 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold">Your Order</h2>
            <div className="mb-6 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md bg-white/10"><Image src={item.thumbnail} alt={item.title} layout="fill" objectFit="contain" className="p-1"/></div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border-color pt-4">
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;