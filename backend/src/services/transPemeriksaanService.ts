import * as transPemeriksaanModel from "../models/transPemeriksaanModel"

export const addTransPemeriksaanHeader = async(addPemeriksaanObj: transPemeriksaanModel.addPemeriksaanObj)=>{
    return await transPemeriksaanModel.addTransPemeriksaanHeader(addPemeriksaanObj)
}