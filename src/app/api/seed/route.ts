import { products } from '@/data/products'
import { connectDB } from '@/libs/mongodb'
import Product from '@/model/Product'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {


    await connectDB()
    await Product.deleteMany()
    await Product.insertMany(products)




    return NextResponse.json({ msg: 'OK! ✅' }, { status: 201 })
}