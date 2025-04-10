import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen w-full mx-auto max-w-7xl'>
            <Header />
            <main className='flex flex-col py-8 items-start'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout