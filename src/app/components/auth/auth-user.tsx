'use client'
import { startLogout } from "@/store/auth/authThunks"
import { AppDispatch, AppStore } from "@/store/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"



export const AuthUser = () => {

    const { user, status } = useSelector( (state:AppStore)=> state.auth )
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()


    const handleLogout = () => {
        dispatch(startLogout())
        router.refresh()
    }


    if( status === 'checking' ){
        return(
            <div className="bg-gray-100 w-16 h-6"></div>
        )
    }

    if( user ){
        return (
            <li className="flex items-center gap-4">
                <span>{ user.name }</span>
                <button
                    onClick={ handleLogout }
                    className="text-red-600"
                >
                    Salir
                </button>
            </li>
        )
    }

    return (
        <li>
            <Link href="/iniciar-sesion">Ingresar</Link>
        </li>
    )
}
