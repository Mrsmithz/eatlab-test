import { Order, IOrder} from "./order.schema"


export const getOrders = async (): Promise<IOrder[]> => {
    return await Order.find({})
}

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    return await Order.findById(id)
}

export const createOrder = async (order: IOrder): Promise<IOrder> => {
    return await Order.create(order)
}