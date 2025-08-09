"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import productsData from '@/data/products.json';
import { useCartStore } from '@/store/useCartStore';

const ProductDetailPage = () => {
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  const product = productsData.find(p => p.id === id);
  const addItemToCart = useCartStore((state) => state.addItem);

  if (!product) {
    return <p className="py-24 text-center">Product not found.</p>;
  }

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="container mx-auto min-h-screen px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="rounded-lg border border-border-color bg-black/20 p-8 backdrop-blur-sm">
          <div className="relative h-96 w-full">
            <Image src={product.thumbnail} alt={product.title} layout="fill" objectFit="contain" />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-bold text-light-text">{product.title}</h1>
          <p className="mb-6 leading-relaxed text-gray-400">{product.description}</p>
          <div className="mb-8 text-3xl font-bold text-light-text">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-4">
            <button onClick={handleAddToCart} className="w-full rounded-md bg-light-text/90 py-3 font-semibold text-dark-base transition-all duration-300 hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20">Add to Cart</button>
            <Link href="/products" className="w-full rounded-md border border-border-color py-3 text-center font-semibold transition-all duration-300 hover:bg-border-color">Back to Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;