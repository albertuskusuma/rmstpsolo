import * as printPdfModels from  "../models/printPdfModels"

export const getPrintPdfPermintaanPemeriksaanLab = async (kode_reg:string) => {
    return await printPdfModels.getPrintPdfPermintaanPemeriksaanLab(kode_reg)
}

export const getPrintPdfHasilPemeriksaanLab = async (kode_reg:string) => {
    return await printPdfModels.getPrintPdfHasilPemeriksaanLab(kode_reg)
}