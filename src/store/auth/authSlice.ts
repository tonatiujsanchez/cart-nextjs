import { IAuthStatus, IUserRole } from "@/interface/IUser";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    status: IAuthStatus,
    user?:{
        name: string
        email: string,
        role: IUserRole
    }
}

const initialState:InitialState = {
    status: "checking",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: ( state, action )=> {
            state.status = 'authenticated'
            state.user = action.payload
        },
        logout: (state) => {
            state.status = 'not_authenticated'
            state.user = undefined
        }
    }
})


export const { login, logout } = authSlice.actions

export default authSlice.reducer