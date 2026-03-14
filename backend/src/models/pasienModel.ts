import { pool } from "../config/db";

export interface PasienModel {
    id_pasien: number,
    no_rm: string,
    nama_pasien: string,
    nik: string,
    kategori_pasien: string,
    jenis_kelamin: string,
    dokter_pengirim: string,
    gol_darah: string,
    tanggal_lahir: string,
    status_kawin: string,
    no_hp: string,
    pekerjaan: string,
    no_kk: string,
    nama_ayah: string,
    nama_ibu: string,
    alamat: string,
    is_active: number,
    created_by: number,
    created_at: string,
}

export const getPasiens = async (search: string): Promise<PasienModel[]> => {
    try {
        let query = `SELECT  
            id_pasien,
            no_rm,
            nama_pasien,
            nik,
            kategori_pasien,
            jenis_kelamin,
            dokter_pengirim,
            gol_darah,
            tanggal_lahir,
            status_kawin,
            no_hp,
            pekerjaan,
            no_kk,
            nama_ayah,
            nama_ibu,
            alamat,
            is_active,
            created_by,
            TO_CHAR(created_at, 'DD-MM-YYYY')
        FROM pasien WHERE is_active = 1 `;
        const values: any[] = [];
        if (search && search.length > 0) {
            values.push(`%${search}%`)
            query += ` AND (no_rm ILIKE  $1 
                OR nama_pasien ILIKE $1
            )`
            // console.log(query)
            const result = await pool.query(query, values)
            return result.rows
        } else {
            const result = await pool.query(query)
            return result.rows
        }
    } catch (error: any) {
        throw error
    }
}