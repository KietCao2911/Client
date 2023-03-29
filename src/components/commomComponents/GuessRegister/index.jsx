import React from "react";
import { Form, Input } from "antd";
import MyButton from "../Button";
import { Link } from "react-router-dom";
import "./RegisterDefault.scss";
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
const GuessRegisterForm = () => {
  return (
    <div className="RegisterDefault">
      <Form name="RegisterDefault">
        <h1>ĐĂNG KÝ</h1>
        <Form.Item
          {...formItemLayout}
          name="username"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Số điện thoại"
            size="large"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Mã OTP"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã OTP!",
            },
          ]}
        >
          <Input
            size="large"
            type={"password"}
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mã OTP"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input
            size="large"
            type={"password"}
            // prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <div className="Actions">
          <MyButton type="submit">Đăng ký</MyButton>

          <Link to="/dang-nhap">Bạn đã có tài khoản, đăng nhập tại đây!</Link>
        </div>
      </Form>
    </div>
  );
};

export default GuessRegisterForm;
