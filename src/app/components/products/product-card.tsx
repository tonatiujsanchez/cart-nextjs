import { IProduct } from "@/interface/IProduct"
import Image from "next/image"
import Link from "next/link"

interface Props {
    product: IProduct
}

export const ProductCard = ({ product }:Props) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <figure className="aspect-square overflow-hidden group">
                {/* <img
            src={`/products/${product.images[0]}`}
            alt={product.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-all"
          /> */}
                <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={600}
                    height={600}
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
        </Link>
    )
}


