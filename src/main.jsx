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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='collection' element={<Collection />} />
        <Route path='contact' element={<Contact />} />
      </Routes>

      <Routes path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
      </Routes>

      <Routes path='/auth' element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>

    </Router>
  </StrictMode>,
)
