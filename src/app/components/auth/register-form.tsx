'use client'
import { isValidEmail } from '@/util/validator'
import axios from 'axios'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

interface FormRegisterData {
    name: string
    email: string
    password: string
    passwordConfirm :string
}
export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormRegisterData>({
        defaultValues: {
           name: '',
           email: '',
           password: '',
           passwordConfirm: '' 
        }
    })

    const passwordRef = useRef({})
    passwordRef.current = watch('password')


    const handleRegisterSubmit = async(formData: FormRegisterData) => {
        console.log(formData)
    
        // TODO: Llamar nuestro endpoint de registro

        try {
            const { data } = await axios.post('/api/register', formData)
            console.log(data)
        
        } catch (error) {
            console.log(error)
        }
        
    }




    return (
        <form
            onSubmit={ handleSubmit( handleRegisterSubmit ) }
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm">Nombre</label>
                <input
                    id="name"
                    type="text"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su nombre"
                    { ...register('name', {
                        required: 'El nombre es requerido',
                        validate: ( value )=> value.trim() === '' ? 'El nombre no tiene nada': undefined
                    })}
                />
                {
                    errors.name && (
                        <span className="text-sm text-red-600">{ errors.name.message }</span>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">Correo</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su correo"
                    { ...register('email',  {
                        required: 'El nombre es requerido',
                        validate: ( value )=> isValidEmail( value ) ? undefined : 'En correo no es valido' 
                    })}
                />
                {
                    errors.email && (
                        <span className="text-sm text-red-600">{ errors.email.message }</span>
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
                    { ...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: { value: 6, message: 'La contraseña es muy corta, min 6 caracteres' }
                    })}
                />
                {
                    errors.password && (
                        <span className="text-sm text-red-600">{ errors.password.message }</span>
                    )
                }
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-sm">Confirmar contraseña</label>
                <input
                    id="passwordConfirm"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Confirme su contraseña"
                    { ...register('passwordConfirm', {
                        required: 'La contraseña es requerida',
                        minLength: { value: 6, message: 'La contraseña es muy corta, min 6 caracteres' },
                        validate: ( value )=> value !== passwordRef.current ? 'Las caontraseñas no son iguales' : undefined
                    })}
                />
                  {
                    errors.passwordConfirm && (
                        <span className="text-sm text-red-600">{ errors.passwordConfirm.message }</span>
                    )
                }
            </div>
            <div className="mt-2">
                <button
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center"
                >
                    Crear Cuenta
                </button>
            </div>
        </form>
    )
}
