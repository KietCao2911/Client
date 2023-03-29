import React from "react";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import "./EmptyCart.scss";
import { CaretRightOutlined } from "@ant-design/icons";
import { Space } from "antd";
const EmptyCart = () => {
  return (
    <div className=" EmptyCart">
      <Space align="center" direction="vertical">
        <strong>TÚI CỦA BẠN TRỐNG</strong>
        <p>Thêm một món hàng vào giỏ hàng. Nó sẽ xuất hiện tại đây.</p>
        <Link to="/">
          <MyButton icon={<CaretRightOutlined />}>MUA SẮM NGAY</MyButton>
        </Link>
      </Space>
    </div>
  );
};

export default EmptyCart;
