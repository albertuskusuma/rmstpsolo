import { pool } from "../config/db";

export interface userAuthModel {
    id_users: number,
    nama: string,
    username: string,
    password:string,
    role_user: string,
    is_active: string
}

export const getUserLogin = async (username:string): Promise<userAuthModel> =>{
    try {
        // users
        let queryUser = `SELECT 
            id_users,
            nama,
            username,
            role_user,
            is_active,
            password
        FROM users
        WHERE is_active = 1
        AND username = $1`;

        const resultUser = await pool.query(queryUser, [
            String(username)
        ])

        if(resultUser.rows.length == 0){
            throw "User tidak ditemukan"
        }

        return {
            id_users: resultUser.rows[0]['id_users'],
            nama:resultUser.rows[0]['nama'],
            username:resultUser.rows[0]['username'],
            password:resultUser.rows[0]['password'],
            role_user:resultUser.rows[0]['role_user'],
            is_active:resultUser.rows[0]['is_active']
        };
    } catch (error:any) {
        throw error
    }
}

export const getUserById = async (id:number) => {

    const query = `
        SELECT
            id_users,
            nama,
            username,
            role_user
        FROM users
        WHERE id_users = $1
    `;

    const result = await pool.query(query,[id]);

    return result.rows[0];

};