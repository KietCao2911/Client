import React from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "~/firebaseConfig";
import MyButton from "../Button";
import { useState } from "react";
import { useEffect } from "react";
import { Input, notification } from "antd";
import "./PhoneOTP.scss";
import { useSelector, useDispatch } from "react-redux";
import XacThucSlice, * as ApiXacThuc from "~/redux/slices/XacThuc";
const { Search } = Input;
const PhoneOTP = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [disable, setDisable] = useState({
    status: true,
    time: 0,
    firstTimeClick: false,
  });
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.XacThuc);
  console.log({phoneValue})
  const handleOnChangePhoneNumber = (e) => {
    const regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
    if (e.target.value.match(regex)) {
      setDisable((prev) => {
        return { ...prev, status: false };
      });
    } else {
      setDisable((prev) => {
        return { ...prev, status: true };
      });
    }
    setPhoneValue(e.target.value);

  };
  useEffect(() => {
    if (disable.time > 0 && disable.status == true && disable.firstTimeClick) {
      setTimeout(() => {
        setDisable((prev) => {
          return { ...prev, time: prev.time - 1 };
        });
      }, 1000);
    }
    if (disable.time <= 0 && disable.firstTimeClick) {
      setDisable((prev) => {
        return { ...prev, time: 0, status: false, firstTimeClick: false };
      });
    }
  }, [disable.time, disable.firstTimeClick]);
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
    window.recaptchaVerifier.render();
  };
  useEffect(() => {
    setUpCaptcha();
  }, []);
  const onSignInSubmit = (e) => {
    // setUpCaptcha();
    if(phoneValue.length>0)
    {
      let phoneNumber = "+84" + phoneValue;
      console.log({ phoneNumber });
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log({ error });
      });
    }
    setDisable({ status: true, time: 10, firstTimeClick: true });
  };
  const handleVerifierOTP = () => {
    if (OTP.length >= 6) {
      window.confirmationResult
        .confirm(OTP)
        .then((result) => {
          const user = result.user;
          console.log({ user });
          dispatch(
            ApiXacThuc.fetchPostSignUser({
              UserName: phoneValue,
              info: {
                TenKhachHang: phoneValue,
              },
            })
          );
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log({ error });
        });
    } else {
      notification.open({
        message: "Mã OTP phải gồm 6 chữ số",
        type: "error",
      });
    }
  };
  return (
    <div className="PhoneOTP">
      <div className="InputGroup PhoneInput">
        <input
          placeholder="Số điện thoại (+84)"
          className="phoneNumber"
          value={phoneValue}
          onChange={handleOnChangePhoneNumber}
        />
      </div>
      <div className="InputGroup OTPCODE">
        <div className="InputRow">
          <input
            placeholder="Nhập mã xác minh (OTP)"
            className="OTP"
            // disabled={disable.status}
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <button
            className={`btnAccept ${disable.status && "disablePointer"}`}
            onClick={onSignInSubmit}
            disabled={disable.status}
            style={{
              backgroundColor: disable.status && "#ccc",
            }}
          >
            {disable.time == 0 ? "Gửi mã" : "Gửi lại mã " + disable.time + "s"}
          </button>
        </div>
      </div>

      <MyButton onClick={handleVerifierOTP}>ĐĂNG NHẬP / ĐĂNG KÝ</MyButton>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOTP;
