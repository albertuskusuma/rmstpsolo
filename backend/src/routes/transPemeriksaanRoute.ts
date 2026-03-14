import { Router } from "express"
import {
    addTransPemeriksaanHeader
} from "../controllers/transPemeriksaanController"

const router = Router()
router.post("/addTransPemeriksaanHeader",addTransPemeriksaanHeader)
export default router;