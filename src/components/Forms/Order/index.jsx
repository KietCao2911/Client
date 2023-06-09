import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import InputText from "~/components/commomComponents/InputText";
import * as GiaoHangNhanhApi from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
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
import { CreditCard, DollarSign, Gift, List, Phone, Plus, Search, Tag, Truck } from "react-feather";
import SelectCustom, {
  Option,
} from "~/components/commomComponents/SelectCustom";
import convertVND from "~/components/utils/ConvertVND";
import Promo from "./Promo";

const OrderForm = (props) => {
  document.title = "Trang thông tin giao hàng";
  const [promo,setPromo] = useState("")
  const { user } = useSelector((state) => state.XacThuc);
  const { ghnAPI, chiTietNhapXuats, thanhTien, tongSoLuong, phiShip,couponCode,chiTietCoupons,tienDaGiam,loadingCoupon ,couponNavigation} =
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
      ProvinceID: Yup.string().required("Phải nhập trường này"),
      DistrictID: Yup.string().required("Phải nhập trường này"),
      WardID: Yup.string().required("Phải nhập trường này"),
      phuongThucThanhToan: Yup.string().required("Phải chọn trường này"),
      AddressDsc: Yup.string().required("Phải nhập trường này"),
    }),

    initialTouched:{
      Name: false,
      Phone:false,
      Email: false,
      ProvinceID: false,
      DistrictID: false,
      WardID: false,
      phuongThucThanhToan: false,
    },
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
  const handleOrder = (method) => {
    const diaChiNavigation = orderForm.values;
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.thanhTien = thanhTien+(phiShip||0);
    cart.phiShip = phiShip;
    const params = {
      ...cart,
      diaChiNavigation,
    };
    
    if(!phiShip||!thanhTien)
    {
      alert("Phí giao hàng chưa được tính, vui lòng thao tác lại");
      return;
    }
    if (Object.keys(orderForm.errors).length <= 0) {
      // console.log({ order: params });
      if(method=="COD")
      {
        // alert("COD success request")
        dispatch(ThanhToanApi.OrderWithCOD(params));
      }
      else if(method=="VNPAY")
      {
        
        // alert("VNPAY success request")
        dispatch(ThanhToanApi.OrderWithVNPAY(params));
      }
      else{
        dispatch(ThanhToanApi.OrderWithStripe(params));
      }
    } else {
      message.open({
        content: "Kiểm tra lại thông tin",
        type: "error",
      });
    }
  };
  const handleAddPromo=()=>
  {
  if(promo)
  {
    const diaChiNavigation = orderForm.values;
    const cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.thanhTien = thanhTien+(phiShip||0);
    cart.phiShip = phiShip;
    cart.couponCode = promo;
    const params = {
      ...cart,
      diaChiNavigation,
    };
    dispatch(GiaoHangNhanhApi.fetchPostApplyCoupon(params))
  }
  }
  const handlePaymentMethod = (value) => {
    let cart = JSON.parse(window.localStorage.getItem("cart"));
    cart.phuongThucThanhToan = value;
    let cartString = JSON.stringify(cart);
    window.localStorage.setItem("cart", cartString);
    orderForm.setFieldValue("phuongThucThanhToan",value)
  };
  const fetch = async () => {
    dispatch(GiaoHangNhanhApi.fetchGetProvinces());
    orderForm.values?.ProvinceID &&
      dispatch(GiaoHangNhanhApi.fetchGetDistrict(orderForm.values?.ProvinceID));
    orderForm.values?.WardID &&
      dispatch(GiaoHangNhanhApi.fetchGetWard(orderForm.values?.DistrictID));
  };
  useEffect(() => {
    const address = JSON.parse(window.localStorage.getItem("address"));

    fetch();
  }, [orderForm.values.diaChiNavigation]);
  return (
    <form onSubmit={orderForm.handleSubmit} className="OrderForm" ref={formRef}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={[20,20]}>
            <Col md={12} xs={24}>
            <Card title="SHIPPING ADDRESS">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Name && "error"} `}
                  name={"Name"}
                  label="name"
                  value={orderForm.values.Name}
                  onChange={orderForm.handleChange}
                />
                {orderForm.touched.Name && orderForm.errors.Name && (
                  <small className="error">{orderForm.errors.Name}</small>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Phone && "error"} `}
                  name={"Phone"}
                  label="phone"
                  value={orderForm.values.Phone}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.Phone && (
                  <small className="error">{orderForm.errors.Phone}</small>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  className={`${orderForm.errors.Email && "error"} `}
                  name={"Email"}
                  label="email"
                  value={orderForm.values.Email}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.Email && (
                  <small className="error">{orderForm.errors.Email}</small>
                )}
              </Col>
              <Col span={24}>
                <InputText
                  name={"AddressDsc"}
                  label="address detail"
                  value={orderForm.values.AddressDsc}
                  onChange={orderForm.handleChange}
                />
                {orderForm.errors.AddressDsc && (
                  <small className="error">{orderForm.errors.AddressDsc}</small>
                )}
              </Col>
              <Col span={24}>
                <SelectCustom
                  value={orderForm.values.ProvinceID || ""}
                  onChange={handleChangeProvince}
                  name={"ProvinceID"}
                >
                  <Option value={null}>Province</Option>
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
                  <small className="error">{orderForm.errors.ProvinceID}</small>
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
                  <Option value={""}>District</Option>
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
                  <small className="error">{orderForm.errors.DistrictID}</small>
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
                  <Option value={""}>Ward</Option>
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
                  <small className="error">{orderForm.errors.WardID}</small>
                )}
              </Col>
            </Row>
          </Card>
            </Col>
            <Col md={12} xs={24}>
              <Row gutter={[20,20]}>
        <Col span={24}>
              <Space style={{width:"100%"} } direction="vertical">
              {
              (  !couponCode)&&<InputText
                loading={loadingCoupon}
                  value={promo}
                  onChange={(e)=>setPromo(e.target.value)}
                    icon={<Space>
                      <Plus onClick={handleAddPromo
                      }/>
                      <Search/>
                    </Space>}
                      label={`Enter your promo code `}
                    ></InputText>
              }

            {couponCode&&<Promo/>}
              </Space>
        </Col>
        <Col span={24}>
          <div className="InfoOrder"> 
            <div className="OrderDetails">
              <Card title="ORDER DETAILS">
                <Row gutter={[20, 20]}>
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
            </div>
          </div>
        </Col>
        <Col span={24}>
              <Row>
                <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col><b>x{tongSoLuong} items:</b></Col>
                    <Col>              {convertVND(
                chiTietNhapXuats?.reduce(
                  (x, y) => x + (y?.donGia * y?.soLuong || 0),
                  0
                )
              ) || convertVND(0)}</Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col><b> shipping:</b></Col>
                    <Col>              {convertVND(
                phiShip||0
              ) || convertVND(0)}</Col>
                  </Row>
                </Col>
                {couponCode&& <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col><b>Promotion: ( {couponCode} ) </b></Col>
                    <Col>
                    <del>
                    {convertVND(tienDaGiam||0)}
                    </del>
                    </Col>
                  </Row>
                </Col>}
                <Col span={24}>
                  <Row justify={"space-between"}>
                    <Col><b>Total:</b></Col>
                  <Col>{convertVND(tienDaGiam?thanhTien:thanhTien+phiShip)}</Col>
                  </Row>
                </Col>

              </Row>
          
        </Col>
        </Row>
            </Col>
          </Row>

        </Col>

      </Row>

      <div className="actionsOrder">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div className="OrderDsc"></div>
          <MyButton style={{backgroundColor:"black",color:"white"}} onClick={()=>handleOrder("COD")}  loading={loading} type="submit">
           <strong> ORDER NOW</strong>
          </MyButton >
          <MyButton  onClick={()=>handleOrder("VNPAY")} style={{backgroundColor:"#E23E57",color:"white"}} loading={loading} type="submit">
           <strong> ORDER/PAYMENT WITH VNPAY</strong>
          </MyButton >
          <MyButton loading={loading}  onClick={()=>handleOrder("PAYPAL")} style={{backgroundColor:"#002E80",color:"white"}} >
           <strong>ORDER/PAYMENT WITH PAYPAL</strong>
          </MyButton >
        </Space>
      </div>
    </form>
  );
};

export default OrderForm;
