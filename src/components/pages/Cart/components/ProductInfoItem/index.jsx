import React, { useMemo, useRef } from "react";
import "./ProductInfoItem.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as APIKichCo from "~/redux/slices/KichCoSlice";
import convertVND from "~/components/utils/ConvertVND";
import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space, notification } from "antd";
import { v4 } from "uuid";
import { UpdateQtyItem } from "~/redux/slices/GioHang/GioHangSlice";
import { X } from "react-feather";
import { BASE_URL } from "~/const";
import SelectCustom, {
  Option,
} from "~/components/commomComponents/SelectCustom";
import { GetQTY } from "~/redux/slices/SanPham/Users/SanPhamAPI";
import InputText from "~/components/commomComponents/InputText";
import MyButton from "~/components/commomComponents/Button";
import QTYInput from "~/components/commomComponents/QTYInput";
import LoadingElement from "~/components/commomComponents/LoadingElement";
function ProductInfoItem(props) {
  const { donGia, soLuong, maSanPham, sanPhamNavigation, removeItemFnc } =
    props;
  const [loading,setLoading] = useState(false);
  const [qty, setQty] = useState(soLuong || 0);

  const dispatch = useDispatch();
  const comRef = useRef();
  const handleRemoveItem = () => {
    if (removeItemFnc) removeItemFnc();
  };
  const handleChangeQty=async(e)=>
  {
    
    const value = e.target.value
    setQty(value);
    
  }
  const handleSubmitChange=async()=>
  {
    if(qty!=soLuong)
    {
      setLoading(true)
      const res =await GetQTY(maSanPham);
      setLoading(false)
      if(res.soLuongTon>=qty)
      {
        dispatch(UpdateQtyItem({ maSP: maSanPham, qty:parseInt(qty) }));
    }
    else{
      alert("Số lượng yêu cầu vượt quá số lượng cho phép")
    }
    }
  }
  const handleMinus=async()=>
  {

    setLoading(true)
      const res =await GetQTY(maSanPham);
      setLoading(false)
      if(res.soLuongTon>=qty-1)
      {
      setQty(qty-1);
      dispatch(UpdateQtyItem({ maSP: maSanPham, qty:parseInt(qty-1) }));
    }
    else{
      alert("Số lượng yêu cầu vượt quá số lượng cho phép")
    }
  }
  const handlePlus=async()=>
  {
    setLoading(true)
      const res =await GetQTY(maSanPham);
      setLoading(false)
      if(res.soLuongTon>=qty+1)
      {
      setQty(qty+1);
      dispatch(UpdateQtyItem({ maSP: maSanPham, qty:parseInt(qty+1) }));
    }
    else{
      alert("Số lượng yêu cầu vượt quá số lượng cho phép")
    }
  }
  return (
    <Link ref={comRef} to={"#"} className="PrductInfoItem" {...props}>
      <X
        style={{ display: `${!removeItemFnc && "none"}`, zIndex: "99" }}
        className="closeIcon"
        onClick={handleRemoveItem}
      />
      <Row gutter={[10, 10]}>
        <Col md={6} xs={12} className="img">
          <img
            src={
              BASE_URL +
                "wwwroot/res/SanPhamRes/Imgs/" +
                sanPhamNavigation?.parentID?.trim() +
                "/" +
                sanPhamNavigation?.idColor?.trim() +
                "/" +
                sanPhamNavigation?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
              "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
          />
        </Col>
        <Col className="content" md={18} xs={12}>
          <Row style={{height:"100%"}} align="middle" justify={"center"}>
            <Col span={24} >
              <div className="name">
                <h4>
                  {sanPhamNavigation.tenSanPham ||
                    "CAMPUS 80S SOUTH PARK TOWELIE"}
                </h4>
              </div>
             <Space>
              {sanPhamNavigation?.tienDaGiam>0&&<del style={{color:"red"}}>{convertVND(sanPhamNavigation?.tienDaGiam+sanPhamNavigation?.giaBanLe)} </del>}
             <p>{convertVND(sanPhamNavigation?.giaBanLe) || "---"}</p>
             </Space>
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{width:"100%"}}>
              <Space>
                    <span>Kích thước:</span>
                    <span>{sanPhamNavigation?.idSize}</span>
                  </Space>
                <Space>
                    <span>Màu: </span>
                    <div
                      className="colorValue"
                      style={{
                        padding:"1rem", backgroundColor: `${sanPhamNavigation?.idColor}`,
                      }}
                    ></div>
                  </Space>
                <Space style={{width:"100%"}}>
                    <span>Số lượng:</span>
                     {loading?<LoadingElement/>: <QTYInput handleMinus={handleMinus} handlePlus={handlePlus} value={qty} onBlur={handleSubmitChange} onChange={handleChangeQty}/>}
                   {/* <MyButton onClick={handleSubmitChange}>Thay đổi</MyButton> */}
                  </Space>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Link>
  );
}

export default ProductInfoItem;
