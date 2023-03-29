import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { v4 } from 'uuid'
import moment from 'moment/moment'
import convertVND from '~/components/utils/ConvertVND'
const columns=()=>
{
    return [
        {
            title:"Mã sản phẩm",
            dataIndex:'maSanPham',
            render:(_,record)=>
            {
                return <p>{`${record.sanPhamNavigation.maSanPham} ` }</p>
               
            }
        },
        {
            title:"Tên sản phẩm",
            render:(_,record)=>
            {
                return <p>{`${record.sanPhamNavigation.tenSanPham} ` }</p>
               
            }
        },   
        {
            title:"Số lượng nhập",
            render:(_,record)=>
            {
                return <p>{record.soLuong||0}</p>
            }
        }, 
        {
            title:"Giá trị nhập",
            render:(_,record)=>
            {
                return <p>{convertVND((record.sanPhamNavigation.giaBan*record.soLuong)*1.1) ||0}</p>
            }
        },   
        {
            title:"Ngày nhập",
            render:(_,record)=>
            {
                return <p>{moment(record.phieuNhapNavigation.ngayNhap).format("DD-MM-YYYY")}</p>
            }
        }
    ]
}

const NhapXuatTon = () => {
    const {XuatNhap} = useSelector(state=>state.ThongKe);
    
    console.log({XuatNhap})
  return (
    <Table columns={columns()} dataSource={XuatNhap.values}></Table>
  )
}

export default NhapXuatTon