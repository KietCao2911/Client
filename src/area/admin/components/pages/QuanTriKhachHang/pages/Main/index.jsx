import React,{useEffect} from 'react'
import * as KhachHangAPI from '~/redux/slices/KhachHang/KhachHangSlice'
import { Button, Table } from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const Columns=()=>
{
    return [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'id',
          },
          {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'id',
          },
          {
            title: 'Địa chỉ',
            render:(_,record)=>
            {
                return <p>{record.addressDsc},{record.wardName},{record.districtName},{record.provinceName}</p>
            }
          },
          {
            title:"Hành động",
            render:(_,record)=>
            {
                return <>
                    <Link to={"chinh-sua/"+record.id}> <Button >Sửa</Button></Link>
                    <Button danger>Xóa</Button>
                </>
            }
          }
    ]
}
const MainKhachHang = () => {
    const dispatch = useDispatch();
    const {items,item} = useSelector(state=>state.KhachHang)
    console.log(items)
    useEffect(()=>
    {
        dispatch(KhachHangAPI.fetchGetAllKhachHang({}))
    },[])
  return (
        <Table dataSource={items} columns={Columns()}></Table>
  )
}

export default MainKhachHang