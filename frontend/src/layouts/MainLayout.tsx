import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Mainlayout = ({ children }: any) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='relative flex flex-grow'>
                {/* Sidebar */}
                <div className='w-64 bg-gray-800 text-white p-7'>
                    <h1 className='text-xl font-bold mb-6'>Admin Page</h1>
                    <ul className='space-y-2'>

                        <NavLink to="/" className={({ isActive }) => `block p-2 transition ${isActive
                            ? "bg-blue-600 p-2 rounded"
                            : "hover:bg-gray-700 p-2 rounded"
                            }`
                        }>
                            Dashboard
                        </NavLink>
                        <li className='hover:bg-gray-700 p-2 rounded'>Input Pemeriksaan</li>
                    </ul>
                </div>
                {/* Content */}
                <div className='flex-1 bg-[#F4F6F9]'>
                    {/* Topbar Start*/}
                    <div className='flex h-[10vh] w-full bg-[#FFFFFF] text-black border-b-2 border-bg-gray-100'>
                        <div className='w-full p-6'>
                            <p className="text-right">
                                Welcome, Sindhu
                            </p>
                        </div>
                    </div>
                    {/* Topbar end */}
                    {/* Page Content Start*/}
                    {children}
                    {/* Page Content End */}
                    {/* footer */}
                    <div className='flex h-[10vh] w-full bg-[#FFFFFF] text-black fixed bottom-0 border-t-2 border-bg-gray-100'>
                        <div className='w-full p-6'>Copyright © 2026. Albertus Sindhu. </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainlayout