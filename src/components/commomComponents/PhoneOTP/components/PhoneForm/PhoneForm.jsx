import React from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "~/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Input, Space, notification } from "antd";
import "./PhoneOTP.scss";
import { useSelector, useDispatch } from "react-redux";
import  * as Yup from "yup"
import { useFormik } from "formik";
import * as ApiXacThuc from "~/redux/slices/XacThuc";
import Verify from "../Verify";
import { InputText } from "~/components/commomComponents/InputText";
import MyButton from "~/components/commomComponents/Button";
const { Search } = Input;
const PhoneForm = () => {
  const[loading ,setLoading] = useState(false);
  const [verify,setVerify] = useState(false);
  const dispatch = useDispatch();
  const regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const Form = useFormik({
    initialValues:{
      phone:"",
    },
    validationSchema:Yup.object({
      phone:Yup.string().trim().matches(regex,"Định dạng không chính xác").max(10,"Không vượt quá 10 kí tự.")
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
    if(!Form.isValid)
    {
      return;
    }

      setUpCaptcha();
      setLoading(true)
      let phoneNumber = "+84" + Form.values.phone;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false)
        setVerify(true)
      })
      .catch((error) => {
        setLoading(false)
        // console.log({ error });
      });
  };
  if(verify)
  {
    return <Verify  phone={Form.values.phone}/>
  }
  else{
    return (
      <div className="PhoneOTP">
        <Space direction="vertical">
          <InputText className={`${Form.errors.phone?"error":""}`} name="phone"  value={Form.values.phone}
              onChange={Form.handleChange} label="phone">
          </InputText>
          {Form.errors.phone&&<span className="error"> {Form.errors.phone}</span>}
          <MyButton  loading={loading}              onClick={()=>onSignInSubmit()}
>SEND</MyButton>
        </Space>
        <div id="recaptcha-container"></div>
      </div>
    );
  }
  
};

export default PhoneForm;
