import express from "express"
import cors from "cors"
import { pool } from "./config/db"
import pasienRoute from "./routes/pasienRoute"

const app = express()

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected")
    })
    .catch(err => {
        console.log("database connection error ",err)
    })

app.use(cors())
app.use(express.json())

app.get("/", (req,res) => {
    res.send("backend running")
});

// pasien
app.use("/api/pasien", pasienRoute)

app.listen(3000, () => {
    console.log("Server running on port 3000")
});