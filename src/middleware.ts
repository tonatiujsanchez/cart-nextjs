import { NextRequest, NextResponse } from 'next/server'

const roleUsers = ['client', 'admin']

// This function can be marked `async` if using `await` inside
export function middleware(request:NextRequest) {
  

    if(request.nextUrl.pathname.startsWith('/nosotros')) {
        
        
        const payload = 'admin'
    
        if( roleUsers.includes(payload) ){
            return NextResponse.next()
        }else {
            return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
        }
    }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/nosotros/:path*',
}