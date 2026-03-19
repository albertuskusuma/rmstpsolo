import { Request, Response } from "express"
import * as printPdfService from "../services/printPdfService"

export const getPrintPdfPermintaanPemeriksaanLab = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Kode registrasi belum ada"
            })
        }
        // console.log(req.body)
        const param = req.body
        const data = await printPdfService.getPrintPdfPermintaanPemeriksaanLab(String(param.kode_reg))

        const pdf = data

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=lab.pdf");

        res.send(pdf);

        // return res.json({
        //     status:"OK",
        //     data:data,
        //     message:"Print PDF Permintaan Lab berhasil"
        // })
    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal get data pemeriksaan"
        })
    }
}

export const getPrintPdfHasilPemeriksaanLab = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Kode registrasi belum ada"
            })
        }
        // console.log(req.body)
        const param = req.body
        const data = await printPdfService.getPrintPdfHasilPemeriksaanLab(String(param.kode_reg))

        const pdf = data

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=lab.pdf");

        res.send(pdf);

        // return res.json({
        //     status:"OK",
        //     data:data,
        //     message:"Print PDF Permintaan Lab berhasil"
        // })
    } catch (error) {
         console.error(error);
        return res.status(500).json({
            status: "Err",
            message: "Gagal get data pemeriksaan "+error
        })
    }
}

export const getPrintPdfBayarLab = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Kode registrasi belum ada"
            })
        }
        // console.log(req.body)
        const param = req.body
        const data = await printPdfService.getPrintPdfBayarLab(String(param.kode_reg))

        return res.json({
            status: "OK",
            data: data,
            message: "Print PDF Bayar Lab berhasil"
        })
    } catch (error) {
        return res.status(500).json({
            status: "Err",
            message: "Gagal get data bayar"
        })
    }
}