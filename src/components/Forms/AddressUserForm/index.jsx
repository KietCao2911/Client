import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import InputText from '~/components/commomComponents/InputText';
import  *as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch,useSelector } from 'react-redux';
import MyButton from '~/components/commomComponents/Button';
import *as XacThucAPI from '~/redux/slices/XacThuc'
import { Col, Row, Space, message } from 'antd';
import SelectCustom,{Option} from '~/components/commomComponents/SelectCustom';
import CustomSpin from '~/components/CustomSpin';
import { useEffect } from 'react';
const AddressUserForm = () => {
    const dispatch = useDispatch();
    const {user,loading} = useSelector(state=>state.XacThuc)
    const { ghnAPI } = useSelector(state => state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const AddressUserForm = useFormik({
        initialValues:{
            Name: "",
            Phone: "",
            ProvinceName: "",
            DistrictName: "",
            WardName: "",
            ProvinceID: null,
            DistrictID: null,
            WardID: null,
            AddressDsc: "",
            Email: "",
            PaymendMethod: "COD",
          },
          initialTouched:{
            Name: false,
            Phone: false,
            ProvinceName: false,
            DistrictName: false,
            WardName: false,
            ProvinceID: false,
            DistrictID: false,
            WardID: false,
            AddressDsc: false,
            Email: false,
          },
          validationSchema:Yup.object({
            Name:Yup.string().required("Phải nhập trường này"),
            Phone:Yup.string().required("Phải nhập trường này").matches(phoneRegExp, 'Định dạng số điện thoại không đúng').min(10,"Số điện thoại phải hơn 10 chữ số").max(10,"Số điện thoại không quá 10 chữ số"),
            Email:Yup.string().required("Phải nhập trường này").matches(emailRegex,'Định dạng email không đúng'),
            ProvinceID:Yup.string().required("Phải nhập trường này"),
            DistrictID:Yup.string().required("Phải nhập trường này"),
            WardID:Yup.string().required("Phải nhập trường này"),
            PaymendMethod:Yup.string().required("Phải chọn trường này"),
            AddressDsc:Yup.string().required("Phải nhập trường này"),
          }),
          onSubmit:(values)=>
          {
            console.log({values});
          },
    })
    const handleChangeProvince = (id, name) => {
      AddressUserForm.setFieldValue("ProvinceName", name);
      AddressUserForm.setFieldValue("ProvinceID", id);
      AddressUserForm.setFieldValue("DistrictName", "");
      AddressUserForm.setFieldValue("DistrictID", null);
      AddressUserForm.setFieldValue("WardName", "");
      AddressUserForm.setFieldValue("WardID", null);
      dispatch(GiaoHangNhanhApi.fetchGetDistrict(id));
    };
    const handleChangeDistrict = (id, name) => {
      AddressUserForm.setFieldValue("DistrictName", name);
      AddressUserForm.setFieldValue("DistrictID", id);
      AddressUserForm.setFieldValue("WardName", "");
      AddressUserForm.setFieldValue("WardID", null);
      dispatch(GiaoHangNhanhApi.fetchGetWard(id));
    };
    const handleChangeWard=(id,name)=>
    {
      AddressUserForm.setFieldValue("WardName", name);
      AddressUserForm.setFieldValue("WardID", id);
    }
    const handleSave=()=>
    {
        const values = AddressUserForm.values;
        
        if(AddressUserForm.isValid)
        {

          dispatch(XacThucAPI.fetchAddAddress({body:{...values,tenTaiKhoan:user.userName.trim()}}))
        }
        else
        {
          console.log({errors:AddressUserForm.errors})
          message.open({
            content:"Chưa điền đủ thông tin",
            type:"error" 
          })
        }
    }
    useEffect(()=>
    {
      dispatch(GiaoHangNhanhApi.fetchGetProvinces())
    },[])
  return (
    <Space style={{width:"100%"}}  direction='vertical'>
     {loading&& <CustomSpin/>}
      <strong>Thêm địa chỉ mới</strong>
    <InputText  label="Tên" name="Name" value={AddressUserForm.values.Name} onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Name&&<span className='error'>{AddressUserForm.errors.Name}</span>}
    <InputText  name="AddressDsc" label="Chi tiết địa chỉ" value={AddressUserForm.values.AddressDsc} onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.AddressDsc&&<span className='error'>{AddressUserForm.errors.AddressDsc}</span>}

    <InputText   name="Phone" value={AddressUserForm.values.Phone} label="Số điện thoại" onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Phone&&<span className='error'>{AddressUserForm.errors.Phone}</span>}
<   InputText  value={AddressUserForm.values.Email} name="Email" label="Email" onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Email&&<span className='error'>{AddressUserForm.errors.Email}</span>}
    <Row gutter={[20, 20]}>

              <Col span={24}>
                <SelectCustom
                  value={AddressUserForm.values.ProvinceID || ""}
                  name={"ProvinceID"}
                >
                  <Option value={null}>Vui lòng chọn Tỉnh/Thành phố</Option>
                  {Provinces.data &&
                    Provinces.data.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeProvince(
                              item.ProvinceID,
                              item.ProvinceName
                            )
                          }
                          key={item.ProvinceID}
                          value={item.ProvinceID}
                        >
                          {item.ProvinceName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {AddressUserForm.errors.ProvinceID && (
                  <span className="error">{AddressUserForm.errors.ProvinceID}</span>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={AddressUserForm.values.DistrictID || ""}
                  loading={Loading.Districts}
                  name="DistrictID"
                  defaultLabel="Quận/Huyện"
                >
                  <Option value={""}>Vui lòng chọn Quận/Huyện</Option>
                  {Districts.data &&
                    Districts?.data?.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeDistrict(
                              item.DistrictID,
                              item.DistrictName
                            )
                          }
                          key={item.DistrictID}
                          value={item.DistrictID}
                        >
                          {item.DistrictName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {AddressUserForm.errors.DistrictID && (
                  <span className="error">{AddressUserForm.errors.DistrictID}</span>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={AddressUserForm.values.WardID || ""}
                  onChange={(e) => handleChangeWard(e)}
                  loading={Loading.Wards}
                  defaultLabel="Xã/Phường"
                  name="WardID"
                >
                  <Option value={""}>Vui lòng chọn Xã/Phường</Option>
                  {Wards.data &&
                    Wards?.data?.map((item) => {
                      return (
                        <Option
                          onClick={(e) => handleChangeWard(item.WardCode, item.WardName)}
                          value={item.WardCode}
                        >
                          {item.WardName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {AddressUserForm.errors.WardID && (
                  <span className="error">{AddressUserForm.errors.WardID}</span>
                )}
              </Col>
            </Row>
<div className="Actions">
<MyButton 
loading={loading}
onClick={()=>handleSave()}>LƯU</MyButton >
</div></Space>
  )
}

export default AddressUserForm