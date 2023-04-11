import React from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "~/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
import { Input, notification } from "antd";
import "./PhoneOTP.scss";
import { useSelector, useDispatch } from "react-redux";
import  * as Yup from "yup"
import { useFormik } from "formik";
import * as ApiXacThuc from "~/redux/slices/XacThuc";
import Verify from "../Verify";
const { Search } = Input;
const PhoneForm = () => {

  const [verify,setVerify] = useState(false);
  const dispatch = useDispatch();
  const regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const Form = useFormik({
    initialValues:{
      phone:"",
    },
    validationSchema:Yup.object({
      phone:Yup.string().trim().matches(regex,"Định dạng không chính xác")
    })
  })
  const setUpCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        },
        authentication
      );
    }
    else{
      window.recaptchaVerifier.render();
    }
  };
  useEffect(() => {
    // setUpCaptcha();
  }, []);
  const onSignInSubmit = () => {
    setUpCaptcha();
    
    if(Form.values.phone.length>6)
    {
      let phoneNumber = "+84" + Form.values.phone;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setVerify(true)
      })
      .catch((error) => {
        console.log({ error });
      });
    }
  };
  if(verify)
  {
    return <Verify/>
  }
  else{
    return (
      <div className="PhoneOTP">
        <div className="InputGroup OTPCODE">
          <div className="InputRow">
            <input
            name="phone"
              placeholder="Nhập số điện thoại của bạn"
              className="OTP"
              // disabled={disable.status}
              value={Form.values.phone}
              onChange={Form.handleChange}
            />
            <button
              className={`btnAccept `}
              onClick={()=>onSignInSubmit()}
            >
             Gửi mã
            </button>
          </div>
        </div>
          {Form.errors.phone&&<span className="error"> {Form.errors.phone}</span>}
        <div id="recaptcha-container"></div>
      </div>
    );
  }
  
};

export default PhoneForm;
