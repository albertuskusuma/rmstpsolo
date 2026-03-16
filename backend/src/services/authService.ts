import * as authModel from  "../models/authModel"

export const getUserLogin = async (username:string) => {
    return await authModel.getUserLogin(username)
}

export const getUserById = async (id_users:number) => {
    return await authModel.getUserById(id_users)
}
