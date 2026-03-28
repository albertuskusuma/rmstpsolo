import { pool } from "../config/db";

export interface PasienModel {
    id_pasien: number,
    no_rm: string,
    nama_pasien: string,
    value: string,
    text: string,
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
            no_rm as value,
            CONCAT(no_rm, ' - ', nama_pasien) AS text, 
            nik,
            kategori_pasien,
            jenis_kelamin,
            dokter_pengirim,
            gol_darah,
            TO_CHAR(tanggal_lahir, 'DD-MM-YYYY') AS tanggal_lahir,
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

export const getNoRm = async (): Promise<string> => {
    let no_rm = ""

    try {
        let querygetLastID = `SELECT id_pasien 
        FROM pasien
        ORDER BY id_pasien DESC
        LIMIT 1 OFFSET 0`;

        let lastId = 1
        const resultID = await pool.query(querygetLastID);
        if (resultID.rows.length > 0) {
            lastId = Number(resultID.rows[0]['id_pasien']) + 1
        }

        let queryDateNow = `SELECT TO_CHAR(DATE(NOW()),'DDMMYYYY') as datenow`;
        const resultDateNow = await pool.query(queryDateNow)
        let dateNow = resultDateNow.rows[0]['datenow']

        no_rm += "RM" + no_rm + lastId + dateNow
        return no_rm
    } catch (error) {
        throw error
    }
}

export const getKodeReg = async (): Promise<string> => {
    try {
        let kode_reg = "";

        let queryKodeRegLast = `SELECT id_tx_pemeriksaan
        FROM tx_pemeriksaan
        ORDER BY id_tx_pemeriksaan DESC
        LIMIT 1 OFFSET 0
        `

        // console.log(queryKodeRegLast)
        let kodeRegLast = 1
        const resultKodeRegLast = await pool.query(queryKodeRegLast)
        if (resultKodeRegLast.rows.length > 0) {
            kodeRegLast = Number(resultKodeRegLast.rows[0]['id_tx_pemeriksaan']) + 1
        }

        kode_reg += "P" + kodeRegLast

        return kode_reg;
    } catch (error: any) {
        throw error
    }
}

export const addPasien = async (addPasienObj: PasienModel) => {
    try {
        const queryCheck = `
        SELECT 1 FROM pasien 
        WHERE no_rm = $1 AND is_active = 1
        `;

        const resultCheck = await pool.query(queryCheck, [
            addPasienObj.no_rm,
        ]);

        // if exists
        if (resultCheck.rows.length > 0) {
            const error: any = new Error(
                `Data dengan no RM : ${addPasienObj.no_rm} sudah ada`
            );
            error.status = 409;
            throw error;
        }

        //    add
        const queryAdd = `
        INSERT INTO pasien (
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
            alamat
        ) VALUES (
            $1,$2,$3,$4,$5,
            $6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15
        )
        RETURNING *
        `;

        const values = [
            addPasienObj.no_rm,
            addPasienObj.nama_pasien,
            addPasienObj.nik,
            addPasienObj.kategori_pasien,
            addPasienObj.jenis_kelamin,
            addPasienObj.dokter_pengirim,
            addPasienObj.gol_darah,
            addPasienObj.tanggal_lahir,
            addPasienObj.status_kawin,
            addPasienObj.no_hp,
            addPasienObj.pekerjaan,
            addPasienObj.no_kk,
            addPasienObj.nama_ayah,
            addPasienObj.nama_ibu,
            addPasienObj.alamat,
        ];

        const resultAdd = await pool.query(queryAdd, values);

        return resultAdd.rows[0];
    } catch (error: any) {
        throw error;
    }
};