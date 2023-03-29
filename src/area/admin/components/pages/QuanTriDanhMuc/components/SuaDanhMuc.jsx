import React from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Method from "~/axiosRequest/request";
import DanhMucSlice, {
  fetchCategoryGetById,
  fetchCategoryUpdate,
} from "~/redux/slices/DanhMuc";
import { useState } from "react";
import ChildrenComponent from "./ChildrenComponent";
const { useForm } = Form;
const { Option } = Select;

function SuaDanhMuc() {
  const { maDM } = useParams();
  const [form] = useForm();
  const dispatch = useDispatch();
  const { item, loading } = useSelector((state) => state.DanhMuc);
  const [sexOptions, setSexOptions] = useState([]);
  useEffect(() => {
    form.setFieldsValue({
      Id: item._id,
      Tendanhmuc: item.tenDanhMuc,
      GioiTinhCode: item?.gioiTinh?.value,
    });
  }, [item]);
  useEffect(() => {
    dispatch(fetchCategoryGetById(maDM));
  }, [maDM]);
  const handleFinish = (value) => {
    dispatch(fetchCategoryUpdate({ id: value.Id, body: value }));
    console.log(value);
  };
  const data = [
    {
      label: "Mục 1",
      childrens: [
        {
          label: "Mục 1.1",
          childrens: [
            {
              label: "Mục 1.1.1",
            },
            {
              label: "Mục 1.1.2",
            },
          ],
        },
      ],
    },
    {
      label: "Mục 2",
      childrens: [
        {
          label: "Mục 2.1",
          childrens: [
            {
              label: "Mục 2.1.1",
            },
            {
              label: "Mục 2.1.2",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Form
        form={form}
        name="updateForm"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item hidden name={"Id"}></Form.Item>
        <Form.Item label={"Tên danh mục"} name={"Tendanhmuc"}>
          <Input />
        </Form.Item>
        {data.map((item) => (
          <ChildrenComponent value={item} />
        ))}
        {/* <Button htmlType="submit" loading={loading}>
          Xác nhận
        </Button> */}
      </Form>
    </>
  );
}

export default SuaDanhMuc;
