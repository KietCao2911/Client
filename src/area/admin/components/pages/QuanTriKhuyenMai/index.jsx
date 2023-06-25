import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import KhuyenMaiForm from './Form/KhuyenMaiForm'
import TrangChinh from './pages/TrangChinh/'
import CreateSale from './pages/Create'
const QuanTriKhuyenMai = () => {
  return (
    <div>
        <Routes>
            <Route path={""} element={<TrangChinh/>}></Route>
            <Route path={":id"}  element={<KhuyenMaiForm isReadOnly={true}/>}></Route>
            <Route path={"tao-moi"}  element={<CreateSale isCreated={true}/>}></Route>
        </Routes>
        <Outlet/>
    </div>
  )
}

export default QuanTriKhuyenMai