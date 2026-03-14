import { Router } from "express"
import {
    addTransPemeriksaanHeader,
    addTransPemeriksaanDetail,
    hapusHasilPemeriksaanDetail,
} from "../controllers/transPemeriksaanController"

const router = Router()
router.post("/addTransPemeriksaanHeader",addTransPemeriksaanHeader)
router.post("/addTransPemeriksaanDetail", addTransPemeriksaanDetail)
router.post("/hapusHasilPemeriksaanDetail",hapusHasilPemeriksaanDetail)
export default router;