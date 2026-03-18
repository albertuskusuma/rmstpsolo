import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import { pool } from "./config/db"
import pasienRoute from "./routes/pasienRoute"
import transPemeriksaanRoute from "./routes/transPemeriksaanRoute"
import printPdfRoute from "./routes/printPdfRoute"
import authRoute from "./routes/authRoute"
import cookieParser from "cookie-parser";

const app = express()

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected")
    })
    .catch(err => {
        console.log("database connection error ",err)
    })

app.use(cors({
    origin: process.env.ORIGIN_FE,
    credentials:true
}))

app.use(express.json())

app.use(cookieParser());

app.get("/", (req,res) => {
    res.send("backend running")
});

// pasien
app.use("/api/pasien", pasienRoute)

// trans pemeriksaan
app.use("/api/transperiksa", transPemeriksaanRoute)

// print pdf
app.use("/api/printpdf", printPdfRoute)

// login
app.use("/api/login", authRoute)

app.listen(3000, () => {
    console.log("Server running on port 3000")
});