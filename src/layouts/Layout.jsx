import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen w-full items-center'>
            <Header />
            <main className='flex flex-col py-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout