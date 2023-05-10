import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
import { Col, Row, Space } from "antd";
import MyCollapse from "~/components/commomComponents/Collapse";
const FooterMainHome = () => {

 return <div className="Footer">
   <Row   >
        <Col xs={24} md={24}>
        <Row gutter={[20,20]}>
              <Col md={6} xs={12}>
             <Space direction="vertical" style={{width:"100%"}}> 
             <p>PRODUCTS</p>
             <Link to="/category/nam">Men</Link>
            <Link to="/category/nu"> Women</Link >
           <Link to="/category/tre-em">Children</Link >
             </Space>
              </Col>
              <Col md={6} xs={12}>

                  <Space style={{width:"100%"}} direction="vertical">
                  <p>ABOUT US</p>
                <Link to="/">About us</Link>

             <Link to="/">Careers</Link >
                  </Space>
              </Col>
              <Col md={6} xs={12}>
            <Space direction="vertical">
            <p>SUPPORT</p>
            <Link to="/">Delivery</Link>
             <Link to="/">Help & Customer Service</Link >
             <Link to="/">Returns & Refunds</Link >
            </Space>
              </Col>
              <Col md={6} xs={12}>
                    <Space direction="vertical">
                      <p>FOLLOW US</p>
                    <Link to="/">Facebook</Link>
             <Link to="/">Zalo</Link >
             <Link to="/">Instagram</Link >
                    </Space>
              </Col>
            </Row>
        </Col>
  </Row>
 </div>
};

export default FooterMainHome;
