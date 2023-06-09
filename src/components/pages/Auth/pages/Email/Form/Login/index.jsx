import { Checkbox, Space, notification } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import CustomSpin from '~/components/CustomSpin'
import MyButton from '~/components/commomComponents/Button'
import InputText from '~/components/commomComponents/InputText'
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import * as YUP from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Lock, User } from 'react-feather'
const EmailLoginForm = () => {
    const {loading} = useSelector(state=>state.XacThuc)
    const dispatch = useDispatch();
    const regexEmail="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
      const Form = useFormik(
          {
          initialValues:{
            tenTaiKhoan:"",
            matKhau:"",
          }, 
          initialErrors:{
            tenTaiKhoan:"Vui lòng nhập trường này",
            matKhau:"Vui lòng nhập trường này"
          },
          initialTouched:{
            tenTaiKhoan:false,
            matKhau:false
          },
      validationSchema:YUP.object({
        
        tenTaiKhoan:YUP.string().required("Vui lòng nhập trường này").matches(regexEmail,"Email sai định dạng"),
        matKhau:YUP.string().required("Vui lòng nhập trường này"),
      }),
      
          }
        );
        const onSubmit=()=>
        {
            const valid = Form.isValid
            const params = {
              tenTaiKhoan:Form.values.tenTaiKhoan,
              matKhau:Form.values.matKhau,
            }
            if(valid)
            {
              console.log({params});
              dispatch(XacThucAPI.EmailSignIn({body:params}))
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
    <Space style={{width:"100%"}} direction='vertical'>


   <Space style={{width:"100%"}} direction='vertical'>
   <InputText icon={<User/>} onBlur={Form.handleBlur} className={` ${Form.touched.tenTaiKhoan&&Form.errors.tenTaiKhoan?"error":""}`} onChange={Form.handleChange} 
   value={Form.values.tenTaiKhoan} name="tenTaiKhoan" label="Email"></InputText>
   {<span className=' error'>{Form.touched.tenTaiKhoan&&Form.errors.tenTaiKhoan}</span>}

      <InputText icon={<Lock/>} type="password" onBlur={Form.handleBlur} className={` ${Form.touched.matKhau&&Form.errors.matKhau?"error":""}`} onChange={Form.handleChange}  value={Form.values.matKhau} name="matKhau"  label="Mật khẩu"></InputText>
      {<span className='error'>{Form.touched.matKhau&&Form.errors.matKhau&&Form.errors.matKhau}</span>}
      <Checkbox value={true}> Duy trì đăng nhập</Checkbox>
      <MyButton loading={loading} onClick={onSubmit} >Đăng nhập</MyButton>
   </Space>

      <small>Nếu chưa có tài khoản, <Link to={"../dang-ky"}>
        đăng ký tại đây
        </Link></small>
        <small>Quên mật khẩu??, <Link to={"../quen-mat-khau"}>
        bấm vào đây
        </Link></small>
    </Space>
    </div>
  )
}

export default EmailLoginForm