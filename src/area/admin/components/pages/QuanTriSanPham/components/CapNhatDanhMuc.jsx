import React from "react";
import { useState, useEffect } from "react";
import * as DanhMucApi from "~/redux/slices/DanhMuc/DanhMucApi";
import SanPhamSlice,*as SanPhamAPI from "~/redux/slices/SanPham";
import * as DanhMucApiThunk from "~/redux/slices/DanhMuc/index";
import { Button, Form, Input, Select, Modal } from "antd";
import MyButton from "~/components/commomComponents/Button";
import { NIL, v4 } from "uuid";
import { useDispatch } from "react-redux";
const { Option } = Select;
const CapNhatDanhMuc = ({ defaultValue,maSP }) => {
  const [openModal, setOpenModal] = useState(false);
  const [catName, setCatName] = useState("");
  const [ID,setID] = useState({ID:null,
  parentID:null})
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  console.log({ defaultValue });
  const [Muc0, setMuc0] = useState({
    state: false,
    Id:defaultValue&&defaultValue[0]?.idDanhMuc|| null,
    parentId:defaultValue&&defaultValue[0]?.parentId||null,
    items: [],
  });

  const [Muc1, setMuc1] = useState({
    state: false,
    Id: defaultValue&&defaultValue[1]?.idDanhMuc||null,
    parentId:defaultValue&&defaultValue[1]?.parentId||null,
    items: [],
  });
  const [Muc2, setMuc2] = useState({
    state: false,
    Id: defaultValue&&defaultValue[1]?.idDanhMuc||null,
    parentId:defaultValue&&defaultValue[2]?.parentId||null,
    items: [],
  });
  const Muc0Change = (e) => {
    form.setFieldsValue({ Muc1: null, Muc2: null });
    if(e==null)
    {
      setMuc0({items:Muc0.items,Id:null,parentId:null,state:true});
      setMuc1({items:[],Id:null,parentId:null,state:false});
      setMuc2({items:[],Id:null,parentId:null,state:false});
    }
    else
    {

      setMuc0({ ...Muc0, state: true, Id: e,parentId:-1 });
    }
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc1({items: res });
    };
    if (e != null) {
      FetchCatLevel0();
    }
  };
  const Muc1Change = (e) => {
    if(e==null)
    {
      setMuc1({items:Muc1.items,Id:null,parentId:null,state:false});
      setMuc2({items:[],Id:null,parentId:null,state:false});
    }
    else{

      setMuc1({ ...Muc1, state: true, Id: e ,parentId:Muc0.Id});
    }
    const FetchCatLevel1 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc2({ ...Muc2, items: res, Id: e });
    };
    form.setFieldsValue({ Muc2: null });
    if (e != null) {
      FetchCatLevel1();
    }
  };
  const Muc2Change = (e) => {
    const FetchCatLevel2 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(e);
      setMuc2({ ...Muc2, items: res, Id: e ,parentId:Muc1.Id});
    };
    if (e != null) {
      FetchCatLevel2();
    }
  };
  useEffect(() => {
    const FetchCatLevel0 = async () => {
      const res = await DanhMucApi.GetCategoryByParentId(-1);
      setMuc0({Id:defaultValue&&defaultValue[0]?.idDanhMuc||null,parentId:defaultValue&&defaultValue[0]?.parentId,state:Muc0.state,items:res})
    };
    FetchCatLevel0();
    if (defaultValue?.length > 0) {
      const FetchCatLevel1 = async () => {
        const res = await DanhMucApi.GetCategoryByParentId(
          defaultValue[0].idDanhMuc
        );
        setMuc1({
          state: true,
          Id: defaultValue[0].parentId,
          items: res,
        });
      };
      const FetchCatLevel2 = async () => {
        const res = await DanhMucApi.GetCategoryByParentId(
          defaultValue[1].idDanhMuc
        );
        setMuc2({
          state: true,
          Id: defaultValue[1].parentId,
          items: res,
        });
      };
      FetchCatLevel1();
      FetchCatLevel2();
    }
  }, [defaultValue]);
  const handleSubmit=()=>
  {
    if(Muc2.parentId!=null)
    {
      dispatch(SanPhamAPI.UpdateCategory({maSP,body:{ParentCategoryID:Muc2.parentId,Id:Muc2.Id}}))
    }
    else if(Muc1.parentId!=null)
    {
      dispatch(SanPhamAPI.UpdateCategory({maSP,body:{ParentCategoryID:Muc1.parentId,Id:Muc1.Id}}))
    }else
  {
    dispatch(SanPhamAPI.UpdateCategory({maSP,body:{ParentCategoryID:Muc0.parentId,Id:Muc0.Id}}))
  }
  }
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Cập nhật danh mục</Button>
      <Modal visible={openModal} onCancel={() => setOpenModal(false)}>
        <Form
          form={form}
          initialValues={{
            Muc0:
              null || (defaultValue?.length > 0 && defaultValue[0]?.idDanhMuc),
            Muc1:
              null || (defaultValue?.length > 0 && defaultValue[1]?.idDanhMuc),
            Muc2:
              null || (defaultValue?.length > 0 && defaultValue[2]?.idDanhMuc),
          }}
        >
          <Form.Item label="Mức 0" name={"Muc0"}>
            <Select onChange={Muc0Change}>
              <Option value={null}>--Đây là danh mục gốc--</Option>
              {Muc0.items?.map((item) => (
                <Option key={v4()} value={item.id}>--{item.tenDanhMuc}--</Option>
              ))}
            </Select>
          </Form.Item>
          {Muc0.Id != null && (
            <Form.Item label="Mức 1" name={"Muc1"}>
              <Select onChange={Muc1Change}>
                <Option key={v4()} value={null}>--Đây là danh mục gốc--</Option>
                {Muc1.items?.map((item) => (
                  <Option value={item.id}>--{item.tenDanhMuc}--</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {Muc1.Id != null && (
            <Form.Item label="Mức 2" name={"Muc2"}>
              <Select onChange={Muc2Change}>
                <Option key={v4()} value={null}>--Đây là danh mục gốc--</Option>
                {Muc2.items?.map((item) => (
                  <Option value={item.id}>--{item.tenDanhMuc}--</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <MyButton onClick={handleSubmit}>
            GỬI
          </MyButton>
          <MyButton
            onClick={() =>
              form.setFieldsValue({ Muc0: null, Muc1: null, Muc2: null })
            }
          >
            RESET
          </MyButton>
        </Form>
      </Modal>
    </>
  );
};

export default CapNhatDanhMuc;
