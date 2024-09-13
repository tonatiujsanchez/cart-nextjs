import { products } from '@/data/products';
import Image from 'next/image';


export default function Home() {

  return (
    <>
      <main className="py-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {
            products.map(product => (
              <div key={product.slug}>
                <figure className="aspect-square overflow-hidden group">
                  {/* <img
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-all"
                  /> */}
                  <Image
                      src={`/products/${product.images[0]}`}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-all"
                  />
                </figure>
                <div className="pt-2">
                  <p className="font-bold mb-2">{product.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold">${product.price}</p>
                    <div className="flex items-center gap-3">
                      {product.sizes.map(size => (
                        <span key={size} className="text-gray-500 font-semibold">{size}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </section>
      </main>
    </>
  );
}
