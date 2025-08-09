"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type User = {
  id: string;
  fullName: string;
  email: string;
} | null;

const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const { user, setUser } = useAuthStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedUser: any = jwtDecode(token);
        setUser({
          id: decodedUser.id,
          fullName: decodedUser.fullName,
          email: decodedUser.email,
        });
      } catch (error) {
        console.error("Failed to decode token on initial load:", error);
        setUser(null);
      }
    }
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsMenuOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black/30 backdrop-blur-md border-b border-border-color">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        <Link href="/" className="text-xl font-bold text-light-text">
          EchoPulse
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          {user && (
            <Link href="/dashboard/orders" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              My Orders
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          <Link href="/cart" className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-brand-accent text-xs text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-300">Welcome, {user.fullName.split(' ')[0]}</span>
                <button onClick={handleLogout} className="bg-dark-base/50 border border-border-color px-4 py-2 text-sm font-medium rounded-md hover:bg-border-color transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-dark-base/50 border border-border-color px-4 py-2 text-sm font-medium rounded-md hover:bg-border-color transition-colors">
                Login
              </Link>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-light-text"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-dark-base/90 backdrop-blur-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="text-lg text-light-text hover:text-brand-accent">
              Products
            </Link>
            <Link href="/features" onClick={() => setIsMenuOpen(false)} className="text-lg text-light-text hover:text-brand-accent">
              Features
            </Link>
            <Link href="/#about" onClick={() => setIsMenuOpen(false)} className="text-lg text-light-text hover:text-brand-accent">
              About
            </Link>
            {user && (
              <Link href="/dashboard/orders" onClick={() => setIsMenuOpen(false)} className="text-lg text-light-text hover:text-brand-accent">
                My Orders
              </Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="text-lg text-brand-accent hover:underline">
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-lg text-brand-accent hover:underline">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;