import { FloatButton, Table } from 'antd'
import React, { useEffect } from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
    const nav = useNavigate()
    const {khuyenmais} = useSelector(state=>state.KhuyenMai)
    console.log({khuyenmais})
    useEffect(()=>
    {
        dispatch(KhuyenMaiApi.GetKhuyenMaisThunk());
    },[])
  return (
   <>
   <FloatButton onClick={()=>nav('tao-moi')} icon={<Plus/>} tooltip="Thêm 1 chương trình khuyến mãi"></FloatButton>
    <Table rowClassName={"icon"} onRow={(record,index)=>
    {
      return {
        onClick:(e)=>nav(`${record?.id}`)
      }
    }} columns={columns||[]} dataSource={khuyenmais}></Table>
   </>
  )
}

export default TrangChinh