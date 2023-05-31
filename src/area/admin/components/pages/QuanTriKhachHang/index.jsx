import { Button, Table } from 'antd'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import *as MemberAPI from '~/redux/slices/Member'
import EditKhacHang from './pages/Edit'
import MainKhachHang from './pages/Main'


const QuanTriKhachHang = () => {
    const dispatch = useDispatch();
    useEffect(()=>
    {
        dispatch(MemberAPI.getAllMembers({}))
    },[])
  return (
    <>
        <Routes>
            <Route path="/" element={<MainKhachHang/>}></Route>
            <Route path="/chinh-sua/:id" element={<EditKhacHang/>}></Route>
        </Routes>
    </>
  )
}

export default QuanTriKhachHang