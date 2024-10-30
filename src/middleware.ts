import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'


// This function can be marked `async` if using `await` inside
export async function middleware(request:NextRequest) {
  

    const cookieStore = cookies()
    const token = cookieStore.get('session-cart-next')

    const { protocol, host } = request.nextUrl


    if(request.nextUrl.pathname.startsWith('/carrito')) {
        

        if( !token ){
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        
        try {
            await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )
            return NextResponse.next()
        } catch (error) {
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)           
        }        
    }


    if( 
        request.nextUrl.pathname.startsWith('/iniciar-sesion') || 
        request.nextUrl.pathname.startsWith('/crear-cuenta')
    ){

        if( !token ){
            return NextResponse.next()
        }

        try {
            await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )
            return NextResponse.redirect(`${protocol}//${host}`)           
        } catch (error) {
            return NextResponse.next()
        }
    }

    

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [ 
     '/carrito',
     '/iniciar-sesion',
     '/crear-cuenta'
   ],
}