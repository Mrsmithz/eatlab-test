import { UpdateWriteOpResult } from "mongoose"
import { IProduct, Product } from "./inventory.schema"

export const getProducts = async (): Promise<IProduct[]> => {
    return await Product.find()
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id)
}

export const updateProductQuantity = async (id: string, quantity: number): Promise<UpdateWriteOpResult | null> => {
    const product = await Product.findById(id)
    if (product?.quantity !== undefined){
        product.quantity += quantity
        return await Product.findByIdAndUpdate(id, product, {returnDocument:'after'})
    }
    else {
        return null
    }
}

export const importProducts = async (products: IProduct[]): Promise<IProduct[]> => {
    return await Product.create(products)
}
