import {DataSource} from 'typeorm';
import 'dotenv/config'

export const connection = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    username: "postgres",
    password: process.env.PASSWORD,
    port: process.env.DB_PORT as unknown as number,
    database: "users",
    migrations: ['../migrations/'],
    entities: ['../models/**.{ts,js}'],
    synchronize: true,
    logging: true
})
