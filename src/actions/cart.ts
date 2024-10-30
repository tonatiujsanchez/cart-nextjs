'use server'

import Cart from "@/model/Cart"
import * as jose from 'jose'
import { cookies } from "next/headers"



export const addProducToCart = async( idProduct:string, quantity:number, size:string ) =>{
    
    const token = await cookies().get('session-cart-next')    

    if( !token ){
        return console.log('Token no encontrado')
    }
    const session = await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )
    

    try {
        
        const cartDB = await Cart.findOne({ 
            user: session.payload._id,
            size: size,
            product: idProduct
        })

        if(cartDB){
            // Actualizar
            cartDB.quantity = cartDB.quantity + quantity
            await cartDB.save()
        }else {
            // Crear
            await Cart.create({
                user: session.payload._id,
                product: idProduct,
                quantity,
                size
            })
        }

    } catch (error) {
        console.log(error)
    }


}