import { Request, Response } from "express";
import * as pasienService from "../services/pasienService"
import { PasienModel } from "../models/pasienModel";

export const getPasiensBySearch = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string
        const data = await pasienService.getPasiens(search) as PasienModel[]

        // console.log(search)

        if (data.length > 0) {
            return res.json({
                status: "OK",
                data: data,
                message: "Data Pasien ditemukan"
            })
        } else {
            return res.json({
                status: "OK",
                data: [],
                message: "Data Pasien tidak ditemukan"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: "Err",
            message: "Gagal get data"
        });
    }

}

export const getNoRm=async(req: Request, res: Response) => {
    try {
        const data = await pasienService.getNoRm()

        return res.json({
            status:"OK",
            data:data,
            message:"No RM sudah dapat"
        });
    } catch (error) {
        res.status(500).json({
            status:"Err",
            message:"gagal get data no rm"
        });
    }
}

export const getKodeReg= async(req: Request, res: Response) =>{
    try {
        const data = await pasienService.getKodeReg()

        res.json({
            status:"OK",
            data:data,
            message:"Kode Reg sudah dapat"
        });
    } catch (error) {
        res.status(500).json({
            status:"Err",
            message:"gagal get kode reg"
        });
    }
}