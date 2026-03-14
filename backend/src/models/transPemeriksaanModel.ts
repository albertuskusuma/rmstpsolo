import { pool } from "../config/db";

export interface detailPemeriksaanModel {
    id_tx_detail_pemeriksaan: number,
    id_tx_pemeriksaan: number,
    id_sub_periksa: number,
    hasil: string,
    nilai_normal: string,
    harga: number,
    is_active: string
}

export interface transPemeriksaanModel {
    id_tx_pemeriksaan: number,
    kode_reg: string;
    id_pasien: number,
    tanggal_periksa: string,
    is_active: number,
    id_analis_pemeriksa: number
}

export interface addPemeriksaanObj {
    kode_reg: string;
    id_pasien: number,
    tanggal_periksa: string,
    is_active: number,
    id_analis_pemeriksa: number,
}

export const addTransPemeriksaanHeader=async(addPemeriksaanObj: addPemeriksaanObj)=>{
    try {
        let queryAdd = `INSERT INTO tx_pemeriksaan(
            kode_reg, 
            id_pasien, 
            tanggal_periksa, 
            is_active,
            id_analis_pemeriksa
        ) VALUES (
            $1,
            $2,
            NOW(),
            1,
            $3 
        ) RETURNING *`;

        const resultAdd = await pool.query(queryAdd, [
            addPemeriksaanObj.kode_reg,
            addPemeriksaanObj.id_pasien,
            addPemeriksaanObj.id_analis_pemeriksa,
        ])
        return resultAdd;
    } catch (error:any) {
        throw error;
    }
}