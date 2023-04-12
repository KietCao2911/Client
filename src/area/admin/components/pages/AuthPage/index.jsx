import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import DangNhap from './pages/DangNhap/DangNhap'

const AuthPage = () => {
  return (
    <div>
        <Outlet/>
        <Routes>
            <Route path="dang-nhap" element={<DangNhap/>}>
            </Route>
        </Routes>
        
    </div>
  )
}

export default AuthPage