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

export interface addHasilPemeriksaanObj {
    id_tx_pemeriksaan: number,
    id_sub_periksa: number,
    hasil: string,
    nilai_normal: string,
    harga: number,
    is_active: number
}

export const addTransPemeriksaanHeader = async (addPemeriksaanObj: addPemeriksaanObj) => {
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
    } catch (error: any) {
        throw error;
    }
}

export const addHasilPemeriksaanDetail = async (addHasilPemeriksaanObj: addHasilPemeriksaanObj[]) => {
    try {
        if (addHasilPemeriksaanObj.length > 0) {
            const resultPush = []
            for (let x of addHasilPemeriksaanObj) {

                let queryAddDetail = `INSERT INTO tx_detail_pemeriksaan(
                    id_tx_pemeriksaan,
                    id_sub_periksa,
                    hasil,
                    nilai_normal,
                    harga,
                    is_active
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    1
                ) RETURNING *`

                const resultAdd = pool.query(queryAddDetail, [
                    x.id_tx_pemeriksaan,
                    x.id_sub_periksa,
                    x.hasil,
                    x.nilai_normal,
                    x.harga
                ])

                resultPush.push(resultAdd)
            }

            return resultPush
        }

    } catch (error) {
        throw error
    }
}

export const hapusHasilPemeriksaanDetail = async (id_tx_detail_pemeriksaan: number) => {
    try {
        let queryHapus = `UPDATE tx_detail_pemeriksaan SET is_active = 0
        WHERE id_tx_detail_pemeriksaan = $1`

        const resultHapus = await pool.query(queryHapus, [
            id_tx_detail_pemeriksaan
        ])

        return resultHapus;
    } catch (error: any) {
        throw error;
    }
}