import { Router } from "express";
import { 
    getPasiensBySearch, 
    getNoRm,
    getKodeReg, 
    addPasien
} from "../controllers/pasienController"

const router = Router()
router.get("/getPasiensBySearch", getPasiensBySearch)
router.get("/getNoRm", getNoRm)
router.get("/getKodeReg",getKodeReg)
router.post("/addPasien",addPasien)
export default router