import { Col, Row, Space } from 'antd'
import React, { useState } from 'react'
import InputText from '~/components/commomComponents/InputText'
import "./ChildProduct.scss"
import { useTransition } from 'react'
import { memo } from 'react'
const ChildProduct=(props) =>{
    const {value,versions,setVersions,parentIndex,index} = props;
    const {soLuongTon,giaVon,giaBanLe,giaBanSi,tenSanPham} = value;
    const [pending, startTransition] = useTransition();
    const handleChange=(e,fieldName)=>
    {
        versions[parentIndex][index][fieldName] = e.target.value;
        startTransition(()=>
        {
          setVersions([...versions])
        })
    }
  return (
    <div className='ChildProduct'>
       <Row gutter={[20]}>
        
       <Col xl={4}>
            <InputText value={tenSanPham||""} disable label="Tên phiên bản" disabled/>
        </Col>
        <Col xl={4}>
        <InputText label="Mã CTK" onChange={(e)=>handleChange(e,"maSanPham")} ></InputText>
        </Col>
        <Col xl={4}>
            <InputText label="Giá bán lẻ" value={giaBanLe||0} placeHolder="Giá bán lẻ" onChange={(e)=>handleChange(e,"giaBanLe")}/>
        </Col>
        <Col xl={4}>
            <InputText label="Giá bán sỉ" value={giaBanSi||0} placeHolder="Giá bán sỉ" onChange={(e)=>handleChange(e,"giaBanSi")}/>
        </Col>
        <Col xl={4}>
            <InputText label="Số lượng tồn" value={soLuongTon||0} placeHolder="Số lượng tồn" onChange={(e)=>handleChange(e,"soLuongTon")} />
        </Col>
        <Col xl={4}>
            <InputText label="Giá vốn" value={giaVon||0} placeHolder="Giá vốn" onChange={(e)=>handleChange(e,"giaVon")}/>
        </Col>
       </Row>
    </div>
  )
}

export default memo(ChildProduct)