import { Router } from "express"
import {
    addTransPemeriksaanHeader,
    addTransPemeriksaanDetail,
} from "../controllers/transPemeriksaanController"

const router = Router()
router.post("/addTransPemeriksaanHeader",addTransPemeriksaanHeader)
router.post("/addTransPemeriksaanDetail", addTransPemeriksaanDetail)
export default router;