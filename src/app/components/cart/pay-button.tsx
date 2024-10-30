'use client'

import axios from "axios"
import { useRouter } from "next/navigation"



export const PayButton = () => {

    const router = useRouter()

    const handlePayCart = async() => {
        try {
            const { data } = await axios.post('/api/create-payment')
            router.push(data.url)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <button
            onClick={ handlePayCart }
            className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full md:w-80 flex items-center justify-center"
        >
            Confirmar Pedido
        </button>
    )
}
