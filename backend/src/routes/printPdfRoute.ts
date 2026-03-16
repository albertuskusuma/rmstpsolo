import { Router } from "express"
import {
    getPrintPdfPermintaanPemeriksaanLab,
    getPrintPdfHasilPemeriksaanLab,
    getPrintPdfBayarLab
} from "../controllers/printPdfController"

const router = Router()
router.post("/getPrintPdfPermintaanPemeriksaanLab", getPrintPdfPermintaanPemeriksaanLab)
router.post("/getPrintPdfHasilPemeriksaanLab", getPrintPdfHasilPemeriksaanLab)
router.post("/getPrintPdfBayarLab", getPrintPdfBayarLab)
export default router