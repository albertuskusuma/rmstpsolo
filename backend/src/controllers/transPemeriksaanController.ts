import { Request, Response } from "express";
import * as transPemeriksaanService from "../services/transPemeriksaanService"

export const addTransPemeriksaanHeader = async (req: Request, res: Response) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Silahkan input dulu"
            })
        }

        const param = req.body;
        const data = await transPemeriksaanService.addTransPemeriksaanHeader({
            id_pasien: Number(param.id_pasien),
            id_analis_pemeriksa: Number(param.id_analis_pemeriksa),
            is_active: Number(param.is_active),
            kode_reg: String(param.kode_reg),
            tanggal_periksa: String(param.tanggal_periksa),
        })

        // console.log(data['rows']);

        const rowsx = data['rows'] as [] ?? [];

        if (rowsx.length > 0) {
            return res.json({
                status: "OK",
                data: data,
                message: "Permintaan Pemeriksaan Berhasil"
            })
        } else {
            return res.json({
                status: "Err",
                data: [],
                message: "Data dengan kode reg "+param.kode_reg+" sudah ada"
            })
        }


    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal add pemeriksaan"
        })
    }
}

export const addTransPemeriksaanDetail = async (req: Request, res: Response) => {
    try {

        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Silahkan Input Hasil Periksa"
            })
        }

        const param = req.body;
        if (param.length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Input Pemeriksaan Kosong, Silahkan tambahkan dulu"
            })
        }

        if (!Array.isArray(param) || param.length === 0) {
            return res.status(400).json({
                status: "ERROR",
                message: "Body harus berupa array"
            })
        }

        const data = await transPemeriksaanService.addHasilPemeriksaanDetail(param)

        return res.json({
            status: "OK",
            data: data,
            message: "Input Hasil Periksa Berhasil"
        })
    } catch (error) {
        throw error
    }
}

export const hapusHasilPemeriksaanDetail = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Silahkan Pilih Hasil Pemeriksaan untuk dihapus"
            })
        }

        const param = req.body;
        const data = await transPemeriksaanService.hapusHasilPemeriksaanDetail(Number(param.id_tx_detail_pemeriksaan))

        return res.json({
            status: "OK",
            data: data,
            message: "Berhasil Hapus Hasil Pemeriksaan"
        })

    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal hapus detail"
        })
    }
}

export const getMasterPemeriksaan = async (req: Request, res: Response) => {
    try {
        const param = req.body;
        const data = await transPemeriksaanService.getMasterPemeriksaan()

        return res.json({
            status: "OK",
            data: data,
            message: "Berhasil get data master pemeriksaan"
        })

    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal hapus detail"
        })
    }
}

export const getDetailPemeriksaan = async (req: Request, res: Response) => {
    try {
        const param = req.body;
        const data = await transPemeriksaanService.getDetailPemeriksaan(param.kode_reg as string)

        return res.json({
            status: "OK",
            data: data,
            message: "Berhasil get data detail pemeriksaan"
        })

    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal get data"
        })
    }
}
