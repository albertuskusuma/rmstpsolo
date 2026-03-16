import { pool } from "../config/db";

export interface headerModel {
    id_tx_detail_pemeriksaan: number,
    id_tx_pemeriksaan: number,
    id_sub_periksa: number,
    hasil: string,
    nilai_normal: string,
    harga: number,
    is_active: string
}

export interface detailPemeriksaanModel {
    nama_bidang_periksa:string,
    nama_pemeriksaan:string,
    nama_sub_periksa:string,
}

export interface printPdfPermintaanPemeriksaanLab {
    header:headerModel,
    list_pemeriksaan:detailPemeriksaanModel[]
}

export const getPrintPdfPermintaanPemeriksaanLab = async (kode_reg:string): Promise<printPdfPermintaanPemeriksaanLab> =>{
    try {
        // header
        let queryHeader = `SELECT 
            txp.kode_reg, 
            p.nama_pasien, 
            p.dokter_pengirim, 
            p.gol_darah, 
            p.status_kawin, 
            p.pekerjaan, 
            p.nama_ayah, 
            p.alamat, 
            TO_CHAR(txp.tanggal_periksa, 'DD-MM-YYYY') as tanggal_registrasi, 
            p.kategori_pasien, 
            p.jenis_kelamin, 
            TO_CHAR(p.tanggal_lahir, 'DD-MM-YYYY') as tanggal_lahir, 
            p.no_hp, 
            p.no_kk, 
            p.nama_ibu, 
            u.nama
        FROM tx_pemeriksaan as txp
        JOIN pasien as p
            ON txp.id_pasien = p.id_pasien
            AND p.is_active = 1
        JOIN users as u
            ON txp.id_analis_pemeriksa = u.id_users
            AND u.is_active = 1
        WHERE txp.kode_reg = $1
            AND txp.is_active = 1`;

        const resultHeader = await pool.query(queryHeader, [
            String(kode_reg)
            // 'P1'
        ])

        // detail
        let queryDetail = `SELECT 
            nama_bidang_periksa, 
            j.nama_pemeriksaan, 
            s.nama_sub_periksa
        FROM bidang_periksa as b
        JOIN jenis_pemeriksaan as j
            ON b.id_bidang_periksa = j.id_bidang_periksa
            AND j.is_active = 1
        JOIN sub_pemeriksaan as s
            ON j.id_periksa = s.id_periksa
            AND s.is_active = 1
        WHERE b.is_active = 1`;
        const detail = await pool.query(queryDetail)

        return {
            header:resultHeader.rows[0],
            list_pemeriksaan:detail.rows
        };
    } catch (error:any) {
        throw error
    }
}