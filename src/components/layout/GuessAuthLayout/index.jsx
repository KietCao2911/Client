import React from "react";
import "./GuessAuthLayout.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBg from "~/assets/LoginBg.png"
import NotFound from "~/components/commomComponents/NotFound";

const GuessAuthLayout = ({ children }) => {
  const { user } = useSelector((state) => state.XacThuc);
  return (
    <>
    {Object.keys(user).length>0?<NotFound/>:<div className="GuessAuthLayout" style={{background:LoginBg}}>
      <div className="mainAuthLayout">
        <h1>Chào mừng đến với SHOP</h1>
        {children}
      </div>
    </div>}
    </>
    
  );
};

export default GuessAuthLayout;
