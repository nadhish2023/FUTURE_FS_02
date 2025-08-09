import ProductCard from '@/components/product/ProductCard';
import productsData from '@/data/products.json';

const ProductsPage = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="mb-16 text-center">
        <h1 className="mb-2 text-4xl font-bold text-light-text">Our Collection</h1>
        <p className="text-lg text-gray-400">Discover technology forged in the cosmos.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductsPage;