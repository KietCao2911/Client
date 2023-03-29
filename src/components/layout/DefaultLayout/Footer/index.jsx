import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"
const FooterMainHome = () => {
  return   <div className="Footer">
      <div className="FooterPc">
        <div className="ProductsInfo">
          <ul>
            <span>SẢN PHẨM</span>
            <Link to="/nam">NAM</Link>
            <Link to="/nu"> NỮ</Link >
            <Link to="/tre-em">TRẺ EM</Link >
          </ul>
        </div>
        <div className="InfoShop">
        <ul>
            <span>VỀ CỬA HÀNG</span>
            <Link to="/">THÔNG TIN CHÚNG TÔI</Link>
            <Link to="/">TUYỂN DỤNG</Link >
          </ul>
        </div>
        <div className="Support">
        <ul>
            <span>HỖ TRỢ</span>
            <Link to="/">FAQs</Link>
            <Link to="/">Chính sách và hỗ trợ</Link >
            <Link to="/">Tra cứu đơn</Link >
          </ul>
        </div>
        <div className="Contact"><ul>
          <span>LIÊN HỆ</span>
        <Link to="/">FACEBOOK</Link>
            <Link to="/">ZALO</Link >
            <Link to="/">INSTAGRAM</Link >
          </ul></div>
      </div>
      
  </div>;
};

export default FooterMainHome;
