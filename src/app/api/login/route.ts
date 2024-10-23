
import { connectDB } from '@/libs/mongodb'
import User from '@/model/User'
import { isValidEmail } from '@/util/validator'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs';
import { signToken } from '@/util/jwt';


export async function POST(req: NextRequest) {
   
    const { email="", password="" } = await req.json()


    if( email.trim() === '' ){
        return NextResponse.json({msg: 'Correo y/o Contraseña invalidas'},  { status: 400 })
    }

    if( !isValidEmail(email) ){
        return NextResponse.json({ msg: 'Correo y/o Contraseña invalidas' }, { status: 400 })
    }

    if( password.trim() === '' ){
        return NextResponse.json({msg: 'Correo y/o Contraseña invalidas'},  { status: 400 })
    }

    if( password.trim().length < 6 ){
        return NextResponse.json({ msg: 'Correo y/o Contraseña invalidas' }, { status: 400 })
    }

    try {
        
        await connectDB()

        const user = await User.findOne({ email })

        if( !user ){
            return NextResponse.json({ msg: 'Correo y/o Contraseña invalidas' }, { status: 400 })
        }

        const isValidPassword = bcryptjs.compareSync( password, user.password )

        if( !isValidPassword ){
            return NextResponse.json({ msg: 'Correo y/o Contraseña invalidas' }, { status: 400 })
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

        console.log(error)
        return NextResponse.json({ msg: 'Hubo un error en el servidor' }, { status: 500 })
    }
}