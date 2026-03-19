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
    nama_bidang_periksa: string,
    nama_pemeriksaan: string,
    nama_sub_periksa: string,
}

export interface printPdfPermintaanPemeriksaanLab {
    header: headerModel,
    list_pemeriksaan: detailPemeriksaanModel[]
}

export interface listHasilPemeriksaanModel {
    nama_bidang_periksa: string,
    nama_pemeriksaan: string,
    nama_sub_periksa: string,
    hasil: string,
    nilai_normal: string
}

export interface printPdfHasilPemeriksaanLab {
    header: headerModel,
    list_hasil: listHasilPemeriksaanModel[]
}

export interface printPdfBayarLab {
    header: headerModel,
    total_harga: number,
    list_hasil: listHasilPemeriksaanModel[]
}

export interface Header {
    kode_reg: string;
    nama_pasien: string;
    dokter_pengirim: string;
    gol_darah: string;
    status_kawin: string;
    pekerjaan: string;
    nama_ayah: string;
    nama_ibu: string;
    alamat: string;
    tanggal_registrasi: string;
    kategori_pasien: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    no_hp: string;
    no_kk: string;

    // dari u.nama (rename biar jelas)
    nama_petugas: string;
}

export interface Pemeriksaan {
    nama_bidang_periksa: string;
    nama_pemeriksaan: string;
    nama_sub_periksa: string;
}

export interface DataPDF {
    header: Header;
    list_pemeriksaan: Pemeriksaan[];
}

export const getPrintPdfPermintaanPemeriksaanLab = async (kode_reg: string): Promise<DataPDF> => {
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
            u.nama AS nama_petugas
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
            header: resultHeader.rows[0],
            list_pemeriksaan: detail.rows
        };
    } catch (error: any) {
        throw error
    }
}

export const getPrintPdfHasilPemeriksaanLab = async (kode_reg: string): Promise<printPdfHasilPemeriksaanLab> => {
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

        // hasilP
        let queryhasilP = `SELECT 
            b.nama_bidang_periksa,
            j.nama_pemeriksaan,
            s.nama_sub_periksa,
            d.hasil,
            d.nilai_normal
        FROM tx_pemeriksaan as txp

        JOIN tx_detail_pemeriksaan d
            ON txp.id_tx_pemeriksaan = d.id_tx_pemeriksaan
            AND d.is_active = 1

        JOIN sub_pemeriksaan s
            ON d.id_sub_periksa = s.id_sub_periksa
            AND s.is_active = 1

        JOIN jenis_pemeriksaan j
            ON s.id_periksa = j.id_periksa
            AND j.is_active = 1

        JOIN bidang_periksa b
            ON j.id_bidang_periksa = b.id_bidang_periksa
            AND b.is_active = 1

        WHERE txp.kode_reg = $1
        AND txp.is_active = 1`;
        const hasilP = await pool.query(queryhasilP, [kode_reg])

        return {
            header: resultHeader.rows[0],
            list_hasil: hasilP.rows
        };
    } catch (error: any) {
        throw error
    }
}

export const getPrintPdfBayarLab = async (kode_reg: string): Promise<printPdfBayarLab> => {
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

        // hasilP
        let queryhasilP = `SELECT 
            b.nama_bidang_periksa,
            j.nama_pemeriksaan,
            s.nama_sub_periksa,
            d.hasil,
            d.nilai_normal,
            d.harga
        FROM tx_pemeriksaan as txp

        JOIN tx_detail_pemeriksaan d
            ON txp.id_tx_pemeriksaan = d.id_tx_pemeriksaan
            AND d.is_active = 1

        JOIN sub_pemeriksaan s
            ON d.id_sub_periksa = s.id_sub_periksa
            AND s.is_active = 1

        JOIN jenis_pemeriksaan j
            ON s.id_periksa = j.id_periksa
            AND j.is_active = 1

        JOIN bidang_periksa b
            ON j.id_bidang_periksa = b.id_bidang_periksa
            AND b.is_active = 1

        WHERE txp.kode_reg = $1
        AND txp.is_active = 1`;
        const hasilP = await pool.query(queryhasilP, [kode_reg])

        let total_hargax = 0;
        if (hasilP.rows.length > 0) {
            for (let index = 0; index < hasilP.rows.length; index++) {
                const e = hasilP.rows[index];
                total_hargax += Number(e['harga'])
            }
        }

        return {
            header: resultHeader.rows[0],
            list_hasil: hasilP.rows,
            total_harga: total_hargax
        };
    } catch (error: any) {
        throw error
    }
}