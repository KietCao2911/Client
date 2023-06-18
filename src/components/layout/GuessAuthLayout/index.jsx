import React from "react";
import "./GuessAuthLayout.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "~/assets/LoginBg.png"
import NotFound from "~/components/commomComponents/NotFound";
import { ArrowLeft } from "react-feather";
import { Button, Col, Row } from "antd";

const GuessAuthLayout = ({ children }) => {
  const { user } = useSelector((state) => state.XacThuc);
  return (
    <>
    {Object.keys(user).length>0?<NotFound/>:<div className="GuessAuthLayout" style={{background:LoginBg}}>
      <div className="mainAuthLayout">
        <Row justify={"space-between"}>
          <Col> 
            <Link to="/">
              <Button type="">
              <strong>Trở về trang chủ</strong>
              </Button>
            </Link>
          </Col>
          
        </Row>
       <Link to="/"> <h1 className="Logo">LOGO <span>.</span></h1></Link>
        {children}
      </div>
    </div>}
    </>
    
  );
};

export default GuessAuthLayout;
