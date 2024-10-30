import { ICart } from "@/interface/ICart";
import { model, Model, models, Schema } from "mongoose";



const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true
    }
})

const Cart:Model<ICart> = models.Cart || model('Cart', CartSchema)

export default Cart