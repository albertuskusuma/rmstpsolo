import { Router } from "express";
import { 
    getUserLogin,
    refreshToken,
    logout,
    getProfile,
} from "../controllers/authController"
import { verifyToken } from "../middleware/middlewareAuth";

const router = Router()
router.post("/getUserLogin", getUserLogin)
router.post("/refreshToken",refreshToken)
router.post("/logout",logout)
router.get(
    "/profile",
    verifyToken,
    getProfile
);
export default router