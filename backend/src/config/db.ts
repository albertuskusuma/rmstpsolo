import { Pool } from "pg"

export const pool = new Pool({
    host: process.env.host as string,
    port: Number(process.env.port),
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})