import React, { useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Get, Post } from "~/area/admin/components/api/SanPham";
const { Option } = Select;

const FormSanPham = ({ init, visible, onOK, onCancel, isUpdateForm }) => {
  const [formBody, setFormBody] = useState({});
  console.log(init[0]);
  const handleSubmit = (values) => {
    setFormBody({ fileData: values.file.file, ...values });
  };
  return (
    <Modal
      title="Thêm sản phẩm"
      visible={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form
        initialValues={init[0]}
        onFinish={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Mã sản phẩm"
          name="MaSanPham"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="TenSanPham"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá bán"
          name="GiaBan"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Số lượng nhập"
          name="SoLuongNhap"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Tên bộ sưu tập"
          name="IdBst"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trường này",
            },
          ]}
        >
          <Select placeholder="Chọn nhà sưu tập">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Tên danh mục"
          name="IdDM"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trường này",
            },
          ]}
        >
          <Select placeholder="Chọn nhà sưu tập">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
        {isUpdateForm && (
          <Form.Item label="Ảnh sản phẩm" name="file">
            <Upload
              name="file"
              action={"https://localhost:44328/api/admin/SanPham/Upload-Single"}
              onChange={(info) => console.log(info)}
              onRemove={(e) => alert("Removed!")}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh tải lên</Button>
            </Upload>
          </Form.Item>
        )}

        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ display: "block" }}
        >
          Hoàn tất
        </Button>
      </Form>
    </Modal>
  );
};

export default FormSanPham;
