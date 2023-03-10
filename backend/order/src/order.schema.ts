import mongoose from "mongoose";

export interface IOrder {
    _id?:string
    productId:string
    quantities:number
}

export const OrderSchema = new mongoose.Schema<IOrder>({
    productId:'string',
    quantities:'number'
})

export const Order = mongoose.model<IOrder>('Order', OrderSchema)