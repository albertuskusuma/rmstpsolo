import { Router } from "express";
import { getPasiensBySearch } from "../controllers/pasienController"

const router = Router()
router.get("/getPasiensBySearch", getPasiensBySearch)
export default router