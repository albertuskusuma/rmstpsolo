import { Request, Response } from "express"
import * as authService from "../services/authService"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../config/jwt";
import { AuthRequest } from "../middleware/middlewareAuth";

export const getUserLogin = async (req: Request, res: Response) => {
    try {
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(500).json({
                status: "Err",
                message: "Username atau password belum di input"
            })
        }
        // console.log(req.body)
        const param = req.body
        const data = await authService.getUserLogin(String(param.username))

        if (!data) {
            return res.status(404).json({
                status: "Err",
                message: "User tidak ditemukan"
            })
        }

        const valid = await bcrypt.compare(param.password, data.password);

        if (!valid) {
            return res.status(401).json({ message: "Password salah" });
        }

        let payload = {
            id_users: data.id_users,
            nama: data.nama,
            username: data.username,
            role_user: data.role_user,
            is_active: data.is_active
        };

        const accessToken = generateAccessToken(payload)
        const refreshToken = generateRefreshToken(payload)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            status: "OK",
            data: payload,
            accessToken: accessToken,
            message: "User Login berhasil"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "Err",
            message: "Gagal login"
        })
    }
}

export const refreshToken = (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "Token tidak ada, silahkan login" });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

        const accessToken = generateAccessToken({
            id_users: decoded.id_users,
            role_user: decoded.role_user
        });

        return res.json({ accessToken });

    } catch (err) {
        console.log(err); // optional log
        return res.status(403).json({ message: "Token invalid, silahkan login lagi" });
    }
};

export const logout = (req: Request, res: Response) => {

    res.clearCookie("refreshToken")

    return res.json({
        message: "Logout berhasil"
    })

}

export const getProfile = async (req: AuthRequest, res: Response) => {

    try {

        const userId = req.users.id_users;

        const user = await authService.getUserById(userId);

        return res.json({
            status: "OK",
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            status: "Err",
            message: "Gagal mengambil profile"
        });

    }

};
