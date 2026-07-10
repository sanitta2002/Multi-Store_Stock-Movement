import express, { Application } from "express"
import dotenv from "dotenv"
dotenv.config();

export class App{
    private app: Application;
    constructor(){
        this.app = express();
        this.app.use(express.json());
    }
    public listen(): void{
        this.app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    }
}