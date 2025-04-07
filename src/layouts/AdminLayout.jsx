import React from 'react'
import { Outlet } from 'react-router'

const AdminLayout = () => {
    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className='text-xl font-bold'>Admin Sidebar</h2>
                <ul className="mt-4">
                    <li className="mb-2"><a href="/admin/dashboard">Dashboard</a></li>
                    <li className="mb-2"><a href="/admin/users">Users</a></li>
                    <li className="mb-2"><a href="/admin/settings">Settings</a></li>
                </ul>
            </div>
            {/* Main Content Area */}
            <div className="w-3/4 p-4 bg-gray-100">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout