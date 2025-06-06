import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AdminHome from './pages/admin/AdminHome';
import NotFound from './pages/NotFound.jsx'
import Products from './pages/admin/Products.jsx'
import Orders from './pages/admin/Orders.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* AuthLayout */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='collections' element={<Collection />} />
            <Route path='contact' element={<Contact />} />
          </Route>

          <Route path='/' element={<AuthLayout />} >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/* Admin Layout */}
          <Route path='admin' element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path='products' element={<Products />} />
            <Route path='orders' element={<Orders />} />
          </Route>

          {/* 404 Not Found */}
          <Route path='*' element={<NotFound />} />


        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
