import { Button, Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  * as PhieuNhapAPI from "~/redux/slices/PhieuNhap/PhieuNhap"
import convertVND from '~/components/utils/ConvertVND'
import MyButton from '~/components/commomComponents/Button'
import { FilePlus } from 'react-feather'
const columns=[
  {
    title:"Mã phiếu nhập",
    render:(_,record)=>
    {
      return <p>#{record.id}</p>
    }
  },
  {
    title:"Thành tiền",
    render:(_,record)=>
    {
      return <p>{convertVND(record.thanhTien||0)}</p>
    }
  },
  {
    title:"Thanh toán",
    render:(_,record)=>
    {
      return <p>{record.daThanhToan?"Đã thanh toán":"Chưa thanh toán"}</p>
    }
  },
  {
    title:"Số lượng nhập",
    render:(_,record)=>
    {
      return <p>{record.tongSoLuong||0}</p>
    }
  },
  {
    title:"Nhập kho",
    render:(_,record)=>
    {
      console.log({record})
      return <p>{record.daNhapHang?"Đã Nhập kho":"Chưa nhập kho"}</p>
    }
  },
  {
    title:"Trạng thái",
    render:(_,record)=>
    {
      return <p>{`${record.status==0?"Đang xử lý":record.status==1?"Đã hoàn thành":"Đã bị hủy"}`}</p>
    }
  },
  {
    title:"Hành động",
    render:(_,record)=>
    {
      return <Link to={`${record.id}`}><Button>Xem</Button></Link>
    }
  },
  
  
]

const TrangChinh = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state=>state.PhieuNhap)

  useEffect(()=>
{
  dispatch(PhieuNhapAPI.fetchGetPhieuNhaps())
},[])
  return (
    <>
    <Space><Link to="tao-moi">
      <MyButton icon={<FilePlus/>}>Tạo mới phiếu nhập  </MyButton>
    </Link></Space>
    <Table columns={columns} dataSource={items}>
        
    </Table>
    </>
  )
}

export default TrangChinh