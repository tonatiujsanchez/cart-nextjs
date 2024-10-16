import { connectDB } from '@/libs/mongodb';
import User from '@/model/User';
import { isValidEmail } from '@/util/validator';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { signToken } from '@/util/jwt';

export async function POST( request:NextRequest ){
    
    const { name='', email='', password } = await request.json()


    if( name.trim() === '' ){
        return NextResponse.json({ msg: 'El nombre es requerido' }, { status: 400 })
    }

    if( email.trim() === '' ){
        return NextResponse.json({ msg: 'El email es requerido' }, { status: 400 })
    }

    if( !isValidEmail(email) ){
        return NextResponse.json({ msg: 'El email no es válido' }, { status: 400 })
    }

    if( password.trim() === '' ){
        return NextResponse.json({ msg: 'El password es requerido' }, { status: 400 })
    }

    if( password.trim().length < 6 ){
        return NextResponse.json({ msg: 'El password es requerido' }, { status: 400 })
    }

    try {
        await connectDB()

        const user = await User.findOne({ email })

        if( user ){
            return NextResponse.json({ msg: 'El correo ya esta en uso' }, { status: 400 })
        }

        // Encriptar contaseña
        const encrytedPassword = bcryptjs.hashSync (password)

        const newUser = new User({
            name,
            email, 
            password: encrytedPassword
        })

        await newUser.save()

        // Aquí asignar un token y pone el confirm en false

        //  Enviar un correo de confirmación
    
        
        // Crear un token de sesión 
        const token = signToken( newUser._id, newUser.role )

        return NextResponse.json({
            token,
            user: {
                name : newUser.name,
                email: newUser.email,
                role : newUser.role,
            }
        }, { status: 201 })
        
    } catch (error) {
        return NextResponse.json({ msg: 'Hubo un error en el servidor' }, { status: 500 })
    }    

}











