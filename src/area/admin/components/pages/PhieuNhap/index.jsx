import { Button, Table } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { v4 } from 'uuid'
import PhieuNhapSlice, *as PhieuThuAPI from '~/redux/slices/PhieuNhap/PhieuNhap'
import moment from 'moment/moment'
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ChiTietPage from './pages/ChiTietPage'
import MyButton from '~/components/commomComponents/Button'
const columns = ()=>
{
    return [
        {
          title: "Mã phiếu nhập",
          dataIndex: "maPhieuNhap",
          key:v4()
        },
        {
            title:"Đơn vị tính",
            dataIndex: "dvt",
            key:v4()
        },
        {
            title:"Ngày nhập",
            dataIndex: "ngayNhap",
            render:(_,record)=>
            {
              return <p>{moment(record.ngayNhap).format("DD-MM-YYYY hh:mm:ss")}</p>
            }
        },
       
    ]
}

const PhieuNhap = () => {
    const {items} = useSelector(state=>state.PhieuNhap);
    const dispatch = useDispatch();
    useEffect(()=>
    {
        dispatch(PhieuThuAPI.fetchGetPhieuNhaps())
    },[])
  return (
     <>
    
     <Outlet/>
      <Routes>
        <Route element={<MainPage/>} path="/"></Route>
        <Route element={<ChiTietPage/>} path="chi-tiet/:id"></Route>
      </Routes>
     </>
    )
}

export default PhieuNhap