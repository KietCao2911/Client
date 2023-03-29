import React from "react";
import { Modal, Checkbox, Form, Button, notification } from "antd";
import { Get, Post } from "~/area/admin/components/api/SanPham";
import { useEffect } from "react";
import { useState } from "react";
const UpdateSizeModal = ({
  visible,
  setVisible,
  setDefaultSize,
  maSP,
  setSourceParent,
}) => {
  const [options, setOptions] = useState([]);
  const [values, setValues] = useState([]);
  const handleChange = (e) => {
    setValues([...e]);
  };
  const handleSubmit = async (values) => {
    let body = values.map((item) => {
      return { maSanPham: maSP, IdSizes: item };
    });
    try {
      const res = await Post(
        "/api/admin/SanPham/Update-Sizes?maSP=" + maSP,
        body
      );
      notification.open({
        type: "success",
        message: "Cập nhật thành công!",
      });
      setVisible(false);
    } catch (err) {
      notification.open({
        type: "error",
        message: "Cập nhật thất bại!",
      });
    }
  };
  useEffect(() => {
    const Fetch = async () => {
      try {
        const res = await Get("/api/Sizes");
        setOptions(res);
      } catch (err) {
        console.log(err);
      }
    };
    Fetch();
  }, []);
  return (
    <Modal
      visible={true}
      title="Cập nhật kích thước sản phẩm"
      onCancel={() => setVisible(true)}
    >
      <Form.Item label="Kích thước khả dụng">
        <Checkbox.Group
          options={options}
          onChange={handleChange}
        ></Checkbox.Group>
        <Button onClick={() => handleSubmit(values)}>Hoàn tất</Button>
      </Form.Item>
      <Form.Item>
        Bạn có thể thêm kích thước khả dụng <a>tại đây</a>
      </Form.Item>
    </Modal>
  );
};

export default UpdateSizeModal;
