import React, { useEffect, useRef, useState } from 'react'
import "./Verify.scss"
import { Space, notification } from 'antd'
import CustomSpin from '~/components/CustomSpin'
import XacThucSlice, * as ApiXacThuc from "~/redux/slices/XacThuc";
import { useDispatch } from 'react-redux';
const Verify = () => {
    const dispatch = useDispatch();
    const codeRef = useRef([])
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
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
                  UserName: "0325560344",
                  info: {
                    TenKhachHang: "0325560344",
                  },
                })
              );
              setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
              console.log({ error });
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
        if(codeRef)
        {
            const elements = codeRef.current;
            codeRef.current.forEach((code,idx)=>
                {
                code.addEventListener('keydown',(e)=>{
                    let nextInput =elements[idx+1];
                    if (nextInput!= undefined && e.target.value) {
                        console.log({nextInput})
                        nextInput.focus();
                        nextInput.value && nextInput.select();
                      }else{
                        e.target.value=""
                      }
                     if(e.key==="Backspace")
                    {
                        const prev = elements[idx-1];
                        return e.target.value
      ? (e.target.value = "")
      : prev.focus();
                    }
                    else{
                        return ;
                    }
                })  
                
                })  
        }
    },[])
    const onSubmit =()=>
    {
        let codes  ="";
        codeRef.current.forEach(code=>
            {
                console.log({e:code.target})
                codes+=code?.value
            })
            if(codes.length==6)
            {
                handleVerifierOTP(codes);
            }
        }
  return (
    <div className='Verify'>
       {
        loading&& <CustomSpin/>
       }
        <Space className="container" direction='vertical'>
            <h2> Nhập mã xác nhận (OTP) </h2>
            <p>Chúng tôi đã gửi mã xác nhận vào điện thoại của bạn, vui lòng nhập 6 chữ số nhận được</p>
            <Space className="code_container">
                <input  ref={(e)=>codeRef.current[0]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
                <input   ref={(e)=>codeRef.current[1]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
                <input   ref={(e)=>codeRef.current[2]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
                <input   ref={(e)=>codeRef.current[3]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
                <input   ref={(e)=>codeRef.current[4]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
                <input   ref={(e)=>codeRef.current[5]=e} placeholder='0' className="code" required min={0} type='number' max={9}></input>
            </Space>
            <div className="button" onClick={()=>onSubmit()}>Xác nhận</div>
            <small>Nếu bạn chưa nhận được tin nhắn, vui lòng nhấn <b>gửi lại</b></small>
            <small></small>
        </Space>
    </div>
  )
}

export default Verify