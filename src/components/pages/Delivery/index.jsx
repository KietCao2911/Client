import React, { memo } from "react";
import "./DeliveryPage.scss";
import { useState } from "react";
import GioHangSlice, * as GiaoHangNhanhApi from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HaveUserComponent from "../../commomComponents/HaveUserAddressComponent";
import { Card, Col, notification, Radio, Row, Space } from "antd";
import OrderForm from "~/components/Forms/Order";
import convertVND from "~/components/utils/ConvertVND";
import * as ThanhToanApi from "~/redux/slices/ThanhToanSlice";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
import { Box, DollarSign, Plus, Search, Truck } from "react-feather";
import Promo from "~/components/Forms/Order/Promo";
import * as GioHangAPI from "~/redux/slices/GioHang/GioHangSlice";
const DeliveryPage = () => {
  const dispatch = useDispatch();
  const [promo,setPromo] = useState("")

  const { user } = useSelector((state) => state.XacThuc);
  const { DiaChi, loading } = useSelector((state) => state.ThanhToan);
  const { ghnAPI } = useSelector((state) => state.GioHang);
  const [disableBtn,setDisableBtn] = useState(true);
  const { Provinces, FeeCount,Districts, Wards, FeeInfo, DistrictID, Loading } = ghnAPI;
  const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip,couponCode,loadingCoupon,couponNavigation,tienDaGiam } = useSelector(
    (state) => state.GioHang
  );

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
        setDisableBtn(false);
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
            insurance_value: parseInt( thanhTien+((tienDaGiam||0))) ||0,
            coupon: null,
          })
        );
      }
    }
  }, [user]);
  useEffect(()=>
  {
    const cart = JSON.parse(window.localStorage.getItem("cart"))
    if(cart)
    {
      dispatch(GioHangAPI.fetchPostCheckCart(cart))
    }
  },[])
  const handleOrder=(method)=>
  {
    if (user.info && user.info.length > 0) {
      const address = user.info.find(
        (item) => item.id == user.addressDefault
      );
      if(address)
      {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.thanhTien = thanhTien+(phiShip||0);
      cart.phiShip = phiShip;
      const params = {
        ...cart,
        idTaiKhoan: user.userName.trim(),
        idDiaChi: address.id,
      };
      if(method=="COD")
      {
        dispatch(ThanhToanApi.OrderWithCOD(params));
        
      }
      else if(method=="VNPAY")
      {
        dispatch(ThanhToanApi.OrderWithVNPAY(params));

      }else{
        dispatch(ThanhToanApi.OrderWithStripe(params));
      }
    }
    }

    
  }
  const handleAddPromo=()=>
  {
  if(promo)
  {
   if (user.info && user.info.length > 0) {
     const address = user.info.find(
       (item) => item.id == user.addressDefault
     );
     if(address)
     {
       const cart = JSON.parse(window.localStorage.getItem("cart"));
       cart.thanhTien = thanhTien+(phiShip||0);
       cart.phiShip = phiShip;
       cart.couponCode = promo;
       const params = {
         ...cart,
         idTaiKhoan: user.userName.trim(),
         idDiaChi: address.id,
       };
      

        dispatch(GiaoHangNhanhApi.fetchPostApplyCoupon(params))
     }
   }
   
  }
  }
  if(chiTietNhapXuats&&chiTietNhapXuats.length<=0)
  {
   return  window.location.replace("/gio-hang")
  }
  return (
    <Row gutter={[10,10]}>
      <Col xs={24} md={user?.info ?16:24}>
      {user?.info ? <HaveUserComponent /> : <OrderForm />}
      </Col >
        {
          user?.info?      <Col md={8}>
        <Card>
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
                        <Col span={12}>{convertVND(tienDaGiam?thanhTien:thanhTien+phiShip) || convertVND("0")}</Col>
                      </Row>
                    </Col>
                  </Row>
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
                  <MyButton icon={<Truck/>} style={{backgroundColor:"black",color:"white"}} onClick={()=>handleOrder("COD")}  
                  loading={loading||Loading.FeeCount} type="submit">
           <strong> ORDER NOW</strong>
          </MyButton >
          <MyButton  onClick={()=>handleOrder("VNPAY")} 
          style={{backgroundColor:"#E23E57",color:"white"}} loading={loading||Loading.FeeCount} type="submit">
           <strong> ORDER/PAYMENT WITH VNPAY</strong>
          </MyButton >
          <MyButton   loading={loading||Loading.FeeCount} onClick={()=>handleOrder("PAYPAL")}
           style={{backgroundColor:"#002E80",color:"white"}} >
           <strong>ORDER/PAYMENT WITH PAYPAL</strong>
          </MyButton >
                  </Space>
          </Card></Col>:null
        }

    </Row>
  );
};

export default DeliveryPage;
