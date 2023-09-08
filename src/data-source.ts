import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const PgDataSource = new DataSource({
    database: process.env.DATABASE,
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.BDUSERNAME,
    password: process.env.PASSWORD,
    synchronize: false, 
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"]
});


PgDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e.message)
    });

export default PgDataSource;