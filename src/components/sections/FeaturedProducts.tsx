import React from 'react';
import ProductCard from '../product/ProductCard';
import productsData from '@/data/products.json';
import Link from 'next/link';

const FeaturedProducts = () => {
  const featured = productsData.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-light-text md:text-4xl">
            Explore the Collection
          </h2>
          <p className="text-lg text-gray-400">
            Handpicked for performance, designed for immersion.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/products" className="rounded-md border border-border-color px-8 py-3 font-semibold transition-all duration-300 hover:bg-border-color">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;