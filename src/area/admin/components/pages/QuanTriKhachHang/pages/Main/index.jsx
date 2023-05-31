import React,{useEffect} from 'react'
import * as KhachHangAPI from '~/redux/slices/KhachHang/KhachHangSlice'
import { Button, Space, Table } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import convertVND from '~/components/utils/ConvertVND'
const Columns=()=>
{
    return [
        {
            title: '#ID',
            dataIndex: 'tenTaiKhoan',
            key: 'id',
          },
          {
            title: 'Tên hội viên',
            render:(_,record)=>
            {
              return<p>
                {record?.tenHienThi}
                </p>
            }
          },
          {
            title: 'Số lần mua hàng',
            dataIndex: 'soLanMuaHang',
            key: 'id',
          },
          {
            title: 'Số tiền đã thanh toán',
           render:(_,record)=>
           {
            return <p>{convertVND(record?.tienThanhToan)}</p>
           }
          },
          {
            title:"Hành động",
            render:(_,record)=>
            {
                return <Space>
                    <Button danger>Chặn</Button>
                </Space>
            }
          }
    ]
}
const MainKhachHang = () => {
    const dispatch = useDispatch();
    const {members} = useSelector(state=>state.Member)
    console.log({members})
    useEffect(()=>
    {
        dispatch(KhachHangAPI.fetchGetAllKhachHang({}))
    },[])
  return (
        <Table  dataSource={members} columns={Columns()}></Table>
  )
}

export default MainKhachHang