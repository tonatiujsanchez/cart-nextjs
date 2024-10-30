import { NextResponse } from 'next/server'
import Cart from "@/model/Cart"
import * as jose from 'jose'
import { cookies } from "next/headers"

import Stripe from 'stripe';
import { ICart } from '@/interface/ICart';
import { IProduct } from '@/interface/IProduct';
import User from '@/model/User';


if(!process.env.STRIPE_SECRET_kEY){
    throw new Error('Variabe de entorno <STRIPE_SECRET_kEY> requerida')
}

const stripe = new Stripe( process.env.STRIPE_SECRET_kEY )

type LineItems = Stripe.Checkout.SessionCreateParams.LineItem 

const formatProductLineItems = ( cart:ICart[] ):LineItems[] => {

    const elementsToPay:LineItems[] = []

    cart.forEach((cartItem)=> {

        const product = cartItem.product as IProduct
        const lineItem:LineItems = {
            price_data: {
                currency: 'mxn',
                product_data: {
                    name: `${product.title} - ${ cartItem.size }`,
                    description: product.description,
                    images: [`${process.env.BASE_URL}/products/${ product.images[0]}`]
                },
                unit_amount: Number( (product.price * 100).toFixed(2) )
            },
            quantity: cartItem.quantity,
        }

        elementsToPay.push(lineItem)
    })

    return elementsToPay
}


export async function POST() {

    // Cerificamos la sesion
    const token = await cookies().get('session-cart-next')    
    
    if( !token ){
        return console.log('Token no encontrado')
    }
    const sessionAuth = await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )
    
    // obtenemos el usuario
    const user = await User.findById(sessionAuth.payload._id)

    if(!user){
        return NextResponse.json({ msg: 'Usuario no encontrado' }, { status: 400 });
    }


    // Consultamos el carrito del usuario actual
    const cart = await Cart.find({ user: sessionAuth.payload._id })
        .populate('product', 'title description images price')

    if( cart.length === 0 ){
        return NextResponse.json({ msg: 'No hay productos agregados al carrito' }, { status: 400 });
    }

    // Creamos una session de pago
    const session = await stripe.checkout.sessions.create({
        success_url: `${ process.env.BASE_URL }/checkout/success`,
        line_items:formatProductLineItems(cart),
        mode: 'payment',
        metadata: {
            userId: String(sessionAuth.payload._id),
            email: user.email
        }
    })
   
    
    return NextResponse.json(session, { status: 201 });
}