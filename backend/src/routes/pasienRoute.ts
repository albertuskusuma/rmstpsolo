import { Router } from "express";
import { 
    getPasiensBySearch, 
    getNoRm 
} from "../controllers/pasienController"

const router = Router()
router.get("/getPasiensBySearch", getPasiensBySearch)
router.get("/getNoRm", getNoRm)
export default router