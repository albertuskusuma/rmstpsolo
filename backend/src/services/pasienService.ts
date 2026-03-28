import * as pasienModel from "../models/pasienModel"
import { PasienModel } from "../models/pasienModel"

export const getPasiens = async (search: string) => {
    return await pasienModel.getPasiens(search)
}

export const getNoRm = async() =>{
    return await pasienModel.getNoRm()
}

export const getKodeReg = async() =>{
    return await pasienModel.getKodeReg()
}

export const addPasien = async(addPasienObj: PasienModel) =>{
    return await pasienModel.addPasien(addPasienObj)
}