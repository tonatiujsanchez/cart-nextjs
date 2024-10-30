import { ICart } from "@/interface/ICart"
import { IProduct } from "@/interface/IProduct"
import Image from "next/image"
import { MdAdd, MdClose, MdRemove } from "react-icons/md"


interface Props {
    cartItem: ICart
}
export const ProducItemICart = ({ cartItem }: Props) => {

    const { quantity, size } = cartItem
    const product = cartItem.product as IProduct

    const totalPerProduct = product.price * quantity

    return (
        <li key={product.slug} className="relative py-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 px-2">
            <Image
                src={`/products/${product.images[0]}`}
                alt={product.title}
                width={150}
                height={150}
                className="h-24 w-24 object-cover rounded-md"
                priority
            />
            <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate">{product.title}</p>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Talla: {size}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button
                    className="inline-flex items-center justify-center border rounded-md text-sm aspect-square p-2 hover:bg-gray-200"
                >
                    <MdRemove className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                    className="inline-flex items-center justify-center border rounded-md text-sm aspect-square p-2 hover:bg-gray-200"
                >
                    <MdAdd className="h-4 w-4" />
                </button>
            </div>
            <div className="text-lg font-medium text-gray-900 w-24 text-right">
                { totalPerProduct }
            </div>
            <button
                className="absolute -top-3 right-3 sm:static inline-flex items-center justify-center rounded-md aspect-square p-2 hover:bg-gray-100 text-gray-500 hover:text-red-700"
            >
                <MdClose className="h-5 w-5" />
            </button>
        </li>
    )
}
