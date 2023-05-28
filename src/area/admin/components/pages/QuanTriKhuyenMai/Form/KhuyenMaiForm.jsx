import { Card, Col, Row, Space,DatePicker, FloatButton, message, Button } from 'antd';
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import TableProductKN from '../components/TableProductKN';
import InputText from '~/components/commomComponents/InputText';
import List from '~/components/commomComponents/List';
import ItemResult from '~/components/commomComponents/List/compoenents/ItemResult';
import  * as SanPhamAPI from '~/redux/slices/SanPham';
import { useDispatch, useSelector } from 'react-redux';
import MyCollapse from '~/components/commomComponents/Collapse';
import * as KhuyenMaiAPI from '~/redux/slices/KhuyenMai';
import { useParams } from 'react-router-dom';
import CustomSpin from '~/components/CustomSpin';
import StickyActions from '~/components/commomComponents/stickyActions';
const { RangePicker } = DatePicker;
const KhuyenMaiForm = (props) => {
  const {isCreated,isUpdate,isReadOnly} = props;
  const [productSearchText,setProductSearchText] = useState("");
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.SanPham)
  const {khuyenmai,loading} = useSelector(state=>state.KhuyenMai)
  const {id} = useParams();
  const Form = useFormik({
    initialValues:{
      maDotKhuyenMai:khuyenmai?.maDotKhuyenMai||"",
      tenKhuyenMai:khuyenmai.tenKhuyenMai||"",
      moTa:khuyenmai.mota||"",
      ngayBatDau:khuyenmai?.ngayBatDau||Date.now().toString(),
      ngayKetThuc:khuyenmai?.ngayKetThuc||Date.now().toString(),
      giaTriGiamGia:khuyenmai?.giaTriGiamGia||0,
      kieuGiaTri:khuyenmai?.kieuGiaTri||0,
      trangThai:khuyenmai?.trangThai||0,
      chiTietKhuyenMais:khuyenmai?.chiTietKhuyenMais||[],
    }
  })
  const reRemder =useMemo(()=>
  {
    if(isReadOnly||isUpdate)
    {
      Form.setValues({...khuyenmai})
    }
  },[khuyenmai])
  const handleOnClickProduct=(product)=>
  {
    const temp = [...Form.values.chiTietKhuyenMais];
    const isExist =temp&&temp.length>0? temp.some(x=>x.maSanPham==product.maSanPham):false;
    if(isExist)
    {
      message.open({
        content:"Sản phẩm đã được thêm",
        type:"error"
      })
      return;
    }
    
    const chiTietKhuyenMai = {
      maSanPham:product.maSanPham,
      kieuGiaTri:0,
      giaTri:0,
      thanhTien:0,
      sanPhamNavigation:{...product}
    }
    temp.push(chiTietKhuyenMai);
    Form.setFieldValue("chiTietKhuyenMais",[...temp])
  }
  const handleSearchProducts = (e)=>
  {
    dispatch(SanPhamAPI.fetchGetAllProducts({s:e}))
  }
  const handleChangeDate=(date)=>
  {

    const dateStart =date[0];
    const dateEnd = date[1]
    console.log({dateStart:dateStart.toString(),dateEnd:dateEnd.toString()})
    Form.setFieldValue("ngayBatDau",dateStart);
    Form.setFieldValue("ngayKetThuc",dateEnd);
  }
  const handleSubmit=()=>
  {
    if(isCreated)
    {
      dispatch(KhuyenMaiAPI.PostKhuyenMaiThunk({body:Form.values}))
    }
  }
  const handleApply =()=>
  {
    dispatch(KhuyenMaiAPI.PutApplyKhuyenMaiThunk({body:Form.values}))
  }
  useEffect(()=>
  {
    if(isUpdate||isReadOnly)
    {
      dispatch(KhuyenMaiAPI.GetKhuyenMaiThunk({id}))
    }
  },[id])
  const handleCancel =()=>
  {
    dispatch(KhuyenMaiAPI.PutCancelKhuyenMai({body:Form.values}))
  }
  const Actionsbtn=(
    <Space>
        {isCreated&&        <Button  onClick={handleSubmit}> Xác nhận thêm</Button>}
            {isUpdate&&        <Button  onClick={handleSubmit}>Xác nhận sửa</Button>}
                    {(isReadOnly||isUpdate)&&(Form.values.trangThai==0?<Button  onClick={handleApply}>Áp dụng khuyến mãi</Button>:Form.values.trangThai==1?<Button  onClick={handleCancel}>Hủy áp dụng</Button>:null)}
    </Space>
  )
  return (
    <Row gutter={[20,20]}>
        
      <Col md={24}>
        <StickyActions Actionsbtn={Actionsbtn}/>
         </Col>
      <Col md={24}>
        <Row gutter={[20,20]}>
          <Col md={18}>
          <Card title="Nội dung khuyến mãi">
            <Space style={{width:"100%"}} direction='vertical'>
            <Space >
              <div>Tên khuyến mãi:</div>
              <InputText value={Form.values?.tenKhuyenMai} label="Tên khuyến mãi" onChange={e=>Form.setFieldValue("tenKhuyenMai",e.target.value)}/>
             </Space>
             <Space>
             <div>Thời gian khuyến mãi:</div>
              <RangePicker onChange={(e)=>handleChangeDate(e)} format={"DD/MM/YYYY"}/>
             </Space>
             <MyCollapse label="Mô tả chi tiết">

</MyCollapse>
            </Space>
          
        </Card>
          </Col>
          <Col md={6}>
            <Card title="Chi nhánh"></Card>
          </Col>
        </Row>
      </Col>
      <Col md={24}>
        <Space direction='vertical' style={{width:"100%"}}>
        <InputText label="Chọn sản phẩm giảm giá" onChange={(e)=>handleSearchProducts(e.target.value)}/>
        <List >
          {products&&products.length>0&&products.map(product=>
            {

          return <ItemResult onItemClick={()=>handleOnClickProduct(product)} labelProps={{
            name:product.tenSanPham
          }}/>
            })}
        </List>
        <TableProductKN form={Form} isEdit={isCreated||isUpdate?true:false} source={Form.values?.chiTietKhuyenMais||[]}/>
        </Space>
      </Col>
     
    </Row>
  )
}

export default KhuyenMaiForm