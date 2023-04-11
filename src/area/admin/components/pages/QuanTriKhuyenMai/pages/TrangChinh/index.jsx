import { Table } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as KhuyenMaiApi from '~/redux/slices/KhuyenMai'
const columns=[{
    title:"Tên khuyến mãi",
    render:(_,record)=>
    {
      console.log({record})
        return <Link to={`${record?.id}`}>{record?.tenKhuyenMai}</Link >
    }
}]
const TrangChinh = () => {
    const dispatch = useDispatch();
    const {khuyenmais} = useSelector(state=>state.KhuyenMai)
    console.log({khuyenmais})
    useEffect(()=>
    {
        dispatch(KhuyenMaiApi.GetKhuyenMaisThunk());
    },[])
  return (
    <Table columns={columns||[]} dataSource={khuyenmais}></Table>
  )
}

export default TrangChinh