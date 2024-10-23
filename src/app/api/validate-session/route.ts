
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import * as jose from 'jose'
import { connectDB } from '@/libs/mongodb';
import User from '@/model/User';
import { signToken } from '@/util/jwt';


export async function GET() { 

    const cookieStore = cookies()
    const token = cookieStore.get('session-cart-next')

    if(!token){
        return NextResponse.json({ msg: 'Sesión no valida' }, { status: 400 })
    }


    let userId
    try {
        
        const { payload } = await jose.jwtVerify( token.value, new TextEncoder().encode( process.env.JWT_SECRET_KEY ) )            
        userId = payload._id

    } catch (error) {
        return NextResponse.json({ msg: 'Sesión no valida' }, { status: 400 })
    }

    try {
        await connectDB()

        const user = await User.findById(userId)

        if( !user ){
            return NextResponse.json({ msg: 'Sesión no valida' }, { status: 400 })
        }

        const token = signToken( user._id, user.role )

        return NextResponse.json({
            token,
            user: {
                name : user.name,
                email: user.email,
                role : user.role,
            }
        })        
    } catch (error) {
        return NextResponse.json({ msg: 'Sesión no valida' }, { status: 400 })
    }
}