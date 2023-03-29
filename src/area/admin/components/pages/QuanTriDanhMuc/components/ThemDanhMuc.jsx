import { Button, Form, Input, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
import { useEffect } from "react";
import FormItem from "antd/lib/form/FormItem";
import { uuidv4 as v4 } from "@firebase/util";
import * as DanhMucApi from "~/redux/slices/DanhMuc/DanhMucApi";
import * as DanhMucApiThunk from "~/redux/slices/DanhMuc/index";
const { Option } = Select;
const ThemDanhMuc = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [Muc0, setMuc0] = useState({
    state: false,
    parentId: null,
    items: [],
  });

  const [Muc1, setMuc1] = useState({
    state: false,
    parentId: null,
    items: [],
  });
  const [Muc2, setMuc2] = useState({
    state: false,
    parentId: null,
    items: [],
  });
  const [catName, setCatName] = useState("");
  console.log({ Muc0 });
  // console.log({ Muc1 });
  // console.log({ catName });
  const Muc0Change = (e) => {
    setMuc0({ ...Muc0, state: true, parentId: e });
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc1({ ...Muc1, items: res });
    };
    if (e != null) {
      FetchCatLevel0();
    }
  };
  const Muc1Change = (e) => {
    setMuc1({ ...Muc1, state: true, parentId: e });
    const FetchCatLevel1 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc2({ ...Muc2, items: res });
    };
    if (e != null) {
      FetchCatLevel1();
    }
  };
  useEffect(() => {
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(0);
      setMuc0({ ...Muc0, items: res });
    };
    FetchCatLevel0();
  }, []);
  const handleSubmitPost = () => {
    if (Muc0.parentId == null) {
      dispatch(
        DanhMucApiThunk.fetchCategoryAdd({
          TenDanhMuc: catName,
          ParentCategoryID: 0,
        })
      );
    } else {
      if (Muc1.parentId != null) {
        dispatch(
          DanhMucApiThunk.fetchCategoryAdd({
            TenDanhMuc: catName,
            ParentCategoryID: Muc1.parentId,
          })
        );
      } else if (Muc1.parentId == null) {
        dispatch(
          DanhMucApiThunk.fetchCategoryAdd({
            TenDanhMuc: catName,
            ParentCategoryID: Muc0.parentId,
          })
        );
      } else {
        dispatch(
          DanhMucApiThunk.fetchCategoryAdd({
            TenDanhMuc: catName,
            ParentCategoryID: Muc1.parentId,
          })
        );
      }
    }
  };
  return (
    <Form form={form} initialValues={{ Muc0: null, Muc1: null, Muc2: null }}>
      <Form.Item label="Tên danh mục">
        <Input
          placeholder="Nhập tên danh mục"
          onChange={(e) => setCatName(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Mức 0" name={"Muc0"}>
        <Select onChange={Muc0Change}>
          <Option value={null}>--Đây là danh mục gốc--</Option>
          {Muc0.items?.map((item) => (
            <Option value={item.id}>--{item.tenDanhMuc}--</Option>
          ))}
        </Select>
      </Form.Item>
      {Muc0.parentId != null && (
        <Form.Item label="Mức 1" name={"Muc1"}>
          <Select onChange={Muc1Change}>
            <Option value={null}>--Đây là danh mục gốc--</Option>
            {Muc1.items?.map((item) => (
              <Option value={item.id}>--{item.tenDanhMuc}--</Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <MyButton onClick={handleSubmitPost}>GỬI</MyButton>
    </Form>
  );
};

export default ThemDanhMuc;
