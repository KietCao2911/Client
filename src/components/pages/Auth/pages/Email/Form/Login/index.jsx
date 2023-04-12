import { Space, notification } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import CustomSpin from '~/components/CustomSpin'
import MyButton from '~/components/commomComponents/Button'
import InputText from '~/components/commomComponents/InputText'
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import * as YUP from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const EmailLoginForm = () => {
    const {loading} = useSelector(state=>state.XacThuc)
    const dispatch = useDispatch();
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
      const onSubmit=()=>
      {
          const valid = Form.isValid
          const params = {
            userName:Form.values.userName,
            password:Form.values.password,
          }
          if(valid)
          {
            // dispatch(XacThucAPI.fetchPostSignUser(params))
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

    <form  >
   <Space style={{width:"100%"}} direction='vertical'>
   <InputText onBlur={Form.handleBlur} className={` ${Form.touched.userName&&Form.errors.userName?"error":""}`} onChange={Form.handleChange} value={Form.values.userName} name="userName" label="Email"></InputText>
   {<span className=' error'>{Form.touched.userName&&Form.errors.userName&&Form.errors.userName}</span>}

      <InputText onBlur={Form.handleBlur} className={` ${Form.touched.password&&Form.errors.password?"error":""}`} onChange={Form.handleChange}  value={Form.values.password} name="password" type="password" label="Mật khẩu"></InputText>
      {<span className='error'>{Form.touched.password&&Form.errors.password&&Form.errors.password}</span>}
   </Space>
    </form>
      <MyButton onClick={onSubmit} >Đăng nhập</MyButton>
      <small>Nếu chưa có tài khoản, <Link to={"../dang-ky"}>
        đăng ký tại đây
        </Link></small>
    </Space>
    </div>
  )
}

export default EmailLoginForm