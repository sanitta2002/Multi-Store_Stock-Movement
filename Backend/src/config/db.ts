import { errorMessage } from "@/constant/errorMessage"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
export class DatabaseConfig {
    private databaseurl:string
    constructor(){
        if(!process.env.DB_URL){
            throw new Error(errorMessage.MONGO_URI_NOT_DEFINED)
        }
        this.databaseurl = process.env.DB_URL
    }
    public async getDatabaseUrl():Promise<void>{
        try{
            await mongoose.connect(this.databaseurl)
            console.log("database connected successfully")
        } catch (error) {
            console.error("error connecting to database:", error)
            throw new Error(errorMessage.FAILED_TO_CONNECT_DATABASE)
        }
    }
} 