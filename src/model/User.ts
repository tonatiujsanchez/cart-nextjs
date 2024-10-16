import { IUser } from "@/interface/IUser";
import { model, Model, models, Schema } from "mongoose";

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'admin', 'super-admin'],
        default: 'admin',
        message: '{VALUE} no es un rol valido'
    },
    
    // Opcionales
    confirm: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    }   
})

export const User:Model<IUser> = models.User || model('User', UserSchema)

export default User


