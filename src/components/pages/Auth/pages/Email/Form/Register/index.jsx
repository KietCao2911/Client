import { Checkbox, Space, notification } from 'antd'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CustomSpin from '~/components/CustomSpin'
import MyButton from '~/components/commomComponents/Button'
import InputText from '~/components/commomComponents/InputText'
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import * as YUP from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'react-feather'
const EmailRegisterForm = () => {
    const {loading} = useSelector(state=>state.XacThuc)
    const dispatch = useDispatch();
    const regexEmail="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
    const [showPassword,setShowPassword] = useState(false) ;
    const Form = useFormik(
        {
         initialValues:{
          tenTaiKhoan:"",
          matKhau:"",
          tenHienThi:"",
          nhapLaiMatKhau:""
         }, 
         initialErrors:{
          tenTaiKhoan:"Vui lòng nhập trường này",
          matKhau:"Vui lòng nhập trường này",
          nhapLaiMatKhau:"",
          tenHienThi:"",
         },
         initialTouched:{
          tenTaiKhoan:false,
          matKhau:false,
          nhapLaiMatKhau:false,
          tenHienThi:false,
         },
  
         onSubmit:(values)=>
         {
          const params = {
            tenHienThi:values.tenHienThi,
            tenTaiKhoan:values.tenTaiKhoan,
            matKhau:values.matKhau,
          }
          dispatch(XacThucAPI.EmailRegister({body:params}))
         },
    validationSchema:YUP.object({
      tenHienThi:YUP.string().required("Vui lòng nhập trường này"),
      tenTaiKhoan:YUP.string().required("Vui lòng nhập trường này").matches(regexEmail,"Email sai định dạng"),
      matKhau:YUP.string().required("Vui lòng nhập trường này").matches(/[A-Z]/,"Phải có ít nhất một từ viết hoa")
      .matches( /[!@#$%^&*()_,.?":{}|<>]/,"Phải có ký tự đặc biệt (_,+,@,...").min(8,"Tối thiểu 8 kí tự").max(15,"Tối đa 15 kí tự."),
      
      nhapLaiMatKhau: YUP.string().required("Phải nhập trường này")
      .oneOf([YUP.ref('matKhau'), null], 'Mật khẩu nhập lại không khớp')
    }),
    
        }
      );
  return (
    <div>
    <Space style={{width:"100%"}} direction='vertical'>
     
    <form  onSubmit={Form.handleSubmit}>
   <Space style={{width:"100%"}} direction='vertical'>
   <InputText  onBlur={Form.handleBlur} className={` ${Form.touched.tenHienThi&&Form.errors.tenHienThi?"error":""}`} onChange={Form.handleChange} value={Form.values.tenHienThi} name="tenHienThi" label="Tên người dùng"></InputText>
   {<span className=' error'>{Form.touched.tenHienThi&&Form.errors.tenHienThi&&Form.errors.tenHienThi}</span>}
   <InputText icon={<User/>} onBlur={Form.handleBlur} className={` ${Form.touched.tenTaiKhoan&&Form.errors.tenTaiKhoan?"error":""}`} onChange={Form.handleChange} value={Form.values.tenTaiKhoan} name="tenTaiKhoan" label="Email"></InputText>
   {<span className=' error'>{Form.touched.tenTaiKhoan&&Form.errors.tenTaiKhoan&&Form.errors.tenTaiKhoan}</span>}

      <InputText type={`${showPassword?"text":"password"}`}icon={showPassword?<Eye onClick={()=>setShowPassword(false)}/>: <EyeOff onClick={()=>setShowPassword(true)}/>} onBlur={Form.handleBlur} 
      className={` ${Form.touched.matKhau&&Form.errors.matKhau?"error":""}`} 
      onChange={Form.handleChange}  value={Form.values.matKhau} name="matKhau"  label="Mật khẩu"></InputText>
      {<span className='error'>{Form.touched.matKhau&&Form.errors.matKhau&&Form.errors.matKhau}</span>}
      <InputText type={`${showPassword?"text":"password"}`}icon={showPassword?<Eye onClick={()=>setShowPassword(false)}/>: <EyeOff onClick={()=>setShowPassword(true)}/>} onBlur={Form.handleBlur} className={` ${Form.touched.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau?"error":""}`} onChange={Form.handleChange}  value={Form.values.nhapLaiMatKhau} name="nhapLaiMatKhau"  label="Nhập lại mật khẩu"></InputText>
      {<span className='error'>{Form.touched.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau}</span>}
      <Checkbox value={true}>Tôi đồng ý với điều khoản</Checkbox>
      <MyButton loading={loading} type="submit" >
        <strong>Đăng ký</strong>
      </MyButton>
      <small>Nếu đã có tài khoản, <Link to={"../dang-nhap"}>
        đăng nhập tại đây
        </Link></small>
   </Space>
    </form>
    
  
    </Space>
    </div>
  )
}

export default EmailRegisterForm