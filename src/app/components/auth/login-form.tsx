'use client'

import { login } from "@/store/auth/authSlice"
import { AppDispatch } from "@/store/store"
import axios from "axios"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

interface FormLoginData {
    email: string
    password: string
}

export const LoginForm = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<FormLoginData>()
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const handleLoginSubmit = async(formData: FormLoginData) => {

        try {
            
            const { data } = await axios.post('/api/login', formData )
            
            // Guardar en nuestras cookies el token
            setCookie('session-cart-next', data.token )

            // Hacer el dispatch del usuario autenticado
            dispatch( login( data.user ) )

            router.push('/')
            router.refresh()

        } catch (error) {
            if( axios.isAxiosError(error) ){
                const msg = error.response?.data.msg
                console.log(msg)
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">Correo</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su correo"
                    {...register('email', {
                        required: 'El correo en requerido'
                    })}
                />
                {
                    errors.email && (
                        <span className="text-sm text-red-600">{errors.email.message}</span>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su contraseña"
                    {...register('password', {
                        required: 'La contraseña es requerida'
                    })}
                />
                {
                    errors.password && (
                        <span className="text-sm text-red-600">{errors.password.message}</span>
                    )
                }
            </div>
            <div className="mt-2">
                <button
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>
    )
}
