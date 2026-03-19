import { pool } from "../config/db";

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

export interface subPeriksaObj {
    value: string,
    text: string,
    harga: string,
}

export interface jenisPeriksaObj {
    value: string,
    text: string,
    dataSub: subPeriksaObj[]
}

export interface bidangPeriksaObj {
    value: string,
    text: string,
    dataJenis: jenisPeriksaObj[],
    dataSub: subPeriksaObj[],
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

export const getMasterPemeriksaan = async () => {
    try {
        let queryGet = `SELECT
            b.id_bidang_periksa AS bidang_id,
            b.nama_bidang_periksa,
            j.id_periksa AS jenis_id,
            j.nama_pemeriksaan,
            s.id_sub_periksa AS sub_id,
            s.nama_sub_periksa,
            s.harga AS harga
        FROM bidang_periksa b
        LEFT JOIN jenis_pemeriksaan j 
            ON j.id_bidang_periksa = b.id_bidang_periksa AND j.is_active = 1
        LEFT JOIN sub_pemeriksaan s 
            ON s.id_periksa = j.id_periksa AND s.is_active = 1
        WHERE b.is_active = 1
        ORDER BY b.id_bidang_periksa, j.id_periksa, s.id_sub_periksa`;

        const result = await pool.query(queryGet)
        const rows = result.rows; // hasil query flat

        const mapBidang = new Map<string, bidangPeriksaObj>();

        rows.forEach(row => {
            const bidangKey = row.bidang_id.toString();

            // Bidang
            if (!mapBidang.has(bidangKey)) {
                mapBidang.set(bidangKey, {
                    value: bidangKey,
                    text: row.nama_bidang_periksa,
                    dataJenis: [],
                    dataSub: [] // semua sub dari bidang ini, bisa optional
                });
            }

            const bidang = mapBidang.get(bidangKey)!;

            // Jenis
            if (row.jenis_id != null) {
                let jenis = bidang.dataJenis.find(j => j.value === row.jenis_id.toString());
                if (!jenis) {
                    jenis = {
                        value: row.jenis_id.toString(),
                        text: row.nama_pemeriksaan,
                        dataSub: []
                    };
                    bidang.dataJenis.push(jenis);
                }

                // Sub
                if (row.sub_id != null) {
                    const subObj: subPeriksaObj = {
                        value: row.sub_id.toString(),
                        text: row.nama_sub_periksa,
                        harga: row.harga.toString()
                    };
                    // tambahkan ke jenis
                    if (!jenis.dataSub.find(s => s.value === subObj.value)) {
                        jenis.dataSub.push(subObj);
                    }
                    // tambahkan juga ke bidang jika perlu
                    if (!bidang.dataSub.find(s => s.value === subObj.value)) {
                        bidang.dataSub.push(subObj);
                    }
                }
            }
        });

        const nestedData: bidangPeriksaObj[] = Array.from(mapBidang.values());
        return nestedData;
    } catch (error: any) {
        throw error;
    }
}

export const getDetailPemeriksaan = async (kode_reg: string) => {
    try {
        let queryGet = `SELECT 
            d.id_tx_detail_pemeriksaan,
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

        const result = await pool.query(queryGet, [kode_reg])
        return result.rows;
    } catch (error: any) {
        throw error;
    }
}