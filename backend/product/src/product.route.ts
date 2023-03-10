import { Router } from "express";
import { getProducts, getProductById } from "./product.service";
const router = Router()

router.get('/products', async (req, res, next) => {
    return res.json(await getProducts())
})

router.get('/products/:id', async (req, res, next) => {
    return res.json(await getProductById(req.params.id))
})

export default router