import express, { Express } from "express";
import router from "./src/product.route";
import mongoose from "mongoose";
import cron from 'node-cron'
import { updateProducts } from "./src/product.service";

const app: Express = express()
const port = 3000

app.use('/', router)

async function bootStrap() {
    cron.schedule('*/5 * * * * *', () => {
        fetch(process.env.INVENTORY_URI)
        .then(data => data.json())
        .then(async data => await updateProducts(data))
        .then((result) => console.log(`Update ${result.length} products`))
        .catch(err => console.log(err))
    })
    await mongoose.connect(process.env.DB_URI)
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}
bootStrap()
