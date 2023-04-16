import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import TrangChinh from "./pages/TrangChinh"

const QuanTriKhoHang = () => {
  return (
   <>
   <Outlet/>
   <Routes>
    <Route element={<TrangChinh/>} path=''></Route>
   </Routes>
   </>
  )
}

export default QuanTriKhoHang