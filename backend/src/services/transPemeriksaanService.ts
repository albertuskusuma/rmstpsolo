import * as transPemeriksaanModel from "../models/transPemeriksaanModel"

export const addTransPemeriksaanHeader = async (addPemeriksaanObj: transPemeriksaanModel.addPemeriksaanObj) => {
    return await transPemeriksaanModel.addTransPemeriksaanHeader(addPemeriksaanObj)
}

export const addHasilPemeriksaanDetail = async (addHasilPemeriksaanDetailObj: transPemeriksaanModel.addHasilPemeriksaanObj[]) => {

    for (const x of addHasilPemeriksaanDetailObj) {

        if (!x.id_tx_pemeriksaan || !x.id_sub_periksa) {
            throw new Error("Data detail tidak valid")
        }
    }
    return await transPemeriksaanModel.addHasilPemeriksaanDetail(addHasilPemeriksaanDetailObj)
}