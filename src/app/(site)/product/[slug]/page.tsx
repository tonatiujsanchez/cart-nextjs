import { AddProducToCart } from "@/app/components/products/add-product-to-cart";
import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string
    }
}
export default function ProductDetailsPage({ params }: Props) {

    const product = products.find(product => product.slug === params.slug)

    if (!product) {
        notFound()
    }


    return (
        <main>
            <div className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <figure>
                    <Image
                        src={`/products/${product.images[0]}`}
                        alt={product.title}
                        width={700}
                        height={700}
                        className="bg-gray-200"
                    />
                </figure>
                <div>
                    <h1 className="text-4xl font-black mb-4">{product.title}</h1>
                    <p className="text-2xl font-bold mb-5">${product.price}.00</p>

                    
                    <AddProducToCart product={ product } >
                        <div>
                            {product.description}
                        </div>
                    </AddProducToCart>
                </div>
            </div>
        </main>
    );
}