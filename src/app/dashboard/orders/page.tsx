"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrderItem { productId: number; title: string; price: number; quantity: number; thumbnail: string; }
interface Order { _id: string; items: OrderItem[]; totalAmount: number; status: string; createdAt: string; }

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders.');
        setOrders(await response.json());
      } catch (err: any) { setError(err.message); } 
      finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading your orders...</div>;
  if (error) return <div className="py-24 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto min-h-screen px-4 py-24">
      <div className="mb-12 text-center"><h1 className="text-4xl font-bold text-light-text">Your Order History</h1></div>
      {orders.length === 0 ? (
        <p className="text-center text-gray-400">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="rounded-lg border border-border-color bg-black/20 p-6 backdrop-blur-sm">
              <div className="mb-4 flex justify-between border-b border-border-color pb-4">
                <div>
                  <p className="font-semibold">Order ID: <span className="text-gray-400">{order._id}</span></p>
                  <p className="text-sm text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Total: <span className="text-light-text">${order.totalAmount.toFixed(2)}</span></p>
                  <p className="text-right text-sm text-brand-accent">{order.status}</p>
                </div>
              </div>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md bg-white/10"><Image src={item.thumbnail} alt={item.title} layout="fill" objectFit="contain" className="p-1" /></div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OrdersPage;