// /category/:id
// /category/:category

import { ProductCard } from "@/app/components/products/product-card";
import { categories } from "@/constant/categories";
import { connectDB } from "@/libs/mongodb";
import Product from "@/model/Product";
import { notFound } from "next/navigation";

interface Prop {
    params: {
        category: string
    }
}
export default async function CategoryPage({ params }: Prop) {

    const categoryBySlug = categories.find(category => category.slug === params.category)

    if (!categoryBySlug) {
        notFound()
    }

    await connectDB()
    const productsByCategory = await Product.find({ category: params.category })

    return (
        <main className="py-10 container">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                {
                    productsByCategory.map(product => (
                        <ProductCard
                            key={product.slug}
                            product={ product }
                        />
                    ))
                }
            </section>
        </main>
    );
}