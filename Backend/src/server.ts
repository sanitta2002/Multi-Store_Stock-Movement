import "reflect-metadata";
import "@/config/di/di";
import { DatabaseConfig } from "@/config/db";
import { App } from "@/app";


const Database = new DatabaseConfig();

Database.getDatabaseUrl()
const app = new App()
app.listen()