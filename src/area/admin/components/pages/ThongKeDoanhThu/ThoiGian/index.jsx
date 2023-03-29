import React from 'react'
import moment from "moment/moment";
import { Bar } from "react-chartjs-2";
import TongQuan from './pages/TongQuan';
import ChiTiet from './pages/ChiTiet';

import { Link, Route, Routes, useParams } from 'react-router-dom';
import Test from './Test';
  

const ThoiGian = () => {
    const params= useParams()
    console.log({param2:params})
  return (
    <div>
            <Link to="tong-quan" className={`btn ${params["*"]=="tong-quan"?"active":false}`}>Tổng quan</Link>
            <Link to="chi-tiet" className={`btn ${params["*"]=="chi-tiet"?"active":false}`}>Chi tiết</Link>
        <div className="action">
           
        </div>
        <div className="Content">
            <Routes>
                <Route path='chi-tiet' element={<ChiTiet/>}></Route>
                <Route path='tong-quan' element={<TongQuan/>}></Route>
            </Routes>
        </div>
        
    </div>
  )
}

export default ThoiGian;