import React, { useMemo } from "react";
import "./ProductInfoItem.scss";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as APIKichCo from "~/redux/slices/KichCoSlice";
import convertVND from "~/components/utils/ConvertVND";
import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Space, notification } from "antd";
import { v4 } from "uuid";
import { UpdateQtyItem } from "~/redux/slices/GioHang/GioHangSlice";
import { X } from "react-feather";
import { BASE_URL } from "~/const";
import SelectCustom, {
  Option,
} from "~/components/commomComponents/SelectCustom";
import { GetQTY } from "~/redux/slices/SanPham/Users/SanPhamAPI";
function ProductInfoItem(props) {
  const { donGia, soLuong, maSanPham, sanPhamNavigation, removeItemFnc } =
    props;
  const [qtyInfo,setQtyInfo] = useState({});
  const [qty, setQty] = useState(soLuong || 0);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    if (removeItemFnc) removeItemFnc();
  };
  const Render = useMemo(() => {
    const t = [];
    const onClickChangeQty = (qty) => {
      dispatch(UpdateQtyItem({ maSP: maSanPham, qty }));
    };
    let qty =  qtyInfo.soLuongCoTheban>10?10: qtyInfo.soLuongCoTheban;
    for (let i = 0; i <qty; i++) {
      t.push(
        <Option key={v4()} onClick={() => onClickChangeQty(i + 1)} value={i + 1}>
          {i + 1}
        </Option>
      );
    }
    setOptions(t);
  }, [qtyInfo]);

  useEffect(() => {
    const fetchQty=async()=>
    {
      const res =await GetQTY(maSanPham);
      setQtyInfo({...res})
    }
    fetchQty();
  }, []);
  return (
    <Link to={"#"} className="PrductInfoItem" {...props}>
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
              <p>{convertVND(sanPhamNavigation?.giaBanLe) || "---"}</p>
            </Col>
            <Col span={24}>
              <Space direction="vertical" style={{width:"100%"}}>
              <Space>
                    <span>SIZE:</span>
                    <span>{sanPhamNavigation?.idSize}</span>
                  </Space>
                <Space>
                    <span>COLOR: </span>
                    <div
                      className="colorValue"
                      style={{
                        padding:"1rem", backgroundColor: `${sanPhamNavigation?.idColor}`,
                      }}
                    ></div>
                  </Space>
                <Space style={{width:"100%"}}>
                    <span>QUANTITY:</span>
                     <SelectCustom value={soLuong} setValue={setQty} >
                      {options&&options.map((item) => item)}
                    </SelectCustom>
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
