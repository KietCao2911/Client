import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  notification,
} from "antd";
import {
  UploadOutlined,
  IssuesCloseOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Get, Post } from "~/area/admin/components/api/SanPham";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
const { Option } = Select;

const ThemSanPham = ({
  visible,
  onOK,
  onCancel,
  setProducts,
  list,
  ModalState,
}) => {
  const dispatch = useDispatch();
  const { products, product, loading } = useSelector((state) => state.SanPham);
  const { tableLoading, btnLoading } = loading;
  const [formBody, setFormBody] = useState({});
  const [bst, setBst] = useState([]);
  const [cate, setCate] = useState([]);
  const [form] = Form.useForm();
  const isFormValid = () => {
    return form.getFieldsError().some((item) => item.errors.length > 0);
  };
  useEffect(() => {
    const getBst = async () => {
      const res = await Get("/api/admin/BoSuuTap");
      setBst(res);
    };
    getBst();
  }, []);
  useEffect(() => {
    const getDM = async () => {
      const res = await Get("/api/admin/DanhMuc");
      setCate(res);
    };
    getDM();
  }, []);

  const handleSubmit = (values) => {
    console.log({body:values});
    // var res = dispatch(Api.fetchPostProduct({ body: values }));
  };
  const handleDscChange = (e) => {
    form.setFieldsValue({
      Mota: e,
    });
  };
  return (
    <Modal
      width={800}
      title="Thêm sản phẩm"
      open={visible}
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form
        defaultValue={{
          IdSP: 1,
        }}
        form={form}
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
              message: "Hãy nhập trường này",
            },
          ]}
        >
          <Input placeholder="Mã sản phẩm" />
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
          label="Mã phiếu nhập"
          name="MaPhieuNhap"
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
          <InputNumber placeholder="Giá bán" />
        </Form.Item>
        <Form.Item label="Tên bộ sưu tập" name="IdBst">
          <Select placeholder="Chọn bộ sưu tập">
            <Option key="none" value={null}>
              Không thuộc bộ sưu tập nào
            </Option>
            {bst.map((item, index) => {
              return (
                <Option key={index} value={item.id}>
                  {item.tenBoSuuTap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item></Form.Item>
        <Form.Item name="Mota" hidden></Form.Item>
        <CKEditor
          editor={ClassicEditor}
          onChange={(e, editor) => handleDscChange(editor.getData())}
        />
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ display: "block" }}
          onClick={handleSubmit}
        >
          Hoàn tất thêm
        </Button>
      </Form>
    </Modal>
  );
};

export default ThemSanPham;
