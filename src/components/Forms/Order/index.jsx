import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import InputText from "~/components/commomComponents/InputText";
import { SelectInput } from "~/components/commomComponents/SelectInput";
import * as GiaoHangNhanhApi from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
import { Link } from "react-router-dom";
import { CarOutlined } from "@ant-design/icons";
import ThanhToanSlice, { AddressInfo } from "~/redux/slices/ThanhToanSlice";
import "./OrderForm.scss";
import {
  Alert,
  Card,
  Col,
  message,
  notification,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import { v4 } from "uuid";
import * as ThanhToanApi from "~/redux/slices/ThanhToanSlice";
import CustomSpin from "~/components/CustomSpin";
import OrderDsc from "~/components/commomComponents/OrderDsc/OrderDsc";
import ProductInfoItem from "~/components/pages/Cart/components/ProductInfoItem";
import { CreditCard, Gift, List, Truck } from "react-feather";
import SelectCustom, {
  Option,
} from "~/components/commomComponents/SelectCustom";

const OrderForm = (props) => {
  document.title = "Trang thông tin giao hàng";
  const { user } = useSelector((state) => state.XacThuc);
  const { ghnAPI, chiTietNhapXuats, thanhTien, tongSoLuong, phiShip } =
    useSelector((state) => state.GioHang);
  const [infoLocalStorage, setInfoLocalStorage] = useState(() => {
    const values =
      JSON.parse(window.localStorage.getItem("cart"))?.diaChiNavigation || {};
    return values;
  });
  const { Provinces, Districts, Wards, FeeInfo, DistrictID, Loading } = ghnAPI;
  const { DiaChi, loading } = useSelector((state) => state.ThanhToan);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const formRef = useRef();
  const dispatch = useDispatch();

  const orderForm = useFormik({
    initialValues: {
      Name: infoLocalStorage.Name || "",
      Phone: infoLocalStorage.Phone || "",
      ProvinceName: infoLocalStorage.ProvinceName || "",
      DistrictName: infoLocalStorage.DistrictName || "",
      WardName: infoLocalStorage.wardName || "",
      ProvinceID: infoLocalStorage.ProvinceID || null,
      DistrictID: infoLocalStorage.DistrictID || null,
      WardID: infoLocalStorage.WardID || null,
      AddressDsc: infoLocalStorage.AddressDsc || "",
      Email: infoLocalStorage.Email || "",
      phuongThucThanhToan: infoLocalStorage.phuongThucThanhToan || "COD",
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Phải nhập trường này"),
      Phone: Yup.string()
        .required("Phải nhập trường này")
        .matches(phoneRegExp, "Định dạng số điện thoại không đúng")
        .min(10, "Số điện thoại phải hơn 10 chữ số")
        .max(10, "Số điện thoại không quá 10 chữ số"),
      Email: Yup.string()
        .required("Phải nhập trường này")
        .matches(emailRegex, "Định dạng email không đúng"),
      ProvinceID: Yup.number().nullable(true).required("Phải chọn trường này"),
      DistrictID: Yup.number().nullable(true).required("Phải chọn trường này"),
      WardID: Yup.number().nullable(true).required("Phải chọn trường này"),
      phuongThucThanhToan: Yup.string().required("Phải chọn trường này"),
      AddressDsc: Yup.string().required("Phải nhập trường này"),
    }),
    onSubmit: (values) => {
      handleOrder();
    },
  });

  const handleChangeProvince = (id, name) => {
    orderForm.setFieldValue("ProvinceName", name);
    orderForm.setFieldValue("ProvinceID", id);
    orderForm.setFieldValue("DistrictName", "");
    orderForm.setFieldValue("DistrictID", null);
    orderForm.setFieldValue("WardName", "");
    orderForm.setFieldValue("WardID", null);
    dispatch(GiaoHangNhanhApi.fetchGetDistrict(id));
  };
  const handleChangeDistrict = (id, name) => {
    orderForm.setFieldValue("DistrictName", name);
    orderForm.setFieldValue("DistrictID", id);
    orderForm.setFieldValue("WardName", "");
    orderForm.setFieldValue("WardID", null);
    dispatch(GiaoHangNhanhApi.fetchGetWard(id));
  };
  const CalFee = (id, name) => {
    if (id == null) {
      return;
    } else {
      orderForm.setFieldValue("WardName", name);
      orderForm.setFieldValue("WardID", id);
      dispatch(
        GiaoHangNhanhApi.fetchPostCalFee({
          from_district_id: 1572,
          service_type_id: 2,
          to_district_id: Wards.data[0].DistrictID,
          to_ward_code: id,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: thanhTien,
          coupon: null,
        })
      );
    }
  };
  const handleOrder = () => {
    const diaChiNavigation = orderForm.values;
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.thanhTien = thanhTien;
    cart.phiShip = phiShip;
    const params = {
      ...cart,
      diaChiNavigation,
    };
    if (Object.keys(orderForm.errors).length <= 0) {
      // console.log({ order: params });
      dispatch(ThanhToanApi.fetchPostWithGuess(params));
    } else {
      message.open({
        content: "Kiểm tra lại thông tin",
        type: "error",
      });
    }
  };
  const handlePaymentMethod = (value) => {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.phuongThucThanhToan = value;
    let cartString = JSON.stringify(cart);
    window.localStorage.setItem("cart", cartString);
  };
  const fetch = async () => {
    dispatch(GiaoHangNhanhApi.fetchGetProvinces());
    orderForm.values?.ProvinceID &&
      dispatch(GiaoHangNhanhApi.fetchGetDistrict(orderForm.values?.ProvinceID));
    orderForm.values?.WardID &&
      dispatch(GiaoHangNhanhApi.fetchGetWard(orderForm.values?.DistrictID));
  };
  const test = useMemo(() => {
    fetch();
  }, [orderForm.values.diaChiNavigation]);
  useEffect(() => {
    const address = JSON.parse(window.localStorage.getItem("address"));

    fetch();
  }, [orderForm.values.diaChiNavigation]);
  return (
    <form onSubmit={orderForm.handleSubmit} className="OrderForm" ref={formRef}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card title="Địa chỉ giao hàng">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Name && "error"} `}
                  name={"Name"}
                  label="Tên"
                  value={orderForm.values.Name}
                  onChange={orderForm.handleChange}
                />
                {orderForm.touched.Name && orderForm.errors.Name && (
                  <span className="error">{orderForm.errors.Name}</span>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Phone && "error"} `}
                  name={"Phone"}
                  label="Số điện thoại"
                  value={orderForm.values.Phone}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.Phone && (
                  <span className="error">{orderForm.errors.Phone}</span>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Email && "error"} `}
                  name={"Email"}
                  label="Email"
                  value={orderForm.values.Email}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.Email && (
                  <span className="error">{orderForm.errors.Email}</span>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  name={"AddressDsc"}
                  label="Chi tiết địa chỉ"
                  value={orderForm.values.AddressDsc}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.AddressDsc && (
                  <span className="error">{orderForm.errors.AddressDsc}</span>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={orderForm.values.ProvinceID || ""}
                  onChange={handleChangeProvince}
                  name={"ProvinceID"}
                >
                  <Option value={null}>Vui lòng chọn Tỉnh/Thành phố</Option>
                  {Provinces.data &&
                    Provinces.data.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeProvince(
                              item.ProvinceID,
                              item.ProvinceName
                            )
                          }
                          key={item.ProvinceID}
                          value={item.ProvinceID}
                        >
                          {item.ProvinceName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors.ProvinceID && (
                  <span className="error">{orderForm.errors.ProvinceID}</span>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={orderForm.values.DistrictID || ""}
                  onChange={handleChangeDistrict}
                  loading={Loading.Districts}
                  name="DistrictID"
                  defaultLabel="Quận/Huyện"
                >
                  <Option value={""}>Vui lòng chọn Quận/Huyện</Option>
                  {Districts.data &&
                    Districts?.data?.map((item) => {
                      return (
                        <Option
                          onClick={() =>
                            handleChangeDistrict(
                              item.DistrictID,
                              item.DistrictName
                            )
                          }
                          key={item.DistrictID}
                          value={item.DistrictID}
                        >
                          {item.DistrictName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors.DistrictID && (
                  <span className="error">{orderForm.errors.DistrictID}</span>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={orderForm.values.WardID || ""}
                  onChange={(e) => CalFee(e)}
                  loading={Loading.Wards}
                  defaultLabel="Xã/Phường"
                  name="WardID"
                >
                  <Option value={""}>Vui lòng chọn Xã/Phường</Option>
                  {Wards.data &&
                    Wards?.data?.map((item) => {
                      return (
                        <Option
                          onClick={() => CalFee(item.WardCode, item.WardName)}
                          value={item.WardCode}
                        >
                          {item.WardName}
                        </Option>
                      );
                    })}
                </SelectCustom>
                {orderForm.errors.WardID && (
                  <span className="error">{orderForm.errors.WardID}</span>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title="Phương thức thanh toán"
            className="PaymentMethod"
            extra={<CreditCard />}
          >
            <Radio.Group
              value={orderForm.values?.phuongThucThanhToan}
              onChange={(e) => handlePaymentMethod(e.target.value)}
            >
              <Space direction="vertical">
                <Radio value="COD">Thanh toán khi nhận hàng</Radio>
                <Radio value={"VNPAY"}>
                  {" "}
                  <Truck />
                  Thanh toán với VNPAY{" "}
                </Radio>
              </Space>
            </Radio.Group>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={`Mã khuyến mãi/quà tặng`} extra={<Gift />}>
            <InputText
              label={`Nhập mã khuyến mãi có được tại đây `}
            ></InputText>
          </Card>
        </Col>
        {loading && <CustomSpin></CustomSpin>}
        <Col span={24}>
          <div className="InfoOrder">
            <div className="Login">
              {/* <LoginComponent></LoginComponent> */}
            </div>

            <div className="OrderDetails">
              <Card title="Chi tiết đơn hàng">
                <Row gutter={[0, 20]}>
                  {chiTietNhapXuats &&
                    chiTietNhapXuats.map((item) => {
                      return (
                        <Col span={24}>
                          <ProductInfoItem
                            style={{ border: "unset" }}
                            {...item}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </Card>

              {/* <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem>
          <ProductInfoItem></ProductInfoItem> */}
            </div>
            {Object.keys(user).length > 0 && (
              <>
                <MyButton onClick={() => handleOrder("VNPAY")}>
                  Thanh toán với VNPAY
                </MyButton>
                <MyButton onClick={() => handleOrder("COD")}>
                  Thanh toán khi nhận hàng
                </MyButton>
              </>
            )}
          </div>
        </Col>
        <Col span={24}>
          {" "}
          <OrderDsc
            ship={FeeInfo?.data?.total}
            disableBtnPayment={true}
          ></OrderDsc>
        </Col>
      </Row>

      <div className="actionsOrder">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="OrderDsc"></div>
          <button type="submit" className="btnAcceptOrder">
            THANH TOÁN
          </button>
        </Space>
      </div>
    </form>
  );
};

export default OrderForm;
