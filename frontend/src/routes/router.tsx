import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"
import XlistFormPage from "../pages/xlistform/XlistFormPage"
import AddPasienPage from "../pages/pasien/AddPasienPage"
import AddPemeriksaanPage from "../pages/pemeriksaan/AddPemeriksaanPage"
import LoginPage from "../pages/login/LoginPage"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/xlistform" element={<XlistFormPage/>}/>
                <Route path="/input-pasien" element={<AddPasienPage />}/>
                <Route path="/input-pemeriksaan" element={<AddPemeriksaanPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter