import { Button, FloatButton, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import StickyActions from '~/components/commomComponents/stickyActions'
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
    const Actionsbtn=(
      <Space>
        
        <Link to="tao-moi"><Button  type='primary' > Tạo khuyến mãi mới</Button></Link>
      </Space>
    )
  return (
   <Space direction='vertical' style={{width:"100%"}}>
     <StickyActions Actionsbtn={Actionsbtn}/>
    <Table rowClassName={"icon"} onRow={(record,index)=>
    {
      return {
        onClick:(e)=>nav(`${record?.id}`)
      }
    }} columns={columns||[]} dataSource={khuyenmais}></Table>
   </Space>
  )
}

export default TrangChinh