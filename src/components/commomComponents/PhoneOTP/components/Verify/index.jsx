import React, { useEffect, useRef, useState } from 'react'
import "./Verify.scss"
import { Space, notification } from 'antd'
import CustomSpin from '~/components/CustomSpin'
import XacThucSlice, * as ApiXacThuc from "~/redux/slices/XacThuc";
import { useDispatch } from 'react-redux';
import MyButton from '~/components/commomComponents/Button';
import InputText from '~/components/commomComponents/InputText';
import { useFormik } from 'formik';
import * as Yup from "yup"
const Verify = ({phone}) => {
    const dispatch = useDispatch();
    const codeRef = useRef([])
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
    const PhoneForm = useFormik({
      initialValues:{
        otp:"",
      
      },
      validationSchema:Yup.object({
        otp:Yup.string().required("Phải nhập trường này").matches( /^\d{6}$/,"Phải có giá trị bằng số và phải là 6 chữ số")
      }),
      onSubmit:(values)=>
      {
        let codes  =values.otp;
            if(codes.length==6)
            {
                handleVerifierOTP(codes);
            }
      }
    })
    const handleVerifierOTP = (OTP) => {
        if (OTP.length >= 6) {
            setLoading(true);
            window.confirmationResult
            .confirm&& window.confirmationResult
            .confirm(OTP)
            .then((result) => {
              const user = result.user;
              dispatch(
                ApiXacThuc.fetchPostSignUser({
                  UserName: phone,
                  info: {
                    TenKhachHang: phone,
                  },
                })
              );
              setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                notification.open({
                  message: "Có lỗi xảy ra, vui lòng thử lại sau",
                  type: "error",
                });
                // window.location.reload();
            });
        } else {
          notification.open({
            message: "Mã OTP phải gồm 6 chữ số",
            type: "error",
          });
        }
      };
    useEffect(()=>
    {
      
    },[])
    const onSubmit =()=>
    {
        let codes  =PhoneForm.values.otp;
            if(codes.length==6)
            {
                handleVerifierOTP(codes);
            }
        }
  return (
    <div className='Verify'>
      <Space direction='vertical'>
          <InputText value={PhoneForm.values.otp} className={`${PhoneForm.errors.otp&&"error"}`}  name="otp"  onChange={PhoneForm.handleChange} label="Vui lòng nhập mã OTP"/>
          {PhoneForm.errors.otp&&<span className='error'>{PhoneForm.errors.otp}</span>}
          <MyButton loading={loading} onClick={onSubmit}>
            <strong>Xác nhận</strong>
          </MyButton>
        </Space>
    </div>
  )
}

export default Verify