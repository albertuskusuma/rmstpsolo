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