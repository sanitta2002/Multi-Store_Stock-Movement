import express, { Application } from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"
import AuthRoutes  from "./routes/authRoutes/authRoutes";
import ProductRoutes from "./routes/productRoutes/productRoutes"
import StoreRoutes from "./routes/storeRoutes/storeRoutes"
import StockRoutes from "./routes/stockRoutes/stockRoutes"
import TransferRoutes from "./routes/transferRoutes/transferRoutes"
import ShopperRoutes from "./routes/shopperRoutes/shopperRoutes"
import { injectable } from "tsyringe";


@injectable()
export class App{
    private app: Application;
    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.setMiddleware();
        this.setRoutes();
    }
    public listen(): void{
        this.app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    }
    private setMiddleware(){
        this.app.use(cors({
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
        }));
        this.app.use(cookieParser());
    }
    private setRoutes(){
        this.app.use('/api/auth',AuthRoutes);
        this.app.use("/api/products", ProductRoutes);
        this.app.use("/api/stores", StoreRoutes);
        this.app.use("/api/stocks", StockRoutes);
        this.app.use("/api/transfers", TransferRoutes);
        this.app.use("/api/shop", ShopperRoutes);
    }
}