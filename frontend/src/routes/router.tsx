import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"
import XlistFormPage from "../pages/xlistform/XlistFormPage"
import AddPasienPage from "../pages/pasien/AddPasienPage"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/xlistform" element={<XlistFormPage/>}/>
                <Route path="/input-pasien" element={<AddPasienPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter