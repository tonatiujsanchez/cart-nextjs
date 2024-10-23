import { Dispatch } from "@reduxjs/toolkit"
import { deleteCookie } from "cookies-next"
import { logout } from "./authSlice"


export const startLogout = () => {
    return ( dispatch:Dispatch )=> {

        deleteCookie('session-cart-next')
        dispatch( logout() )
    }
}