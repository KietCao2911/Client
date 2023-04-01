import React from 'react'
import "./ProductInfoItem.scss"
import {CloseOutlined} from "@ant-design/icons"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GioHangSlice,{RemoveItem} from '~/redux/slices/GioHang/GioHangSlice'
import *as APIKichCo from '~/redux/slices/KichCoSlice'
import convertVND from '~/components/utils/ConvertVND'
import { useEffect,useState } from 'react'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import { Col, Form, Row, Select, Space } from 'antd'
import { v4 } from 'uuid'
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
import { UpdateQtyItem } from '~/redux/slices/GioHang/GioHangSlice'
import { X } from 'react-feather'
import { BASE_URL } from '~/const'
const MyOptions =({number,qty,onChange,data})=>
{
    const {color,masanpham,size} = data;
    const [numberTemp,setNumberTemp] = useState(number||0);
    let count = numberTemp;
    let arr = []
    const dispatch = useDispatch();
    for(var i = 1 ;i<=count;i++)
    {
        arr.push(<Select.Option key={v4()} value={i}>{i}</Select.Option>)     
    }
    const handleClickGetQty =async() =>
    {
        const res= await fetchGetQTY(masanpham,color.colorId,size.idSize);
        setNumberTemp(res);
    }
    const handleChangeQty = (e)=>
    {
        dispatch(UpdateQtyItem({maSP:masanpham,colorId:color,sizeId:size,qty:e}))
    }
    return (
        <Select defaultValue={qty} onChange={(e)=>handleChangeQty(e)} onClick={handleClickGetQty}>
            <Select.Option value={null}>Chọn số lượng</Select.Option>
            {arr}
        </Select>
    );
}
function ProductInfoItem(props) {
    
    const {donGia,soLuong,maSanpham,sanPhamNavigation,removeItemFnc} = props;
    const {Qty} = useSelector(state=>state.KichCo)
const dispatch =useDispatch();
    useEffect(()=>
    {
        dispatch(APIKichCo.fetchGetQty({maSanpham}))
    },[])
    const handleRemoveItem =()=>
    {
       if(removeItemFnc)removeItemFnc();
       
    }
    const handleUpdateQty=(e)=>
    {
       console.log(e)
    }
  return (
    <Link to={"#"} className='PrductInfoItem' {...props}>
    <X  style={{display:`${!removeItemFnc&&"none"}`,zIndex:"99"}} className="closeIcon" onClick={handleRemoveItem}/>
    <div className="Container">
        <Row>

        <Col md={6} xs={10} className="img">

            <img src={BASE_URL+"wwwroot/res/SanPhamRes/Imgs/" + sanPhamNavigation?.parentID?.trim() + "/" + sanPhamNavigation?.idColor?.trim() + "/" + sanPhamNavigation?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim()|| "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
        </Col>
        <Col className="content" md={18} xs={14}>
            <Row>
                <Col md={24}>
                <div className="name">
            <h4>{sanPhamNavigation.tenSanPham||"CAMPUS 80S SOUTH PARK TOWELIE"}</h4>
            </div>
            <p>{convertVND(sanPhamNavigation.giaBanLe)||"---"}</p>
                </Col>
                <Col md={24}>
                <Form initialValues={0}>
               <Space  direction='
               ' >
               <Form.Item label="Kích cỡ">
                    <span>{sanPhamNavigation?.idSize}</span>
                </Form.Item>
                <Form.Item label="Màu sắc">
                <span class="color" style={{backgroundColor:sanPhamNavigation?.idColor}}></span>
                </Form.Item>
                <Form.Item label="Số lượng" name={"qty"}>
                    <MyOptions number={9} qty={soLuong} onChange={handleUpdateQty} data={props} ></MyOptions>
                </Form.Item>
               </Space>
            </Form>
                </Col>
            </Row>
           
           

        </Col>
        </Row>
    </div>
    </Link>
  )
}

export default ProductInfoItem