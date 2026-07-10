import express, { Application } from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"

export class App{
    private app: Application;
    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.setMiddleware();
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
}