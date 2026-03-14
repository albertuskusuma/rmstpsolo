import * as pasienModel from "../models/pasienModel"

export const getPasiens = async (search: string) => {
    return await pasienModel.getPasiens(search)
}