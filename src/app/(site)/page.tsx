import { products } from '@/data/products';
import { ProductCard } from '../components/products/product-card';


export default function Home() {

  return (
    <>
      <main className="py-10 container">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {
            products.map(product => (
              <ProductCard
                key={ product.slug }
                product={ product }
              />
            ))
          }
        </section>
      </main>
    </>
  );
}
