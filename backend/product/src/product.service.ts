import { UpdateWriteOpResult } from "mongoose"
import { IProduct, Product } from "./product.schema"

export const getProducts = async (): Promise<IProduct[]> => {
    return await Product.find()
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id)
}

export const updateProducts = async (products: IProduct[]): Promise<IProduct[]> => {
    const updated = []
    for (const product of products) {
        updated.push(Product.findOneAndReplace({_id: product._id}, product, { returnDocument: 'after' }))
    }
    return await Promise.all(updated)
}