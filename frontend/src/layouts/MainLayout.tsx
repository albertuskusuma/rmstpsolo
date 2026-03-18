import { NavLink } from 'react-router-dom'
import api from '../api/axios';
import { clearAccessToken } from '../auth/auth';
import { getUser } from '../types/loginType';

const MainLayout = ({ children }: any) => {

  const handleLogout = async () => {
    try {
      await api.post("/login/logout", {}, { withCredentials: true }); // hapus cookie di backend
    } catch {
      console.log("gagal logout di server");
    } finally {
      clearAccessToken();
      window.location.href = "/";
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-7">
        <h1 className="text-xl font-bold mb-6">Admin Page</h1>

        <ul className="space-y-2">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block p-2 rounded transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/input-pemeriksaan"
              className={({ isActive }) =>
                `block p-2 rounded transition ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              Input Pemeriksaan
            </NavLink>
          </li>

          <li>
            <button 
              onClick={handleLogout}
              className='block p-2 rounded transition hover:bg-gray-700'>
              Logout
            </button>
          </li>

        </ul>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 bg-[#F4F6F9]">

        {/* Topbar */}
        <div className="h-16 bg-white border-b flex items-center justify-end px-6">
          Welcome, {getUser()?.username}
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>

        {/* Footer */}
        <div className="h-14 bg-white border-t flex items-center px-6">
          Copyright © 2026 Albertus Sindhu
        </div>

      </div>

    </div>
  )
}

export default MainLayout