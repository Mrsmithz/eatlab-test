import { Router } from "express";
import { IOrder, Order } from "./order.schema";
import { createOrder, getOrderById, getOrders } from "./order.service";
import { IProduct } from "./product.schema";
const INVENTORY_URI = process.env.INVENTORY_URI

const router = Router()

router.get('/', async (req, res, next) => {
    return res.json(await getOrders())
})
router.get('/:id', async (req, res, next) => {
    return res.json(await getOrderById(req.params.id))
})
router.post('/', async (req, res, next) => {
    const order: IOrder = {
        productId: req.body?.productId,
        quantities: req.body?.quantities
    }
    fetch(`${INVENTORY_URI}/products/${order.productId}`)
    .then(data => data.json())
    .then(data => data as IProduct)
    .then(data => {
        if (data.quantity >= order.quantities) {
            fetch(`${INVENTORY_URI}/products`, {method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id:order.productId, quantity:-Math.abs(order.quantities)})})
            .then(data => data.json())
            .then(data => console.log(data))
            .then(async () => res.json(await createOrder(order)))
            .catch(err => {
                console.log(err)
                return res.status(400).json()
            })
        }
        else {
            return res.status(400).json({
                status: 'Product quantity inefficient'
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json()
    })
})

export default router