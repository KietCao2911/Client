import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import InputText from '~/components/commomComponents/InputText';
import { SelectInput } from '~/components/commomComponents/SelectInput';
import  *as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import { useDispatch,useSelector } from 'react-redux';
import MyButton from '~/components/commomComponents/Button';
import *as XacThucAPI from '~/redux/slices/XacThuc'
const AddressUserForm = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.XacThuc)
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
            WardId: null,
            AddressDsc: "",
            Email: "",
            PaymendMethod: "COD",
          },
          validationSchema:Yup.object({
            Name:Yup.string().required("Phải nhập trường này"),
            Phone:Yup.string().required("Phải nhập trường này").matches(phoneRegExp, 'Định dạng số điện thoại không đúng').min(10,"Số điện thoại phải hơn 10 chữ số").max(10,"Số điện thoại không quá 10 chữ số"),
            Email:Yup.string().required("Phải nhập trường này").matches(emailRegex,'Định dạng email không đúng'),
            ProvinceID:Yup.number().nullable(true).required("Phải chọn trường này"),
            DistrictID:Yup.number().nullable(true).required("Phải chọn trường này"),
            WardId:Yup.number().nullable(true).required("Phải chọn trường này"),
            PaymendMethod:Yup.string().required("Phải chọn trường này"),
            AddressDsc:Yup.string().required("Phải nhập trường này"),
          }),
          onSubmit:(values)=>
          {
            console.log({values});
          },
    })
    const handleChangeProvince =(e)=>
    {
        AddressUserForm.setFieldValue("ProvinceName",e.target.options[e.target.selectedIndex].text)
        AddressUserForm.setFieldValue("ProvinceID",e.target.value)
        dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
    }
    const handleChangeDistrict=(e)=>
    {
        AddressUserForm.setFieldValue("DistrictName",e.target.options[e.target.selectedIndex].text)
        AddressUserForm.setFieldValue("DistrictID",e.target.value)
        dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))
    }
    const handleChangeWard=(e)=>
    {
        AddressUserForm.setFieldValue("WardName",e.target.options[e.target.selectedIndex].text)
        AddressUserForm.setFieldValue("WardId",e.target.value)
    }
    const handleSave=()=>
    {
        const values = AddressUserForm.values;
        dispatch(XacThucAPI.fetchAddAddress({body:{...values,tenTaiKhoan:user.userName.trim()}}))
    }
  return (
    <div><strong>Thêm địa chỉ mới</strong>
    <InputText placeHolder="Tên của bạn" label="Tên" name="Name" value={AddressUserForm.values.Name} onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Name&&<span className='error'>{AddressUserForm.errors.Name}</span>}
    <InputText placeHolder="Mô tả thêm về địa chỉ của bạn"  name="AddressDsc" label="Chi tiết địa chỉ" value={AddressUserForm.values.AddressDsc} onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.AddressDsc&&<span className='error'>{AddressUserForm.errors.AddressDsc}</span>}

    <InputText  placeHolder="Điện thoại liên hệ" name="Phone" value={AddressUserForm.values.Phone} label="Số điện thoại" onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Phone&&<span className='error'>{AddressUserForm.errors.Phone}</span>}
<   InputText placeHolder="Email liên lạc" value={AddressUserForm.values.Email} name="Email" label="Email" onChange={AddressUserForm.handleChange}/>
    {AddressUserForm.errors.Email&&<span className='error'>{AddressUserForm.errors.Email}</span>}
    <div className="SelectAddressGroup">
    <SelectInput  loading={Loading.Provinces} name="province" defaultLabel="Tỉnh/Thành phố" onChange={e=>handleChangeProvince(e)}>
<option value={""}>Vui lòng chọn Tỉnh/Thành phố</option>
{Provinces.data&&Provinces.data.map(item=>{
return <option  key ={item.ProvinceID}value={item.ProvinceID}>{item.ProvinceName}</option>
})}
</SelectInput>
<SelectInput loading={Loading.Districts} name="district" defaultLabel="Quận/Huyện" onChange={e=>handleChangeDistrict(e)}>
<option value={""}>Vui lòng chọn Quận/Huyện</option>
{Districts.data&& Districts?.data?.map(item=>{
return <option key ={item.DistrictId} value={item.DistrictID}>{item.DistrictName}</option>
})}
</SelectInput> 
<SelectInput  loading={Loading.Wards}  defaultLabel="Xã/Phường" name="ward" onChange={(e)=>handleChangeWard(e)}>
<option value={""}>Vui lòng chọn Xã/Phường</option>
{Wards.data&& Wards?.data?.map(item=>{
return <option value={item.WardCode}>{item.WardName}</option>
})}
</SelectInput>
    </div>
<div className="Actions">
<MyButton onClick={()=>handleSave()}>LƯU</MyButton>
<MyButton>Hủy</MyButton>
</div></div>
  )
}

export default AddressUserForm