import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/dashboard/DashboardPage"
import XlistFormPage from "../pages/xlistform/XlistFormPage"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="/xlistform" element={<XlistFormPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter