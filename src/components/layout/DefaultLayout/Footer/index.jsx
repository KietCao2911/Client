import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
import { Col, Row, Space } from "antd";
import MyCollapse from "~/components/commomComponents/Collapse";
const FooterMainHome = () => {

 return <div className="Footer">
   <Row   >
        <Col xs={24} md={0}>
            <Row >
              <Col span={24}>
                <MyCollapse label="Sản phẩm">
             <Space direction="vertical"> 
             <Link to="/nam">NAM</Link>
            <Link to="/nu"> NỮ</Link >
           <Link to="/tre-em">TRẺ EM</Link >
             </Space>
                </MyCollapse>
              </Col>
              <Col span={24}>

                <MyCollapse label="Cửa hàng">
                  <Space direction="vertical">
                <Link to="/">THÔNG TIN CHÚNG TÔI</Link>

             <Link to="/">TUYỂN DỤNG</Link >
                  </Space>
                </MyCollapse>
              </Col>
              <Col span={24}>
              <MyCollapse label="Hỗ trợ">
            <Space direction="vertical">
            <Link to="/">FAQs</Link>
             <Link to="/">Chính sách và hỗ trợ</Link >
             <Link to="/">Tra cứu đơn</Link >
            </Space>
              </MyCollapse>
              </Col>
              <Col span={24}>
              <MyCollapse label="Liên hệ">
                    <Space direction="vertical">
                    <Link to="/">Facebook</Link>
             <Link to="/">ZALO</Link >
             <Link to="/">INSTAGRAM</Link >
                    </Space>
              </MyCollapse>
              </Col>
            </Row>
        </Col>
        <Col xs={0} md={24}>
        <Row gutter={[80,80]}>
              <Col span={6}>
             <Space direction="vertical"> 
             <h4>SẢN PHẨM</h4>
             <Link to="/category/nam">NAM</Link>
            <Link to="/category/nu"> NỮ</Link >
           <Link to="/category/tre-em">TRẺ EM</Link >
             </Space>
              </Col>
              <Col span={6}>

                  <Space direction="vertical">
                  <h4>VỀ CHÚNG TÔI</h4>
                <Link to="/">THÔNG TIN CHÚNG TÔI</Link>

             <Link to="/">TUYỂN DỤNG</Link >
                  </Space>
              </Col>
              <Col span={6}>
            <Space direction="vertical">
            <h4>HỖ TRỢ</h4>
            <Link to="/">FAQs</Link>
             <Link to="/">Chính sách và hỗ trợ</Link >
             <Link to="/">Tra cứu đơn</Link >
            </Space>
              </Col>
              <Col span={6}>
                    <Space direction="vertical">
                      <h4>LIÊN HỆ</h4>
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
