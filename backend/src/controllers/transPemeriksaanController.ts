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

        return res.json({
            status: "OK",
            data: data,
            message: "Permintaan Pemeriksaan Berhasil"
        })
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