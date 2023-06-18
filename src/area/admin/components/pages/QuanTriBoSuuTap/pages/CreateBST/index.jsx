import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  FloatButton,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Delete, UploadCloud, X } from "react-feather";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadCustom from "~/components/commomComponents/Upload";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import { useFormik } from "formik";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "~/const";
import convertVND from "~/components/utils/ConvertVND";
import { DeleteOutlined } from "@ant-design/icons";
import * as BstAPI from "~/redux/slices/BoSuuTap";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomSpin from "~/components/CustomSpin";
import StickyActions from "~/components/commomComponents/stickyActions";
import * as Yup from "yup"
const isEdit = false;
const columns = [
  {
    title: "Mã CTK",
    render: (_, record) => {
      return <a>{record?.maSanPham}</a>;
    },
  },
  {
    title: "Ảnh",
    render: (_, record) => {
      return <Image width={100} height={100} src={record?.img || ""} />;
    },
  },
  {
    title: "Tên sản phẩm",
    render: (_, record) => {
      return (
        <p>{record?.tenSanPham || record?.sanPhamNavigation?.tenSanPham}</p>
      );
    },
  },
  {
    title: "Đơn giá",
    render: (_, record) => {
      return isEdit ? (
        <Input
          value={record?.giaBan || record?.sanPhamNavigation?.giaBanLe || 0}
        />
      ) : (
        <p>
          {convertVND(
            record?.giaBan || record?.sanPhamNavigation?.giaBanLe || 0
          )}{" "}
        </p>
      );
    },
  },
  {
    title: "Hành động",
    render: () => {
      return <X style={{ cursor: "pointer" }} />;
    },
  },
];
const CreateBST = (props) => {
  const { init, isEdit, isUpdated, isCreated, isReadOnly } = props;
  const dispatch = useDispatch();
  const formRef = useRef();
  const { products } = useSelector((state) => state.SanPham);
  const { boSuuTap ,loading} = useSelector((state) => state.BoSuuTap);
  const { id } = useParams();
  const url = BASE_URL + "wwwroot/res/BstImgs/" + boSuuTap?.img || "";
  const param =useLocation();
  const FormBst = useFormik({
    initialValues: {
      tenBoSuuTap:  "",
      mota:  "",
      show: false,
      chiTietBSTs:  [],
      img:  "",
      type: "Banner",

    },
    validationSchema:Yup.object({
        tenBoSuuTap:Yup.string().required("Phải nhập trường này"),
    }),
    initialErrors:{
      tenBoSuuTap:"Không bỏ trống trường này",
      chiTietBSTs:"Phải có ít nhất 1 sản phẩm",
    },
    initialTouched:{
      tenBoSuuTap:false,
      chiTietBSTs:false,
    }
  });

  // const reSetBST = useMemo(() => {
  //   FormBst.setValues({ ...boSuuTap });
  // }, [boSuuTap]);

  const handleChangeSearchProducts = (e) => {
    dispatch(SanPhamAPI.fetchGetAllProducts({ params: { s: e } }));
  };
  const handleOnItemClick = (product) => {
    let arr = FormBst.values.chiTietBSTs ? [...FormBst.values.chiTietBSTs] : [];
    const isExist = arr.some(
      (x) => x.maSanPham.trim() == product.maSanPham.trim()
    );
    if (!isExist) {
      arr.push({
        maSanPham: product?.maSanPham,
        img: product?.img || "",
      });

      FormBst.setFieldValue("chiTietBSTs", [...arr]);
    } else {
      message.open({
        content: "Đã tồn tại sản phẩm này",
        type: "error",
      });
    }
  };
  const handleSubmit = () => {
    FormBst.submitForm()
    if(FormBst.isValid)
    {
      const params = {
        ...FormBst.values,
        img:boSuuTap?.fileList?.length>0&&boSuuTap?.fileList[0]&&boSuuTap?.fileList[0]?.name||"",
      };
      dispatch(BstAPI.fetchPostBST({body:params}))
    }else{
      message.open({
        content:"Vui lòng điền đủ thông tin",
        type:"error"
      })
    }
 
  };
  const onUpload = (file) => {
    dispatch(BstAPI.fetchUploadImgBST({ id, body: file, config: null }));
  };
  const onRemove = (fileObj) => {
    dispatch(BstAPI.fetchRemoveImgBST({ id, fileName: fileObj?.name }));
  };
  document.title =isCreated?"Quản trị bộ sưu tập - tạo mới":isUpdated?"Quản trị bộ sưu tập - cập nhật":isReadOnly?"Quản trị bộ sưu tập - chi tiết":"";
  const Actionsbtn=(
    <Space>
     <Button type="primary" loading={loading} onClick={handleSubmit}>Xác nhận thêm</Button>
    </Space>
  )
  return (
    <form >
      <StickyActions Actionsbtn={Actionsbtn}></StickyActions>
      {loading&&<CustomSpin/>}
      <Row gutter={[20,20]}>
        <h1>{isCreated?"Quản trị bộ sưu tập - tạo mới":isUpdated?"Quản trị bộ sưu tập - cập nhật":isReadOnly?"Quản trị bộ sưu tập - chi tiết":""}</h1>
        <Col span={24}>
          <Space style={{ width: "100%" }} direction="vertical">
            <InputText
            onBlur={FormBst.handleBlur}
              
              className={`${FormBst.touched.tenBoSuuTap&&FormBst.errors.tenBoSuuTap&&"error"}`}
              label="Nhập tên bộ sưu tập"
              name="tenBoSuuTap"
              value={FormBst.values.tenBoSuuTap}
              onChange={FormBst.handleChange}
            />
            <Select onChange={(e)=>FormBst.setFieldValue("type",e)} defaultValue={["Banner"]} value={FormBst.values.type}>
            <Select.Option value={"Banner"}>
                Banner
              </Select.Option>
              <Select.Option value={"Products"}>
                Bộ sưu tập 
              </Select.Option>
            </Select>
            <CKEditor
              data={FormBst?.values?.mota || ""}
              placeHolder="Mô tả"
              onChange={(e, editor) => {
                FormBst.setFieldValue("moTa", editor.getData());
              }}
              editor={ClassicEditor}
            >
              Mô tả sản phẩm
            </CKEditor>
            {/* <UploadCustom /> */}
            <Space direction="vertical" style={{ width: "100%" }}>
              {true ? (
                <>
                  <InputText
                    onChange={(e) => handleChangeSearchProducts(e.target.value)}
                    label="Tìm kiếm sản phẩm"
                  />
                  <List>
                    {products &&
                      products.map((product) => {
                        const productInfo = product?.sanPhams[0] || {};
                        const url =
                          BASE_URL +
                            "wwwroot/res/SanPhamRes/Imgs/" +
                            productInfo?.parentID?.trim() +
                            "/" +
                            productInfo?.idColor?.trim() +
                            "/" +
                            productInfo?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
                          "";
                        const productTemp = { ...product, img: url };
                        return (
                          <ItemResult
                            value={productTemp}
                            onItemClick={(productTemp) =>
                              handleOnItemClick(productTemp)
                            }
                            labelProps={{
                              img: productTemp?.img,
                              name: productTemp?.tenSanPham,
                              code: productTemp?.maSanPham,
                              price: productTemp?.giaNhap,
                              qty: productTemp?.soLuongTon,
                            }}
                          />
                        );
                      })}
                  </List>
                </>
              ) : null}
              <Table
                dataSource={FormBst.values?.chiTietBSTs || []}
                columns={columns || []}
              />
            </Space>
          </Space>
        </Col>
        <Col></Col>
      </Row>
    </form>
  );
};

export default CreateBST;
