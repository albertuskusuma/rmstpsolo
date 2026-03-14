import { Router } from "express";
import { 
    getPasiensBySearch, 
    getNoRm,
    getKodeReg, 
} from "../controllers/pasienController"

const router = Router()
router.get("/getPasiensBySearch", getPasiensBySearch)
router.get("/getNoRm", getNoRm)
router.get("/getKodeReg",getKodeReg)
export default router