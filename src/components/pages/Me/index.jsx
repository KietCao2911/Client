import React from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useState } from "react";
import "./MePage.scss"
import AccountPage from "./pages/AccountPage";
import NewPage from "./pages/NewsPage";
import OrderPage from "./pages/OrderPage";
import { useRef } from "react";
import { useEffect } from "react";

const MePage = () => {
  const [itemsNav,setItemsNav]= useState([{
    href:"",
    label:"Tin tức",
    checked:true
  },{
    href:"don-hang",
    label:"Đơn hàng",
    checked:false
  },{
    href:"tai-khoan",
    label:"Tài khoản",
    checked:false
  }])
  const params = useParams();
  const key = params['*']
  const handleSetClass =(href)=>
  {
    const splitChar = key.split("/")
    if(key==href)
    {
      return "active";
    }
    else if(href == splitChar[0])
    {
      return "active";
    }
    else
    {
      return "";
    }
  }
  return <div className="MePage PageContainer">
      <div className="HeaderNavAccount">
        <div className="infomation">
          <div className="name">CHÀO MỪNG 0325560344 TRỞ LẠI</div>
          <div className="level">LEVEL DIMOND</div>
        </div>
        <div className="nav">
          {itemsNav.map((item,index)=>
            {
              return <Link   className={handleSetClass(item.href)} to={item.href} >{item.label}</Link>
 
            })}
        </div>
      </div>

    <Outlet/>
<div className="Content">
    <Routes>
      <Route path="" element={<NewPage/>}></Route>
      <Route path="don-hang" element={<OrderPage/>}></Route>
      <Route path="tai-khoan/*" element={<AccountPage/>}></Route>
    </Routes>
    </div>
  </div>;
};

export default MePage;
