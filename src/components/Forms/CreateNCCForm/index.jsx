import { Form, Input, message, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import addressJson from "~/assets/address.json"
import * as NCCAPI from "~/redux/slices/NCC/index"
import { useDispatch } from 'react-redux'
const FormCreateNCC = (props) => {
  const {open,onCancel} = props;
  console.log({s:addressJson})
  const dispatch = useDispatch();
    const NCCForm = useFormik({
        initialValues:{
            name:"",
            phone:"",
            email:"",
            idDiaChi:null,
            diachiNavigation:{
                ProvinceName:"",
                ProvinceID:null,
                DistrictName:"",
                DistrictID:null,
                WardName:"",
                WardID:null,
            }
        },
        validationSchema:Yup.object({
          name:Yup.string("Trường này phải là chữ").required("Phải chọn trường này")
        })
    })
    const handleSubmit=()=>
    {
      if(NCCForm.values.name)
      {

        dispatch(NCCAPI.fetchPostNCC({body:NCCForm.values}))
      }
      else{
        message.open({
          content:"Phải điền tên nhà cung cấp!",
          type:"error",
        })
      }
    }
  return (
    <Modal  okText="Tạo mới" cancelText="Hủy" onOk={()=>handleSubmit()} title="Thêm nhà cung cấp" open={open} onCancel={()=>onCancel(false)}>
      <Form layout='vertical'>
    <Form.Item required label="Tên nhà cung cấp">
    <Input placeholder='Tên nhà cung cấp' name="name" values={NCCForm.values.name}  onChange={NCCForm.handleChange}/>
    </Form.Item>
    <Form.Item label="Số điện thoại">
    <Input placeholder='Số điện thoại' name="phone" values={NCCForm.values.phone}  onChange={NCCForm.handleChange}/>
    </Form.Item>
    <Form.Item label="Email">
    <Input placeholder='Email' name="email" values={NCCForm.values.email}  onChange={NCCForm.handleChange} />
    </Form.Item>
      <Form.Item label="Thành phố">
          <Select value={NCCForm.values.diachiNavigation.ProvinceID} onChange={(e)=>{
            NCCForm.setFieldValue("diachiNavigation.ProvinceID",e)
            NCCForm.setFieldValue("diachiNavigation.ProvinceName",addressJson[e]?.name_with_type)
            NCCForm.setFieldValue("diachiNavigation.DistrictID",null)
            NCCForm.setFieldValue("diachiNavigation.WardID",null)
          }}>
            <Select.Option value={null}>Chọn thành phố</Select.Option>
            {Object.keys(addressJson).map(item=>
{
  
 return <Select.Option value={item}>{addressJson[item]?.name_with_type}</Select.Option>

}
)}
          </Select>
      </Form.Item>
      <Form.Item label="Xã phường ">
          <Select value={NCCForm.values.diachiNavigation.DistrictID} onChange={(e)=>{
            NCCForm.setFieldValue("diachiNavigation.DistrictID",e)
            NCCForm.setFieldValue("diachiNavigation.DistrictName",addressJson[NCCForm?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][e]?.name_with_type)
            NCCForm.setFieldValue("diachiNavigation.WardID",null)
          }}>
            <Select.Option value={null}>Chọn quận huyện</Select.Option>
            {NCCForm.values.diachiNavigation.ProvinceID&&Object.keys(addressJson[`${NCCForm?.values?.diachiNavigation?.ProvinceID}`]["quan-huyen"]).map(item=>
              <Select.Option value={item}>{addressJson[NCCForm?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][item]?.name_with_type}</Select.Option>
              )}
          </Select>
      </Form.Item>
      <Form.Item label="Quận huyện ">
          <Select value={NCCForm.values.diachiNavigation.WardID} onChange={(e)=>{
            NCCForm.setFieldValue("diachiNavigation.WardID",e)
            NCCForm.setFieldValue("diachiNavigation.WardName",addressJson[NCCForm?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][NCCForm?.values?.diachiNavigation?.DistrictID]["xa-phuong"][e]?.name_with_type)
          }}>
            <Select.Option value={null}>Chọn xã phường</Select.Option>
            {NCCForm.values.diachiNavigation.DistrictID&&Object.keys(addressJson[`${NCCForm?.values?.diachiNavigation?.ProvinceID}`]["quan-huyen"][NCCForm?.values?.diachiNavigation?.DistrictID]["xa-phuong"]).map(item=>
              <Select.Option value={item}>{addressJson[NCCForm?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][NCCForm?.values?.diachiNavigation?.DistrictID]["xa-phuong"][item]?.name_with_type}</Select.Option>
              )}
          </Select>
      </Form.Item>
  </Form>
    </Modal>
  )
}

export default FormCreateNCC