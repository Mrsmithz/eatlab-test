import express, { Express } from "express";
import router from "./src/order.route";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app: Express = express()
const port = 3000

app.use(bodyParser.json())
app.use('/order', router)

async function bootStrap() {
    await mongoose.connect(process.env.DB_URI)
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}
bootStrap()
