import { Router } from "express"
import {
    addTransPemeriksaanHeader,
    addTransPemeriksaanDetail,
    hapusHasilPemeriksaanDetail,
    getMasterPemeriksaan,
    getDetailPemeriksaan,
} from "../controllers/transPemeriksaanController"

const router = Router()
router.post("/addTransPemeriksaanHeader",addTransPemeriksaanHeader)
router.post("/addTransPemeriksaanDetail", addTransPemeriksaanDetail)
router.post("/hapusHasilPemeriksaanDetail",hapusHasilPemeriksaanDetail)
router.get("/getMasterPemeriksaan",getMasterPemeriksaan)
router.post("/getDetailPemeriksaan",getDetailPemeriksaan)

export default router;