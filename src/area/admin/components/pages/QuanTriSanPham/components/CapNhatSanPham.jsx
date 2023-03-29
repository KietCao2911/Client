import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Form, Input, Select, InputNumber } from "antd";
import UploadSingleFile from "./UploadSingleFile";
import UploadMutipleFile from "./UploadMutipleFile";
import QuanLySoLuong from "./QuanLySoLuong";
import { Get } from "~/area/admin/components/api/SanPham";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import CapNhatDanhMuc from "./CapNhatDanhMuc";
import * as Api from "~/redux/slices/SanPham";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormItem from "antd/lib/form/FormItem";
import { v4 } from "uuid";
const { Option } = Select;

document.title = "Trang cập nhật thông tin sản phẩm";
const CapNhatSanPham = ({
  visible,
  onOK,
  onCancel,
  setProducts,
  list,
  ModalState,
}) => {
  const [init, setInit] = useState({});
  const [bst, setBst] = useState([]);
  const [cate, setCate] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [mutipleFileInit, setMutipleFileInit] = useState([]);
  const [openModalQty, setOpenModalQty] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  let { slug } = useParams();
  let [form] = useForm();
  const dispatch = useDispatch();
  const { products, product, loading, totalRow } = useSelector(
    (state) => state.SanPham
  );
  const { btnLoading } = loading;
  useEffect(() => {
    const Fetch = async () => {
      const res = await dispatch(Api.fetchGetProduct({slug }));
      const data = res.payload;
      form.setFieldsValue({
        IdBst: data.boSuuTap?.key,
        ...data,
      });
      if (data.img) {
        setFileList([
          {
            uid: data.img,
            name: data.img,
            status: "done",
            // custom error message to show
            url:
              "https://localhost:44328/wwwroot/res/SanPhamRes/Thumb/" +
              data.img,
          },
        ]);
      }
      var filesTemp = [];
      if (data.hinhAnh) {
        data.hinhAnh.forEach((item) => {
          filesTemp.push({
            uid: item.key,
            name: item.value,
            status: "done",
            // custom error message to show
            url:
              "https://localhost:44328/wwwroot/res/SanPhamRes/Imgs/" +
              product.maSanPham +
              "/" +
              item.value,
          });
        });
        setMutipleFileInit(filesTemp);
      }
    };
    Fetch();
  }, []);
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
  const handleSubmit = async (values) => {
    dispatch(Api.fetchPutProduct({ id:  product.maSanPham, body: values }));
  };
  const handleDscChange = (text) => {
    form.setFieldsValue({
      Mota: text,
    });
  };
  return (
    <div
      className="Wrapper"
      style={{
        padding: "1rem",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Form
      initialValues={{giaBan:0,giamGia:0} }
        form={form}
        name="FormChinhSuaSanPham"
        colon={false}
        layout="vertical"
        onFinish={handleSubmit}
        labelCol={{
          span: 32,
        }}
        wrapperCol={{
          span: 32,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Mã sản phẩm"
          name="maSanPham"
          key={v4()}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
        key={v4()}
          label="Tên sản phẩm"
          name="tenSanPham"
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
        key={v4()}
          label="Giá bán"
          name="giaBan"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item  key={v4()}  name="giamGia" label={"Giảm giá (%)"}>
           <InputNumber min={0} max={100}/>
        </Form.Item>
        <Form.Item
        key={v4()}
          label="Số lượng nhập"
          rules={[
            {
              required: true,
              message: "Không bỏ trống trường này!",
            },
          ]}
        >
          <Button type="primary" onClick={() => setOpenModalQty(true)}>
            Quản lý số lượng nhập
          </Button>
        </Form.Item>
        <Form.Item
        key={v4()}
          label="Tên bộ sưu tập"
          name="IdBst"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trường này",
            },
          ]}
        >
          <Select placeholder="Chọn bộ sưu tập">
            {bst.map((item, index) => {
              return (
                <Option key={v4()} value={item.id}>
                  {item.tenBoSuuTap}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Tên danh mục" name="IdDM" key={v4()}>
          <CapNhatDanhMuc  maSP={ product.maSanPham}defaultValue={product.danhMuc} />
        </Form.Item  >
        <Form.Item label="Ảnh sản phẩm" key={v4()}>
          <UploadMutipleFile openModal={openModal}setOpenModal={setOpenModal} res={product.color} MaSP={ product.maSanPham} product={product}/>
0        </Form.Item>
        <FormItem name={"Mota"} hidden key={v4()}></FormItem>
        <CKEditor
          editor={ClassicEditor}
          data={product.mota || ""}
          onChange={(e, editor) => handleDscChange(editor.getData())}
        >
          dawadadad
        </CKEditor>
        <Button
          block
          type="primary"
          htmlType="submit"
          style={{ display: "block" }}
          onClick={handleSubmit}
          loading={btnLoading}
        >
          Hoàn tất cập nhật
        </Button>
      </Form>
      <Modal
        width={"100%"}
        cancelText="Hủy"
        okButtonProps={{
          hidden: true,
        }}
        title="Quản lý số lượng nhập"
        visible={openModalQty}
        onCancel={() => setOpenModalQty(false)}
        onOk={() => setOpenModalQty(false)}
      >
        <QuanLySoLuong init={product.chiTietSoLuong} maSanPham={ product.maSanPham} />
      </Modal>
    </div>
  );
};

export default CapNhatSanPham;
