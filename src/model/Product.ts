import { IProduct } from "@/interface/IProduct";
import { model, Model, models, Schema } from "mongoose";



const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    sizes: [{
        type: String,
        required: true,
        enum: {
            values: ['CH', 'M', 'G', 'EG', '4', '6', '8', '10'],
            message: '{VALUE} no es una talla permitida'
        }
    }],
    images:[{
        type: String,
        required: true
    }]
})

const Product:Model<IProduct> = models.Product || model('Product', productSchema)

export default Product
