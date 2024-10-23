'use client'
import axios from "axios"
import { setCookie } from "cookies-next"
import { login } from "./auth/authSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppDispatch } from "./store"
import { startLogout } from "./auth/authThunks"
import { useRouter } from "next/navigation"

export const InitializerState = () => {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const validateSession = async() => {
        try {
            
            const { data } = await axios('/api/validate-session')
            
            setCookie('session-cart-next', data.token )

            dispatch( login( data.user ) )

        } catch (error) {
            dispatch( startLogout() )
            router.refresh()
        }
    }

    useEffect(()=>{
        validateSession()
    },[])


    return null
}
