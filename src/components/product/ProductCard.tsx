"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

type ProductCardProps = { id: number; title: string; price: number; thumbnail: string; };

const ProductCard = ({ id, title, price, thumbnail }: ProductCardProps) => {
  const addItemToCart = useCartStore((state) => state.addItem);
  const handleAddToCart = () => { addItemToCart({ id, title, price, thumbnail }); };

  return (
    <div data-aos="fade-up" className="group rounded-lg border border-border-color bg-black/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/50">
      <Link href={`/products/${id}`} className="block overflow-hidden">
        <div className="relative mb-4 h-48 w-full rounded-md bg-white/5">
          <Image src={thumbnail} alt={title} layout="fill" objectFit="contain" className="p-4 transition-transform duration-500 ease-in-out group-hover:scale-105" />
        </div>
        <h3 className="truncate font-semibold text-light-text">{title}</h3>
        <p className="mt-2 text-xl font-bold text-gray-300">${price.toFixed(2)}</p>
      </Link>
      <button onClick={handleAddToCart} className="mt-4 w-full rounded-md bg-light-text/90 py-2 font-semibold text-dark-base transition-all duration-300 hover:bg-light-text hover:shadow-lg hover:shadow-brand-accent/20">
        Add to Cart
      </button>
    </div>
  );
};
export default ProductCard;