import {
  Button,
  Card,
  Col,
  Descriptions,
  FloatButton,
  Input,
  Popover,
  Row,
  Space,
  Steps,
  Table,
} from "antd";
import { useFormik } from "formik";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyCollapse from "~/components/commomComponents/Collapse";
import InputText from "~/components/commomComponents/InputText";
import List from "~/components/commomComponents/List";
import * as HoaDonApi from "~/redux/slices/HoaDon/HoaDonSlice";
import AddressForm from "./Form/AddressForm";
import * as Yup from "yup";
import { BASE_URL } from "~/const";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import ProductsTable from "../../../QuanTriNhapHang/pages/TrangTaoDonNhap/components/ProductsTable";
import convertVND from "~/components/utils/ConvertVND";
import { File, Plus } from "react-feather";
import { message, Select } from "antd/es";
import * as BranchAPI from "~/redux/slices/Branch/BranchSlice";
const OrderDetailForm = (props) => {
  const { isUpdated, isEdit, isCreated, isReadOnly } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const { hoadons, hoadon } = useSelector((state) => state.HoaDon);
  const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
  const { branchs } = useSelector((state) => state.Branch);
  const [productSearchText, setproductSearchText] = useState("");
  document.title = isUpdated
    ? "Quản lý đơn hàng - Chỉnh sửa"
    : isCreated
    ? "Quản lý đơn hàng - Tạo mới"
    : "Quản lý đơn hàng #" + hoadon?.id;
  const FormRef = useRef();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const OrderForm = useFormik({
    initialValues: {
      diaChiNavigation: hoadon?.diaChiNavigation || {
        name: "",
        phone: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        provinceID: null,
        districtID: null,
        wardID: null,
        addressDsc: "",
        email: "",
      },
      phuongThucThanhToan: hoadon?.phuongThucThanhToan || "COD",
      chiTietNhapXuats: hoadon?.chiTietNhapXuats || [],
      thanhTien: hoadon?.thanhTien || 0,
      loaiPhieu: "PHIEUXUAT",
      tongSoLuong: hoadon?.tongSoLuong || 0,
      phiship: hoadon?.phiShip || 0,
      maChiNhanh: "CN01",
      chietKhau: hoadon?.chiKhau || 0,
      tongSoLuong: hoadon?.tongSoLuong || 0,
      daThanhToan: false || hoadon?.daThanhToan,
      daXuatKho: false || hoadon?.daXuatKho,
      steps: 0 || hoadon?.steps,
    },
    validationSchema: Yup.object().shape({
      diaChiNavigation: Yup.object().shape({
        phone: Yup.string()
          .required("Phải nhập trường này")
          .matches(phoneRegExp, "Định dạng số điện thoại không đúng")
          .min(10, "Số điện thoại phải hơn 10 chữ số")
          .max(10, "Số điện thoại không quá 10 chữ số"),
        name: Yup.string().required("Phải nhập trường này"),
        email: Yup.string()
          ?.trim()
          .required("Phải nhập trường này")
          .matches(emailRegex, "Định dạng email không đúng"),
        provinceID: Yup.number()
          .nullable(true)
          .required("Phải chọn trường này"),
        districtID: Yup.number()
          .nullable(true)
          .required("Phải chọn trường này"),
        wardID: Yup.number().nullable(true).required("Phải chọn trường này"),
        addressDsc: Yup.string().required("Phải nhập trường này"),
      }),
      phuongThucThanhToan: Yup.string().required("Phải chọn trường này"),
      chiTietNhapXuats: Yup.array().min(1, "Chọn ít nhất một sản phẩm"),
    }),
    onSubmit: (values) => {
      alert("SUBMIT");
    },
  });
  const handleApplyCoupon = (value) => {
    OrderForm.setFieldValue("chietKhau", Number(value));
    const totalPrices = OrderForm.values.chiTietNhapXuats.reduce((x, y) => {
      return x + y.thanhTien;
    }, 0);
    if (value == 0) {
      OrderForm.setFieldValue("thanhTien", totalPrices);
    } else {
      OrderForm.setFieldValue("thanhTien", totalPrices * (1 - value / 100));
    }
  };

  const getReData = useMemo(() => {
    console.log("getReData");
    OrderForm.setValues({ ...hoadon });
  }, [hoadon]);
  const onClickProduct = (p) => {
    console.log({ p });
    if (p?.soLuongCoTheban <= 0 && p?.soLuongTon) {
      message.open({
        content: "Sản phẩm này hiện đã hết hàng, vui lòng nhập thêm sản phẩm",
        type: "error",
      });
    } else {
      const params = {
        sanPhamNavigation: { ...p },
        soLuong: 1,
        donGia: p.giaBanLe || 0,
        thanhTien: parseFloat(p.giaBanLe) * 1,
        maSanPham: p?.maSanPham || "",
      };

      let temp = OrderForm.values.chiTietNhapXuats
        ? [...OrderForm.values.chiTietNhapXuats]
        : [];
      temp.push({ ...params });
      OrderForm.setFieldValue(
        "thanhTien",
        OrderForm.values?.thanhTien +
          parseFloat(params.thanhTien) +
          (OrderForm.values?.phiship || 0)
      );
      OrderForm.setFieldValue("tongSoLuong", OrderForm.values.tongSoLuong + 1);
      OrderForm.setFieldValue("chiTietNhapXuats", temp);
    }
  };
  const handleChangeProductSearchText = (e) => {
    startTransition(() => {
      setproductSearchText(e.target.value);
      dispatch(
        KhoHangAPI.fetchGetProducts({
          maChiNhanh: OrderForm.values.maChiNhanh || "CN01",
          query: { s: e.target.value },
        })
      );
    });
  };
  useEffect(() => {
    dispatch(BranchAPI.fetchGetBranch());
    if (isUpdated || isReadOnly) {
      dispatch(HoaDonApi.fetchGetOrderDetails({ id }));
    } else {
      OrderForm.setTouched({
        diaChiNavigation: {
          name: false,
          phone: false,
          provinceName: false,
          districtName: false,
          wardName: false,
          provinceID: false,
          districtID: false,
          wardID: false,
          addressDsc: false,
          email: false,
        },
        chiTietNhapXuats: false,
        thanhTien: false,
        loaiPhieu: false,
        tongSoLuong: false,
        phiship: false,
        chietKhau: false,
        maChiNhanh: false,
        daThanhToan: false,
        phuongThucThanhToan: "COD",
      });
      OrderForm.setValues({
        diaChiNavigation: {
          name: "",
          phone: "",
          provinceName: "",
          districtName: "",
          wardName: "",
          provinceID: null,
          districtID: null,
          wardID: null,
          addressDsc: "",
          email: "",
        },
        chiTietNhapXuats: [],
        thanhTien: 0,
        loaiPhieu: "PHIEUXUAT",
        tongSoLuong: 0,
        phiship: 0,
        chietKhau: 0,
        maChiNhanh: "CN01",
        phuongThucThanhToan: "COD",
        daThanhToan: false || hoadon?.daThanhToan,
        steps: 0 || hoadon?.steps,
      });
    }
  }, [id]);
  const handleSubmit = () => {
    if (Object.keys(OrderForm.errors).length <= 0) {
      const params = { ...OrderForm.values };
      if (isCreated) {
        console.log({ params });
        alert("created");
      } else if (isUpdated) {
        console.log({ params });
        alert("updated");
      } else {
        console.log({ params });
        alert("READONLY");
      }
    } else {
      alert("Submit invalid");
      console.log({ errors: OrderForm.errors, values: OrderForm.values });
    }
  };
  const handleOnChangeBranch = (e) => {
    const guess = OrderForm.values.diaChiNavigation;
    const phiship = OrderForm.values.phiship;
    OrderForm.setValues({
      diaChiNavigation: guess || {
        name: "",
        phone: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        provinceID: null,
        districtID: null,
        wardID: null,
        addressDsc: "",
        email: "",
      },
      chiTietNhapXuats: [],
      thanhTien: 0,
      loaiPhieu: "PHIEUXUAT",
      tongSoLuong: 0,
      phiship: phiship || 0,
      chietKhau: 0,
      maChiNhanh: e,
      phuongThucThanhToan: "COD",

      daThanhToan: false || hoadon?.daThanhToan,
      steps: 0 || hoadon?.steps,
    });
    setproductSearchText("");
  };
  const handleXuatHangKhoiKho = () => {
    console.log({ body: OrderDetailForm.values });
    alert("Xuat hang khoi kho");
    dispatch(HoaDonApi.fetchPutXuatKho({ body: OrderForm.values }));
  };
  const handleThanhToan = () => {
    dispatch(HoaDonApi.fetchThanhToan({ body: OrderForm.values }));
  };
  return (
    <form ref={FormRef}>
      <Row gutter={[, 20]}>
        <Col span={24}>
          <Row justify={"space-between"}>
            <Space>{hoadon?.id || ""}</Space>
            <Space>
              <Steps
                current={
                  hoadon?.daThanhToan && hoadon?.daNhapHang
                    ? 4
                    : hoadon?.steps || 0
                }
                items={[
                  {
                    title: "Đặt hàng",
                  },
                  {
                    title: "Duyệt",
                  },
                  {
                    title: "Xuất kho",
                  },
                  {
                    title: "Hoàn thành",
                  },
                ]}
              />
            </Space>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col span={18}>
              <Card>
                {isCreated && (
                  <InputText
                    value={productSearchText}
                    label="Tìm kiếm sản phẩm"
                    className={`${
                      OrderForm.touched?.chiTietNhapXuats &&
                      OrderForm.errors.chiTietNhapXuats &&
                      "error"
                    }`}
                    onChange={(e) => handleChangeProductSearchText(e)}
                  />
                )}
                <List onItemClick={(e) => console.log(e)}>
                  {productSearchText &&
                    sanPhamTrongKho.length > 0 &&
                    sanPhamTrongKho.map((item) => {
                      const productInfo = item.sanPhamNavigation;
                      const url =
                        BASE_URL +
                          "wwwroot/res/SanPhamRes/Imgs/" +
                          productInfo?.parentID?.trim() +
                          "/" +
                          productInfo?.idColor?.trim() +
                          "/" +
                          productInfo?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
                        "";
                      return (
                        <ItemResult
                          value={productInfo}
                          onItemClick={(productInfo) =>
                            onClickProduct(productInfo)
                          }
                          labelProps={{
                            img: url,
                            name: productInfo.tenSanPham,
                            code: productInfo.maSanPham,
                            price: productInfo.giaNhap,
                            qty: item.soLuongTon,
                          }}
                        />
                      );
                    })}
                </List>
                <List></List>
                <ProductsTable
                  isEdit={isCreated ? true : false}
                  Form={OrderForm}
                />
                <span
                  className={`${OrderForm.errors?.chiTietNhapXuats && "error"}`}
                >
                  {" "}
                  {OrderForm.touched?.chiTietNhapXuats &&
                    OrderForm.errors.chiTietNhapXuats}
                </span>
                <Space
                  align="end"
                  style={{ width: "100%" }}
                  direction="vertical"
                >
                  <Space className="summaryItem">
                    <div>Số lượng:</div>
                    <div>{OrderForm?.values?.tongSoLuong}</div>
                  </Space>
                  <Space className="summaryItem">
                    <div>Thành tiền:</div>
                    <div>
                      {" "}
                      {convertVND(
                        OrderForm.values?.chiTietNhapXuats?.reduce(
                          (x, y) => x + y.thanhTien,
                          0
                        )
                      ) || 0}
                    </div>
                  </Space>
                  <Space className="summaryItem">
                    <div>phí giao hàng:</div>
                    <div> {convertVND(OrderForm.values?.phiship) || 0}</div>
                  </Space>
                  <Space style={{ width: "100%" }} className="summaryItem">
                    <InputText label="Nhập mã khuyến mãi "></InputText>
                  </Space>
                  <Space className="summaryItem">
                    <div>
                      <b>Tiền cần trả:</b>
                    </div>
                    <div> {convertVND(OrderForm.values?.thanhTien)}</div>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Mã chi nhánh">
                <Select
                  value={OrderForm.values?.maChiNhanh?.trim()}
                  onChange={(e) => handleOnChangeBranch(e)}
                  style={{ width: "100%" }}
                >
                  {branchs &&
                    branchs.map((branch) => {
                      return (
                        <Select.Option value={branch?.maChiNhanh.trim()}>
                          {branch?.tenChiNhanh}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          {isCreated && (
            <MyCollapse defaultOpen={true} label="Địa chỉ giao hàng">
              <AddressForm
                isCreated={isCreated}
                isReadOnly={isReadOnly}
                isUpdated={isUpdated}
                orderForm={OrderForm}
              />
            </MyCollapse>
          )}
          {(isReadOnly || isUpdated) && (
            <Card>
              <Descriptions layout="vertical">
                <Descriptions.Item label="Tên khách hàng">
                  {OrderForm.values.diaChiNavigation?.name || "--"}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {OrderForm.values.diaChiNavigation?.phone || "--"}
                </Descriptions.Item>
                <Descriptions.Item label="Email ">
                  {OrderForm.values.diaChiNavigation?.email || "--"}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ giao hàng">
                  {`${OrderForm.values?.diaChiNavigation?.wardName || "--"} - ${
                    OrderForm.values?.diaChiNavigation?.districtName || "--"
                  } - ${
                    OrderForm.values?.diaChiNavigation?.provinceName || "--"
                  }`}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ xuất hóa đơn">
                  {`${OrderForm.values?.diaChiNavigation?.wardName} - ${
                    OrderForm.values?.diaChiNavigation?.districtName
                  } - ${
                    OrderForm.values?.diaChiNavigation?.provinceName || "--"
                  }`}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Col>

        <Col md={24}>
          <Card title="Giao hàng">
            <strong>
              Phí giao hàng: {convertVND(OrderForm.values.phiship || 0)}
            </strong>
            <div></div>
            <strong>
              Tổng tiền cần thanh toán:{" "}
              {convertVND(OrderForm.values.thanhTien || 0)}
            </strong>
          </Card>
        </Col>
        {OrderForm.values?.daThanhToan ? null : (
          <Col md={24}>
            <Card
              title="Thanh toán"
              extra={<Button onClick={handleThanhToan}>Thanh toán</Button>}
            ></Card>
          </Col>
        )}
        {OrderForm.values?.daXuatKho ? null : (
          <Col md={24}>
            <Card
              title="Xuất hàng khỏi kho"
              extra={<Button onClick={handleXuatHangKhoiKho}>Xuất kho</Button>}
            ></Card>
          </Col>
        )}
        <FloatButton.Group icon={<File />} trigger="click">
          <FloatButton
            onClick={() => handleSubmit()}
            tooltip="Lưu"
            icon={<File />}
          ></FloatButton>
          <FloatButton
            onClick={() => handleSubmit()}
            tooltip="Lưu"
            icon={<File />}
          ></FloatButton>
        </FloatButton.Group>
      </Row>
    </form>
  );
};

export default OrderDetailForm;
