import { Router } from "express";
import { getProducts, getProductById, updateProductQuantity, importProducts } from "./inventory.service";
import multer from 'multer'
import fs from 'fs'
import { parse } from 'csv-parse'
import { IProduct } from "./inventory.schema";

const upload = multer({ dest: 'uploads/' })
const router = Router()

router.get('/products', async (req, res, next) => {
    return res.json(await getProducts())
})
router.get('/products/:id', async (req, res, next) => {
    return res.json(await getProductById(req.params.id))
})
router.put('/products', async (req, res, next) => {
    return res.json(await updateProductQuantity(req.body?.id, req.body?.quantity))
})
router.post('/products', upload.single('file'), async (req, res, next) => {
    const products = []

    fs.createReadStream(req.file.path)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true, }))
    .on("data", (row) => {
        const product = row as IProduct
        products.push(product)
    })
    .on('end', async () => {
        res.json(await importProducts(products))
    })
})
export default router