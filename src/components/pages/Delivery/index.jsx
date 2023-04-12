import React, { memo } from "react";
import "./DeliveryPage.scss";
import { useState } from "react";
import GioHangSlice, * as GiaoHangNhanhApi from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HaveUserComponent from "../../commomComponents/HaveUserAddressComponent";
import { Col, notification, Radio, Row, Space } from "antd";
import OrderForm from "~/components/Forms/Order";
import convertVND from "~/components/utils/ConvertVND";
import * as  ghnAPI  from "~/redux/slices/GHNAPI/GhnSlice";
import * as ThanhToanApi from "~/redux/slices/ThanhToanSlice";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
const DeliveryPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  const { DiaChi, loading } = useSelector((state) => state.ThanhToan);
  const { Provinces, Districts, Wards, FeeInfo, DistrictID, Loading } = ghnAPI;
  const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip } = useSelector(
    (state) => state.GioHang
  );
  const [error, setWrong] = useState(false);
  const [GuessInfo, setGuessInfo] = useState({
    Name: "",
    Phone: "",
    ProvinceName: "",
    DistrictName: "",
    WardName: "",
    ProvinceID: null,
    DistrictID: null,
    WardId: null,
    AddressDsc: "",
    Email: "",
    PaymendMethod: "COD",
  });
  useEffect(() => {
    if (user.info && user.info.length > 0) {
      const address = user.info.find((item) => item.id == user.addressDefault);
      if (address) {
        dispatch(
          GiaoHangNhanhApi.fetchPostCalFee({
            from_district_id: 1572,
            service_type_id: 2,
            to_district_id: address.districtID,
            to_ward_code: address.wardID,
            height: 50,
            length: 20,
            weight: 200,
            width: 20,
            insurance_value: thanhTien||0,
            coupon: null,
          })
        );
      }
    }
  }, [user]);
  const handleOrder = (paymentMethod) => {
      if (user.info && user.info.length > 0) {
        const address = user.info.find(
          (item) => item.id == user.addressDefault
        );
        const params = {
          Id: address.id,
          Name: address.name,
          Phone: address.phone,
          ProvinceName: address.provinceName,
          DistrictName: address.districtName,
          WardName: address.wardName,
          ProvinceID: address.provinceID,
          DistrictID: address.districtID,
          WardId: address.wardID,
          AddressDsc: address.addressDsc,
          Email: address.email,
          PaymendMethod: paymentMethod,
        };
        if (!error) {
          dispatch(
            ThanhToanApi.fetchPostWithGuess({
              DiaChi: params,
              hoaDonDetails: chiTietNhapXuats,
              HoaDon: {
                Thanhtien: parseInt(thanhTien * 1.1),
                totalQty: tongSoLuong,
                PhuongThucThanhToan: paymentMethod,
                Phiship: phiShip,
                idTaiKhoan: user.userName.trim(),
                idDiaChi: address.id,
              },
            })
          );
        } else {
          notification.open({
            message: "Vui lòng nhập đầy đủ thông tin",
            type: "error",
          });
        }
      }
    
  };
  const handleSubmit=()=>
  {
    if (user.info && user.info.length > 0) {
      const address = user.info.find(
        (item) => item.id == user.addressDefault
      );
      if(address)
      {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.thanhTien = thanhTien;
      cart.phiShip = phiShip;
      const params = {
        ...cart,
        idTaiKhoan: user.userName.trim(),
        idDiaChi: address.id,
      };
      dispatch(ThanhToanApi.fetchPostWithGuess(params));
      }
    }

    
  }
  return (
    <Row md={16}>
      <Col md={user?.info ?16:24}>
      {user?.info ? <HaveUserComponent /> : <OrderForm />}
      </Col>
        {
          user?.info?      <Col md={8}>
          <Space direction='vertical'>
                  <Row>
                    <Col span={24}>
                      <Row  style={{textAlign:"center"}}> 
                        <Col span={12}>
                         (x{tongSoLuong}) Sản phẩm:
                        </Col>
                        <Col span={12}>
                        {convertVND(
                    chiTietNhapXuats?.reduce(
                      (x, y) => x + (y?.donGia * y?.soLuong || 0),
                      0
                    )
                  ) || convertVND(0)}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}
                    >
                         <Row style={{textAlign:"center"}}> 
                        <Col span={12}>
                          Phí giao hàng:
                        </Col>
                        <Col span={12}>{convertVND(phiShip||0)}</Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                    <Row style={{textAlign:"center"}}> 
                        <Col span={12}>
                          Thành tiền:
                        </Col>
                        <Col span={12}>{convertVND(thanhTien) || convertVND("0")}</Col>
                      </Row>
                    </Col>
                  </Row>
                  <InputText label="Nhập mã khuyến mãi nếu có"></InputText>
                  <MyButton onClick={handleSubmit}>Xác nhận mua hàng</MyButton>
                  </Space></Col>:null
        }

    </Row>
  );
};

export default DeliveryPage;
