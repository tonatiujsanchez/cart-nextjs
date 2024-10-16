import { IUserRole } from "@/interface/IUser";
import jwt from 'jsonwebtoken'

export const signToken = ( _id: string, role: IUserRole ) => {

    if( !process.env.JWT_SECRET_KEY ){
        throw new Error('Variable de entorno JWT_SECRET_KEY no esta definida')
    }

    const payload = {
        _id,
        role
    }

    const token = jwt.sign( payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' } )

    return token
}

