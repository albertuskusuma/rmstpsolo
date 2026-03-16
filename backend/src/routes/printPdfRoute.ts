import { Router } from "express"
import {
    getPrintPdfPermintaanPemeriksaanLab,
    getPrintPdfHasilPemeriksaanLab
} from "../controllers/printPdfController"

const router = Router()
router.post("/getPrintPdfPermintaanPemeriksaanLab", getPrintPdfPermintaanPemeriksaanLab)
router.post("/getPrintPdfHasilPemeriksaanLab", getPrintPdfHasilPemeriksaanLab)
export default router