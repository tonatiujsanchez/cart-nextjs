import { IProduct } from "./IProduct"

export interface ICart {
    _id: string
    user: string
    product: string | IProduct
    quantity: number
    size: string
} 