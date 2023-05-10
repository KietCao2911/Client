import { FloatButton, Form, Input, message, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import addressJson from "~/assets/address.json"
import * as BranchAPI from '~/redux/slices/Branch/BranchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from 'react-feather'
import { v4 } from 'uuid'
const CreateKhoHangForm = (props) => {
  const {open,setOpen} = props
  const {loading} = useSelector(state=>state.Branch)
  const dispatch = useDispatch();
    const FormBranch = useFormik({
        initialValues:{
            maChiNhanh:"",
            tenChiNhanh:"",
            phone:"",
            email:"",
            idDiaChi:null,
            diachiNavigation:{
                ProvincetenChiNhanh:"",
                ProvinceID:null,
                DistricttenChiNhanh:"",
                DistrictID:null,
                WardtenChiNhanh:"",
                WardID:null,
            }
        },
        validationSchema:Yup.object({
          tenChiNhanh:Yup.string("Trường này phải là chữ").required("Phải chọn trường này"),
        })
    })
    const handleSubmit=()=>
    {
      if(FormBranch.values.maChiNhanh&&FormBranch.values.tenChiNhanh)
      {
        const body = {...FormBranch.values}
        dispatch(BranchAPI.PostBranch(body))
      }
      else{
        message.open({
          content:"Phải điền tên chi nhánh",
          type:"error",
        })
      }
    }
  return (
<>
<Modal confirmLoading={loading} onOk={handleSubmit} open={open} onCancel={()=>setOpen(false)}>
    <Form.Item required label="Mã chi nhánh">
  <Input placeholder='Mã chi nhánh' name="maChiNhanh" values={FormBranch.values.maChiNhanh}  onChange={FormBranch.handleChange}/>
  </Form.Item>
  <Form.Item required label="Tên chi nhánh">
  <Input placeholder='Tên chi nhánh' name="tenChiNhanh" values={FormBranch.values.tenChiNhanh}  onChange={FormBranch.handleChange}/>
  </Form.Item>
  <Form.Item label="Số điện thoại">
  <Input placeholder='Số điện thoại' name="phone" values={FormBranch.values.phone}  onChange={FormBranch.handleChange}/>
  </Form.Item>
  <Form.Item label="Email">
  <Input placeholder='Email' name="email" values={FormBranch.values.email}  onChange={FormBranch.handleChange} />
  </Form.Item>
    <Form.Item label="Thành phố">
        <Select value={FormBranch.values.diachiNavigation.ProvinceID} onChange={(e)=>{
          FormBranch.setFieldValue("diachiNavigation.ProvinceID",e)
          FormBranch.setFieldValue("diachiNavigation.ProvincetenChiNhanh",addressJson[e]?.name_with_type)
          FormBranch.setFieldValue("diachiNavigation.DistrictID",null)
          FormBranch.setFieldValue("diachiNavigation.WardID",null)
        }}>
          <Select.Option value={null}>Chọn thành phố</Select.Option>
          {Object.keys(addressJson).map(item=>
          {

            return <Select.Option key={v4()} value={item}>{addressJson[item.toString()]?.name_with_type}</Select.Option>
          }
            )}
        </Select>
    </Form.Item>
    <Form.Item label="Xã phường ">
        <Select value={FormBranch.values.diachiNavigation.DistrictID} onChange={(e)=>{
          FormBranch.setFieldValue("diachiNavigation.DistrictID",e)
          FormBranch.setFieldValue("diachiNavigation.DistricttenChiNhanh",addressJson[FormBranch?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][e]?.name_with_type)
          FormBranch.setFieldValue("diachiNavigation.WardID",null)
        }}>
          <Select.Option value={null}>Chọn quận huyện</Select.Option>
          {FormBranch.values.diachiNavigation.ProvinceID&&Object.keys(addressJson[`${FormBranch?.values?.diachiNavigation?.ProvinceID}`]["quan-huyen"]).map(item=>
          {
           
            return <Select.Option key={v4()} value={item}>{addressJson[FormBranch?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][item.toString()]?.name_with_type}</Select.Option>
          }
            )}
        </Select>
    </Form.Item>
    <Form.Item label="Quận huyện ">
        <Select value={FormBranch.values.diachiNavigation.WardID} onChange={(e)=>{
          FormBranch.setFieldValue("diachiNavigation.WardID",e)
          FormBranch.setFieldValue("diachiNavigation.WardtenChiNhanh",addressJson[FormBranch?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][FormBranch?.values?.diachiNavigation?.DistrictID]["xa-phuong"][e]?.name_with_type)
        }}>
          <Select.Option value={null}>Chọn xã phường</Select.Option>
          {FormBranch.values.diachiNavigation.DistrictID&&Object.keys(addressJson[`${FormBranch?.values?.diachiNavigation?.ProvinceID}`]["quan-huyen"][FormBranch?.values?.diachiNavigation?.DistrictID]["xa-phuong"]).map(item=>
            <Select.Option key={v4()} value={item}>{addressJson[FormBranch?.values?.diachiNavigation?.ProvinceID]["quan-huyen"][FormBranch?.values?.diachiNavigation?.DistrictID]["xa-phuong"][item]?.name_with_type}</Select.Option>
            )}
        </Select>
    </Form.Item>

</Modal>
</>
  )
}

export default CreateKhoHangForm