import React, { useEffect } from "react";
import ProductInfoItem from "./components/ProductInfoItem";
import "./CartPage.scss";
import MyButton from "~/components/commomComponents/Button";
import { CreditCardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import OrderDsc from "~/components/commomComponents/OrderDsc/OrderDsc";
import { useDispatch, useSelector } from "react-redux";
import GioHangSlice, {
  ViewCart,
  RemoveItem,
} from "~/redux/slices/GioHang/GioHangSlice";
import { H1 } from "glamorous";
import EmptyCart from "./components/EmtyCart";
import { Card, Col, Row } from "antd";
import { v4 } from "uuid";
import * as GioHangAPI from "~/redux/slices/GioHang/GioHangSlice";
function CartPage() {
  document.title = "Giỏ hàng";
  const props = useSelector((state) => state.GioHang);
  const { chiTietNhapXuats } = props;
  const dispatch = useDispatch();
  const handleRemoveItemCart = (maSanPham) => {
    dispatch(RemoveItem(maSanPham));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(ViewCart());
    const cart = JSON.parse(window.localStorage.getItem("cart"))
  if(cart)
  {
    dispatch(GioHangAPI.fetchPostCheckCart(cart))
  }
  }, []);

  return (
    <>
      {chiTietNhapXuats.length > 0 ? (
        <div className="CartPage ">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={18}>
              <Row gutter={[0, 20]}>
                {chiTietNhapXuats &&
                  chiTietNhapXuats.map((item) => {
                    console.log({ item });
                    return (
                      <Col key={v4()} md={24} xs={24}>
                        <ProductInfoItem
                          {...item}
                          removeItemFnc={() =>
                            handleRemoveItemCart(item.maSanPham.trim())
                          }
                        />
                      </Col>
                    );
                  })}
              </Row>
            </Col>
            <Col md={6} xs={24}>
              <Card className="CartPayment">
                <OrderDsc />
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export default CartPage;
