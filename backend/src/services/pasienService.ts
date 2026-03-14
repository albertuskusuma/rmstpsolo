import * as pasienModel from "../models/pasienModel"

export const getPasiens = async (search: string) => {
    return await pasienModel.getPasiens(search)
}

export const getNoRm = async() =>{
    return await pasienModel.getNoRm()
}