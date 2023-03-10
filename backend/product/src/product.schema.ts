import mongoose from "mongoose";

export interface IProduct {
    _id?: string
    name: string
    price: number
    quantity: number
}
export const ProductSchema = new mongoose.Schema<IProduct>({
    name:'string',
    price:'number',
    quantity:'number'
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)