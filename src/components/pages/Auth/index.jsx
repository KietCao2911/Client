import React from "react";
import "./AuthPage.scss";
import MyButton from "~/components/commomComponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, GoogleOutlined } from "@ant-design/icons";
import shoesLogo from "~/assets/shoesLogo.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const AuthPage = () => {
  return (
    <>
    <div className="AuthPage">
      <div className="Logo">
        <img src={shoesLogo} alt="" />
      </div>
      <div className="LoginMethod">
        <Link to={"phoneOTP"}>
          {" "}
          <MyButton icon={<UserOutlined />}>
            Đăng nhập / Đăng ký với Số điện thoại
          </MyButton>
        </Link>{" "}
        {/* <Link to={"phoneOTP"}>
          {" "}
          <MyButton Icon={<GoogleOutlined />}>
            Đăng nhập / Đăng ký với Google
          </MyButton>
        </Link>{" "} */}
      </div>
      <small>
        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{" "}
        <a href="#">điều khoản sử dụng</a> của chúng tôi.
      </small>
    </div></>
  );
};

export default AuthPage;
