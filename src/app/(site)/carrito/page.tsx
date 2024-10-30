import { ProducItemICart } from "@/app/components/products/product-item-cart";
import Cart from "@/model/Cart";
import { cookies } from "next/headers";
import * as jose from 'jose'
import { notFound } from "next/navigation";
import { IProduct } from "@/interface/IProduct";
import { PayButton } from "@/app/components/cart/pay-button";


export default async function CartPage() {

    const token = await cookies().get('session-cart-next')    

    if( !token ){
        notFound()
    }

    const session = await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )
    

    
    const cart = await Cart.find({ user: session.payload._id })
        .populate('product', 'title price inStock images')

    console.log(cart)

    const subTotal = cart.reduce( (acc, cartItem) => {
        const totalPerProduct = cartItem.quantity * (cartItem.product as IProduct).price
        return totalPerProduct + acc
    },0)
    
    const tax = subTotal * 0.16

    const totalToPay = subTotal + tax


    if( cart.length === 0 ){
        return (
            <h1>Tu carrito esta vacío :(</h1>
        )
    }
    



    return (
        <main className="container py-10">
            <h1 className="text-3xl font-bold mb-5 md:mb-10">Mi carrito</h1>
            <ul className="divide-y divide-gray-200">
                {
                    cart.map( cartItem => (
                        <ProducItemICart
                            key={cartItem._id} 
                            cartItem={cartItem}
                        />
                    ))
                }
                
            </ul>
            <hr />
            <div className="py-3 flex flex-col gap-3 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Subtotal</span>
                    <span className="font-semibold">{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">IVA (16%)</span>
                    <span className="font-semibold">{tax.toFixed(2)}</span>
                </div>
            </div>
            <hr />
            <div className="py-4 flex justify-between items-center px-2">
                <span className="text-xl font-bold uppercase">Total</span>
                <span className="text-2xl font-bold">{totalToPay.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex md:justify-end">
                <PayButton />
            </div>
        </main>
    );
}