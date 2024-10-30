
import Cart from '@/model/Cart';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server'
import Stripe from 'stripe';


if(!process.env.STRIPE_SECRET_kEY){
    throw new Error('Variabe de entorno <STRIPE_SECRET_kEY> requerida')
}

const stripe = new Stripe( process.env.STRIPE_SECRET_kEY )


export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature')

    if( !signature ){
        throw new Error('Variabe de entorno <STRIPE_SING_IN_SECRET> requerida')
    }

    if(!process.env.STRIPE_SING_IN_SECRET){
        throw new Error('Variabe de entorno <STRIPE_SING_IN_SECRET> requerida')
    }

    let ev
    try {
        ev = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SING_IN_SECRET)
    } catch (error) {
        if( error instanceof Error ){
            throw new Error(error.message)
        }else {
            throw new Error('Erro desconocido')
        }
    }

    switch (ev.type) {
        case 'checkout.session.completed':
        
            const { userId, email } = ev.data.object.metadata as { userId: string, email: string }


            //TODO: Crear una orden

            // Limpiar el carrito
            await Cart.deleteMany({ user: userId })

            // Eviar un correo con el tikect
            console.log(`Tiket enviado a ${email}`)
         

            
            // Dar acceso al usuario o darle el rol requerido

            break;
    
        default:
            console.log('Evento no encontrado')
    }



    return NextResponse.json({ msg: 'ok!' }, { status: 201 });
}





