import React from "react";
import MyButton from "~/components/commomComponents/Button";
import { CreditCardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./OrderDsc.scss";
import { useSelector, useDispatch } from "react-redux";
import convertVND from "~/components/utils/ConvertVND";
import { useEffect } from "react";
import GioHangSlice, { ViewCart } from "~/redux/slices/GioHang/GioHangSlice";
import { Card, Space } from "antd";
import InputText from "../InputText";
import { ArrowRight, Tag } from "react-feather";
const OrderDsc = (props) => {
  const { disableBtnPayment } = props;
  const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip } = useSelector(
    (state) => state.GioHang
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewCart());
  }, []);
  return (
    <div className="PaymentInfo" title="ORDER SUMMARY">
      <div className="content">
        <Space style={{ width: "100%" }} direction="vertical">
          <div className="QtyTotal">
            <p>x{tongSoLuong} item</p>
            <div className="price">
              {convertVND(
                chiTietNhapXuats?.reduce(
                  (x, y) => x + (y?.donGia * y?.soLuong || 0),
                  0
                )
              ) || convertVND(0)}
            </div>
          </div>
          {phiShip != 0 && (
            <div
              className="ShipPrice"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>Delivery</p>
              <p>{convertVND(phiShip)}</p>
            </div>
          )}
          <div className="TotalPrice">
            <h3>Total</h3>
            <div className="price">
              <b>{convertVND(thanhTien) || convertVND("0")}</b>
            </div>
          </div>
          {!disableBtnPayment && (
            <Link to="/giao-hang">
              {" "}
              <MyButton icon={<ArrowRight />} style={{ borderRadius: "unset" }}>
                ĐẾN TRANG THANH TOÁN
              </MyButton>
            </Link>
          )}
        </Space>
      </div>
    </div>
  );
};

export default OrderDsc;
