import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import PhieuNhapSlice, *as PhieuNhapAPI from '~/redux/slices/PhieuNhap/PhieuNhap'
import { v4 } from 'uuid'
import moment from 'moment/moment'
import { Outlet, Route, Routes ,Link, useNavigate} from 'react-router-dom'
import { Table,Button, Tooltip, Modal, Form } from 'antd'
import MyButton from '~/components/commomComponents/Button'
import { FileAddOutlined } from '@ant-design/icons'
import PhieuNhap from '../..'
const Columns = ()=>
{
    return [
        {
          title: "Mã phiếu nhập",
          dataIndex: "maPhieuNhap",
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
        {
            title:"Hành động",
            render:(_,record)=>
            {
              return <><Link to={"chi-tiet/"+record.maPhieuNhap}><Button>Xem</Button></Link></>
            }
        }
    ]
}

const MainPage = () => {
    const {items} = useSelector(state=>state.PhieuNhap);
    const dispatch = useDispatch();
    const nav= useNavigate();
    useEffect(()=>
    {
        dispatch(PhieuNhapAPI.fetchGetPhieuNhaps())
    },[])
    const handleAddPhieuNhap =async()=>
    {
      try {
        const res =await      dispatch(PhieuNhapAPI.fetchPostPhieuNhaps({body:{}}))
        if(res)
        {
          nav(`chi-tiet/${res.payload.maPhieuNhap}`)
        }
      } catch (error) {
        throw error
      }
    }
  return (
   <>
    <div className="PhieuNhapNav">
    <div className="Actions">
      <Tooltip  title="Thêm 1 phiếu nhập">
      <span onClick={()=>handleAddPhieuNhap()}  style={{maxWidth:"1.5rem",display:"inline-block"}} > <MyButton ><FileAddOutlined/></MyButton></span>
      </Tooltip>
    </div>
   </div>
    <Table columns={Columns()} dataSource={items}></Table >
   </>
  )
}

export default MainPage