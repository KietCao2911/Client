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
             <p>SẢN PHẨM</p>
             <Link to="/category/nam">Nam</Link>
            <Link to="/category/nu"> Nữ</Link >
           <Link to="/category/tre-em">Trẻ em</Link >
             </Space>
              </Col>
              <Col md={6} xs={12}>

                  <Space style={{width:"100%"}} direction="vertical">
                  <p>VỀ CHÚNG TÔI</p>
                <Link to="/">Thông tin chúng tôi</Link>

             <Link to="/">Tuyển dụng</Link >
                  </Space>
              </Col>
              <Col md={6} xs={12}>
            <Space direction="vertical">
            <p>HỖ TRỢ</p>
            <Link to="/">Faqs</Link>
             <Link to="/">Chính sách và hỗ trợ</Link >
             <Link to="/">Tra cứu đơn</Link >
            </Space>
              </Col>
              <Col md={6} xs={12}>
                    <Space direction="vertical">
                      <p>Liên hệ</p>
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
