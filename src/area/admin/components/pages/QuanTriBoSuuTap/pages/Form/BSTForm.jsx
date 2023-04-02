import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Image,
  Input,
  message,
  Row,
  Space,
  Table,
  Upload,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
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
const BSTForm = (props) => {
  const { init, isEdit, isUpdated, isCreated, isReadOnly } = props;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.SanPham);
  const { boSuuTap } = useSelector((state) => state.BoSuuTap);
  const { id } = useParams();
  const url = BASE_URL + "wwwroot/res/BstImgs/" + boSuuTap?.img || "";

  const FormBst = useFormik({
    initialValues: {
      tenBoSuuTap: boSuuTap?.tenBoSuuTap || "",
      mota: boSuuTap?.mota || "",
      show: boSuuTap?.show || false,
      chiTietBSTs: boSuuTap?.chiTietBSTs || [],
      img: url || "",
    },
  });

  console.log({ values: FormBst.values });
  const reSetBST = useMemo(() => {
    FormBst.setValues({ ...boSuuTap });
  }, [boSuuTap]);
  useEffect(() => {
    if (isUpdated || isReadOnly) {
      dispatch(BstAPI.fetchByIdBST({ id }));
    } else {
      FormBst.setValues({});
    }
  }, []);
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
    const params = {
      ...FormBst.values,
    };
    if (!isCreated) {
      if (
        FormBst.values.chiTietBSTs &&
        FormBst.values.chiTietBSTs.length > 0 &&
        params.tenBoSuuTap
      ) {
        dispatch(BstAPI.fetchPostBST({ body: params }));
      } else {
        message.open({
          content: "Vui lòng chọn ít nhát một sản phẩm",
          type: "error",
        });
      }
    } else {
      dispatch(BstAPI.fetchPutBST({ id, body: params }));
    }
  };
  const onUpload = (file) => {
    dispatch(BstAPI.fetchUploadImgBST({ id, body: file, config: null }));
  };
  const onRemove = (fileObj) => {
    dispatch(BstAPI.fetchRemoveImgBST({ id, fileName: fileObj?.name }));
  };
  document.title = "Quản lý bộ sưu tập - Tạo mới";
  return (
    <Row>
      <Col span={24}>
        <Space style={{ width: "100%" }} direction="vertical">
          <InputText
            disabled={!isEdit}
            label="Nhập tên bộ sưu tập"
            name="tenBoSuuTap"
            value={FormBst.values.tenBoSuuTap}
            onChange={FormBst.handleChange}
          />
          <CKEditor
            disabled={!isEdit}
            data={FormBst?.values?.mota || ""}
            placeHolder="Mô tả"
            onChange={(e, editor) => {
              FormBst.setFieldValue("moTa", editor.getData());
            }}
            editor={ClassicEditor}
          >
            Mô tả sản phẩm
          </CKEditor>
          {isEdit && isCreated && (
            <UploadCustom
              fileList={boSuuTap?.fileList || []}
              onUpload={onUpload}
              onRemove={onRemove}
            ></UploadCustom>
          )}
          {/* <UploadCustom /> */}
          <Space direction="vertical" style={{ width: "100%" }}>
            {isEdit ? (
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
          <Space>
            {<Button onClick={() => handleSubmit()}>Xác nhận</Button>}
            {isCreated && !isEdit && (
              <Link to="chinh-sua">
                {" "}
                <Button>Sửa</Button>
              </Link>
            )}
            {isCreated && isEdit && (
              <Link to={"../" + id}>
                {" "}
                <Button>Hủy</Button>
              </Link>
            )}
          </Space>
        </Space>
      </Col>
      <Col></Col>
    </Row>
  );
};

export default BSTForm;
