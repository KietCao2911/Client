import { Checkbox, Space, notification } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import CustomSpin from '~/components/CustomSpin'
import MyButton from '~/components/commomComponents/Button'
import InputText from '~/components/commomComponents/InputText'
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import * as YUP from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const EmailRegisterForm = () => {
    const {loading} = useSelector(state=>state.XacThuc)
    const dispatch = useDispatch();
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
    validationSchema:YUP.object({
      tenHienThi:YUP.string().required("Vui lòng nhập trường này"),
      tenTaiKhoan:YUP.string().required("Vui lòng nhập trường này"),
      matKhau:YUP.string().required("Vui lòng nhập trường này"),
      nhapLaiMatKhau: YUP.string()
      .oneOf([YUP.ref('matKhau'), null], 'Mật khẩu nhập lại phải khớp')
    }),
    
        }
      );
      const onSubmit=()=>
      {
          const valid = Form.isValid
          const params = {
            tenHienThi:Form.values.tenHienThi,
            tenTaiKhoan:Form.values.tenTaiKhoan,
            matKhau:Form.values.matKhau,
          }
          if(valid)
          {
            console.log({params})
            dispatch(XacThucAPI.EmailRegister({body:params}))
          }
          else
          {
            notification.open({
              message:"Giá trị không hợp lệ",
              type:"error"
            })
          }
      }
  return (
    <div>
          {loading&&<CustomSpin/>}
    <Space style={{width:"100%"}} direction='vertical'>
     
    <form >
   <Space style={{width:"100%"}} direction='vertical'>
   <InputText onBlur={Form.handleBlur} className={` ${Form.touched.tenHienThi&&Form.errors.tenHienThi?"error":""}`} onChange={Form.handleChange} value={Form.values.tenHienThi} name="tenHienThi" label="Tên người dùng"></InputText>
   {<span className=' error'>{Form.touched.tenHienThi&&Form.errors.tenHienThi&&Form.errors.tenHienThi}</span>}
   <InputText onBlur={Form.handleBlur} className={` ${Form.touched.tenHienThi&&Form.errors.tenHienThi?"error":""}`} onChange={Form.handleChange} value={Form.values.tenTaiKhoan} name="tenTaiKhoan" label="Email"></InputText>
   {<span className=' error'>{Form.touched.tenTaiKhoan&&Form.errors.tenTaiKhoan&&Form.errors.tenTaiKhoan}</span>}

      <InputText type="password" onBlur={Form.handleBlur} className={` ${Form.touched.matKhau&&Form.errors.matKhau?"error":""}`} onChange={Form.handleChange}  value={Form.values.matKhau} name="matKhau"  label="Mật khẩu"></InputText>
      {<span className='error'>{Form.touched.matKhau&&Form.errors.matKhau&&Form.errors.matKhau}</span>}
      <InputText type="password" onBlur={Form.handleBlur} className={` ${Form.touched.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau?"error":""}`} onChange={Form.handleChange}  value={Form.values.nhapLaiMatKhau} name="nhapLaiMatKhau"  label="Nhập lại mật khẩu"></InputText>
      {<span className='error'>{Form.touched.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau&&Form.errors.nhapLaiMatKhau}</span>}
      <Checkbox value={true}>Tôi đồng ý với điều khoản</Checkbox>
   </Space>
    </form>
      <MyButton onClick={onSubmit} >Đăng ký</MyButton>
      <small>Nếu đã có tài khoản, <Link to={"../dang-nhap"}>
        đăng nhập tại đây
        </Link></small>
    </Space>
    </div>
  )
}

export default EmailRegisterForm