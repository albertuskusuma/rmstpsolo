import { Router } from "express"
import {
    getPrintPdfPermintaanPemeriksaanLab
} from "../controllers/printPdfController"

const router = Router()
router.post("/getPrintPdfPermintaanPemeriksaanLab", getPrintPdfPermintaanPemeriksaanLab)
export default router