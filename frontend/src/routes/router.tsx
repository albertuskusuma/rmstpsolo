import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"
import XlistFormPage from "../pages/xlistform/XlistFormPage"
import AddPasienPage from "../pages/pasien/AddPasienPage"
import AddPemeriksaanPage from "../pages/pemeriksaan/AddPemeriksaanPage"
import LoginPage from "../pages/login/LoginPage"
import { useEffect, useState } from "react"
import api from "../api/axios"
import { getAccessToken, setAccessToken } from "../auth/auth"
import ProtectedRoute from "./protectedRoute"

const AppRouter = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await api.post("/login/refreshToken");
                setAccessToken(res.data.accessToken);
            } catch {
                // normal kalau belum login
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    background: "linear-gradient(135deg, #4b6cb7, #182848)",
                    color: "white",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        border: "6px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "6px solid white",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        animation: "spin 1s linear infinite",
                        marginBottom: "20px",
                    }}
                ></div>
                <h2>Loading...</h2>

                {/* Add keyframes for spinner inline */}
                <style>
                    {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
                </style>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        getAccessToken() ? <Navigate to="/dashboard" replace /> : <LoginPage />
                    }
                />
                <Route path="/dashboard" element={
                    <ProtectedRoute loading={loading}>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path="/xlistform" element={<XlistFormPage />} />
                <Route path="/input-pasien" element={
                    <ProtectedRoute loading={loading}>
                        <AddPasienPage />
                    </ProtectedRoute>
                } />
                <Route path="/input-pemeriksaan" element={
                    <ProtectedRoute loading={loading}>
                        <AddPemeriksaanPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter