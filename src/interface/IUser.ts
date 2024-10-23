export interface IUser {
    _id?    : string

    name    : string
    email   : string
    password: string

    photo?: string
    role  : IUserRole // 'client | 'admin' | 'super-admin

    token  : string | null
    confirm: boolean

    createdAt?: string
    updatedAt?: string
}

export type IUserRole = 'client' | 'admin' | 'super-admin'


export type IAuthStatus = 'authenticated' | 'not_authenticated' | 'checking'