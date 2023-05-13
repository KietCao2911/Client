import React, { useEffect } from 'react'
import "./DangNhap.scss"
import { useFormik } from 'formik'
import InputText from '~/components/commomComponents/InputText';
import { Space, notification } from 'antd';
import MyButton from '~/components/commomComponents/Button';
import * as YUP from "yup"
import CustomSpin from '~/components/CustomSpin';
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import { useDispatch, useSelector } from 'react-redux';
const DangNhap = () => {
  const {loading} = useSelector(state=>state.XacThuc)
  const Form = useFormik(
    {
     initialValues:{
      userName:"",
      password:"",
     }, 
     initialErrors:{
      userName:"Vui lòng nhập trường này",
      password:"Vui lòng nhập trường này"
     },
     initialTouched:{
      userName:false,
      password:false
     },
validationSchema:YUP.object({
  userName:YUP.string().required("Vui lòng nhập trường này"),
  password:YUP.string().required("Vui lòng nhập trường này"),
}),

    }
  );
  const dispatch = useDispatch();
  const onSubmit=(role)=>
  {
      const valid = Form.isValid
      const params = {
        userName:Form.values.userName,
        password:Form.values.password,
      }
      if(valid)
      {
        if(role=="admin")
        {
          dispatch(XacThucAPI.AdminLogin({body:params}))
        }
        else{
          
          dispatch(XacThucAPI.ManagerLogin({body:params}))
        }
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
    <div className='DangNhap'>
      {loading&&<CustomSpin/>}
    <Space direction='vertical' style={{width:"100%"}}> 
      <div className="Logo">
        <span>LOGO</span>
        <span className='dot'>.</span>
      </div>
    <form  >
   <Space direction='vertical' style={{width:"100%"}}>
   <InputText onBlur={Form.handleBlur} className={` ${Form.touched.userName&&Form.errors.userName?"error":""}`} onChange={Form.handleChange} value={Form.values.userName} name="userName" label="Tên tài khoản"></InputText>
   {<span className=' error'>{Form.touched.userName&&Form.errors.userName&&Form.errors.userName}</span>}

      <InputText onBlur={Form.handleBlur} className={` ${Form.touched.password&&Form.errors.password?"error":""}`} onChange={Form.handleChange}  value={Form.values.password} name="password" type="password" label="Mật khẩu"></InputText>
      {<span className='error'>{Form.touched.password&&Form.errors.password&&Form.errors.password}</span>}
   </Space>
    </form>
      <Space>
      <MyButton loading={loading} onClick={()=>onSubmit("admin")} >Đăng nhập với quyền admin</MyButton>
      <MyButton loading={loading} onClick={()=>onSubmit("manager")} >Đăng nhập với quyền quản lý</MyButton>
      </Space>
    </Space>
    </div>
  )
}

export default DangNhap