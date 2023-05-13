import React from "react";
import "./AuthPage.scss";
import MyButton from "~/components/commomComponents/Button";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { UserOutlined, GoogleOutlined } from "@ant-design/icons";
import shoesLogo from "~/assets/shoesLogo.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PhoneOTP } from "..";
import Email from "./pages/Email";
import Method from "./components/Method";
import { ArrowLeft } from "react-feather";
const AuthPage = () => {
  return (
    <>
    <div className="AuthPage">
     
      <Outlet/>
      <Routes>
        <Route element={<PhoneOTP/> } path="phone/*"></Route>
        <Route element={<Email/> } path="email/*"></Route>
        <Route element={<Method/> } path=""></Route>
      </Routes>
    </div></>
  );
};

export default AuthPage;
