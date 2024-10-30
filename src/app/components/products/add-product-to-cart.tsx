"use client"

import { addProducToCart } from "@/actions/cart"
import { IProduct } from "@/interface/IProduct"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface Props {
    children: React.ReactNode
    product: IProduct
}
export const AddProducToCart = ({ children, product }: Props) => {

    const [sizeSelected, setSizeSelected] = useState<string>('')
    const [quantity, setQuantity] = useState(1)
    const router = useRouter()


    const handleSetAddQuantity = () => {
        if( quantity < product.inStock ){
            setQuantity( quantity + 1 )
        }
    }

    const handleSetRemoveQuantity = ()=> {
        if( quantity > 1 ){
            setQuantity( quantity - 1 )
        }
    }

    const handleAddProductToCard = async() => {

        if( sizeSelected === '' ){
            return console.log('Seleccione una talla')
        }

        console.log({
            quantity,
            size: sizeSelected
        })

        await addProducToCart( product._id!, quantity, sizeSelected )
        router.refresh()
    }

    return (
        <div>
            <div className="mb-5 flex items-center gap-2">
                {
                    product.sizes.map(size => (
                        <button
                            key={size}
                            className={`px-4 py-2 border rounded-sm ${sizeSelected === size ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'}`}
                            onClick={() => setSizeSelected(size)}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={ handleSetRemoveQuantity } 
                    className="px-4 border rounded-md hover:bg-slate-200"
                >
                    -
                </button>
                <span>{ quantity }</span>
                <button 
                    onClick={ handleSetAddQuantity }
                    className="px-4 border rounded-md hover:bg-slate-200"
                >
                    +
                </button>
            </div>

            <div className="py-4">
                { children }
            </div>

            <button
                onClick={ handleAddProductToCard }
                className="bg-orange-600 text-white px-5 py-3 rounded-md font-bold"
            >
                Agregar al carrito
            </button>
        </div>
    )
}
