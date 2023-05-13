import React, { useState } from "react";
import "./ProductDetail.scss";
import { useSelector, useDispatch } from "react-redux";
import "swiper/css/pagination";
import { Col, Row, Space, Rate, notification, Card, Pagination, Badge } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as SanPhamAPI from "~/redux/slices/SanPham/Users";
import {GetQTY} from "~/redux/slices/SanPham/Users/SanPhamAPI"
import { v4 as uuidv4 } from "uuid";
import convertVND from "~/components/utils/ConvertVND";
import SizeSelect from "./components/SizeCompoent";
import ColorComponent from "./components/ColorComponent";
import {
  ArrowRightOutlined,
  CarOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import GioHangSlice, { AddToCart } from "~/redux/slices/GioHang/GioHangSlice";
import MyCollapse from "~/components/commomComponents/Collapse";
import ReactHtmlParser from "react-html-parser";
import CustomSpin from "~/components/CustomSpin";
import { Plus, PlusSquare, Star } from "react-feather";
import { BASE_URL } from "~/const";
import Breadcrumb from "~/components/commomComponents/Breadcrumb";
import ListProducts from "~/components/commomComponents/ListProducts";
import ShowMore from "~/components/commomComponents/ShowMore";


const handleCheckQtyProduct=async(product,productsArray)=>
{
  const obj =  productsArray.chiTietNhapXuats.find(
    (x) => x.maSanPham.trim() == product.maSanPham.trim()
  );
  if(obj)
  {
    const res = await GetQTY(product.maSanPham);
    console.log({res,obj})
    if(res.soLuongCoTheban< obj.soLuong+1)
    {
      alert("Số lượng trong kho không cho phép");
      return false;
    }
    else{
      return true;
    }
  }
  else
  {
    return true;
  }
}

const TrangChiTietSanPham = () => {
  const dispatch = useDispatch();
  const { product, loading, qtyInfo } = useSelector((state) => state.SanPham);
  const Carts = useSelector((state) => state.GioHang);
  const { slug } = useParams();
  const [productsRecentlyView, setProductsRecentlyView] = useState(
    JSON.parse(window.localStorage.getItem("recentlyView")) || []
  );
  document.title = "Sản phẩm - " + product?.sanPhamNavigation?.tenSanPham;
  const handleAddToCart = async () => {
    if (product.productCurrent && product.productCurrent.maSanPham) {
      const productChild = product.productCurrent;
      const check =await handleCheckQtyProduct(productChild,Carts)

      if(!check)
      {
        return;
      }

      let CartItem = {};
      CartItem.soLuong = 1;
      CartItem.img =
        BASE_URL +
          "wwwroot/res/SanPhamRes/Imgs/" +
          productChild?.parentID?.trim() +
          "/" +
          productChild?.idColor?.trim() +
          "/" +
          productChild?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
        "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      CartItem.maSanPham = productChild?.maSanPham;
      CartItem.sanPhamNavigation = productChild;
      CartItem.donGia = productChild?.giaBanLe || 0;
      CartItem.thanhTien = productChild?.giaBanLe || 0;
      CartItem.maChiNhanh =
        JSON.parse(window.localStorage.getItem("location"))?.maChiNhanh || null;
      dispatch(AddToCart(CartItem));
    } else {
      notification.open({
        type: "error",
        message: "Vui lòng chọn kích thước",
      });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(SanPhamAPI.fetchGetProductUser({ slug }));
  }, [slug]);
  return loading ? (
    <CustomSpin />
  ) : (
    <Row gutter={{ md: 20 }} className="ProductDetail">
      <Col md={16}>
        <Row gutter={[10,10]}>
          <Col className="ProductInfo" md={24} xs={24}>
            <Col xs={0} md={24}>
              <Breadcrumb location="PRODUCT" style={{ width: "100%" }} />
            </Col>
            <Col xs={24} md={0}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Breadcrumb location="PRODUCT"/>
                <Rate
                  style={{ color: "black" }}
                  allowHalf
                  disabled
                  value={product?.sanPhamNavigation?.starReviewNavigation?.avr}
                />{" "}
              </Row>
              <h1 className="InfoTitle">
                {product?.sanPhamNavigation?.tenSanPham || "GIÀY SUPERSTAR TAEGEUKDANG"}
              </h1>
              <p className="InfoPrice">
                {convertVND(
                  product?.sanPhamNavigation?.productCurrent?.giaBanLe ||
                    product?.sanPhamNavigation?.giaBanLe ||
                    0
                )}
              </p>
              <p>
                Mã SKU:{" "}
                {product?.productCurrent?.maSanPham ||
                  product?.sanPhamNavigation?.maSanPham}
              </p>
            </Col>
            <ShowMore>
              <Row>
                {product?.sanPhamNavigation?.imgsDisplay &&
                  product?.sanPhamNavigation?.imgsDisplay.map((img) => {
                    const url =
                      BASE_URL +
                      "wwwroot/res/SanPhamRes/Imgs/" +
                      product?.maSanPham?.trim() +
                      "/" +
                      img?.idMaMau?.trim() +
                      "/" +
                      img?.idHinhAnhNavigation?.fileName?.trim();
                    return (
                      <Col xs={24} md={12} key={uuidv4()}>
                        <img src={url || ""} />
                      </Col>
                    );
                  })}
              </Row>
            </ShowMore>

          </Col>
          {/* Product Description */}
          <Col xs={{ order: 1, span: 24 }} md={24}>
            <Col md={24}>
              {product?.related && product?.related.length > 0 && (
                <Space style={{ width: "100%" }} direction="vertical">
                  <h1 style={{ textTransform: "uppercase" }}>
                    Có thể bạn sẽ thích
                  </h1>
                  <ListProducts
                    type={"slider"}
                    items={product?.related || []}
                  />
                </Space>
              )}
            </Col>

            {productsRecentlyView && productsRecentlyView.length > 0 && (
              <Col md={24}>
                <Space style={{ width: "100%" }} direction="vertical">
                  <h1 style={{ textTransform: "uppercase" }}>
                  RECENTLY VIEWED ITEMS
                  </h1>
                  <ListProducts
                    type={"slider"}
                    items={productsRecentlyView}
                  ></ListProducts>
                </Space>

              </Col>
            )}
          </Col>
          {/* Product Checkout forMB*/}
          <Col md={0} className="ProductInfo">
            <Space size={8} direction="vertical">
              <Space style={{ width: "100%" }} direction="vertical">
                <strong>Kích cỡ</strong>
                {product?.productInfoByColor?.length > 0 ? (
                               <SizeSelect
                               checkedValue={product.productCurrent?.idSize}
                               items={product?.productInfoByColor || []}
                             />
                ) : (
                  <strong
                    style={{ color: "	#df4759" }}
                  >{`Sản phẩm đã hết hàng :(`}</strong>
                )}
              </Space>
              <Space style={{ width: "100%" }} direction="vertical">
                <strong>Màu sắc</strong>
                <ColorComponent
                  items={product?.sanPhamNavigation?.colorGrouped}
                ></ColorComponent>
              </Space>

              <button className="AddToCart" onClick={handleAddToCart}>
                <strong>THÊM VÀO GIỎ HÀNG</strong>
                <ArrowRightOutlined />
              </button>
              <a href="">
                <CarOutlined /> QUAY LẠI DỄ DÀNG
              </a>
              <a href="">
                <RollbackOutlined /> Không đúng kích cỡ hoặc màu sắc? Vui lòng
                truy cập trang Trả lại hàng & Hoàn tiền của chúng tôi để biết
                chi tiết
              </a>
              {product?.sanPhamNavigation?.mota && (
                <MyCollapse defaultOpen={false} label="Mô tả">
                  <div style={{ textAlign: "start" }}>
                    {ReactHtmlParser(product?.sanPhamNavigation?.mota)}
                  </div>
                </MyCollapse>
              )}
              {product?.sanPhamNavigation?.motaChiTiet && (
                <MyCollapse defaultOpen={false} label="Chi tiết">
                  <div style={{ textAlign: "start" }}>
                    {ReactHtmlParser(product?.sanPhamNavigation?.motaChiTiet)}
                  </div>
                  {/* {ReactHtmlParser(product?.motaChiTiet)} */}
                </MyCollapse>
              )}
                         <MyCollapse label="REVIEWS " Icon={ <Rate
                  style={{ color: "black" }}
                  allowHalf
                  disabled
                  value={product?.sanPhamNavigation?.starReviewNavigation?.avr}
                />}>
{product?.sanPhamNavigation?.starReviewNavigation?.starReviewDetails?.map(review=>
                    {
                      return <Space style={{width:"100%"}} direction="vertical">
                        <Card  bordered={false} role="article" extra={<Rate
                        style={{ color: "black" }}
                        allowHalf
                        disabled
                        value={review?.rating}
                      />} defaultOpen={true} title={`Ẩn danh`}>
                        {review?.comment||""}
                      </Card>
                      </Space>
                    })}
                </MyCollapse>
            </Space>
          </Col>
        </Row>
      </  Col>
      <Col md={8} xs={0}>
        {/* Product Checkout forPC*/}
        <Space className="ProductInfo" direction="vertical">
          <Space style={{ width: "100%" }} direction="vertical">
            <div className="InfoHeader">
              <div className="InforHeader_ClsName">
                {/* {product?.boSuuTap?.value || "Chưa thuộc bộ sưu tập nào"} */}
              </div>
              <a href="#ReviewPC" className="InforHeader_Star">
                <Badge count={product?.sanPhamNavigation?.starReviewNavigation?.total} color={"black"}>
                <Rate
                  style={{ color: "black" }}
                  allowHalf
                  disabled
                  value={product?.sanPhamNavigation?.starReviewNavigation?.avr}
                />
                </Badge>
              
              </a>
            </div>
            <div>
              {" "}
              <h1 className="InfoTitle">
                {product?.sanPhamNavigation?.tenSanPham ||
                  "GIÀY SUPERSTAR TAEGEUKDANG"}
              </h1>
              <p className="InfoPrice">
                {convertVND(product?.productCurrent?.giaBanLe || 0)}
              </p>
              <p>
                Mã SKU:{" "}
                {product?.productCurrent?.maSanPham ||
                  product?.sanPhamNavigation?.maSanPham}
              </p>
            </div>
          </Space>

          <Space style={{ width: "100%" }} direction="vertical">
            <strong>Kích cỡ</strong>
            {product?.productInfoByColor?.length > 0 ? (
              <SizeSelect
                checkedValue={product.productCurrent?.idSize}
                items={product?.productInfoByColor || []}
              />
            ) : (
              <strong
                style={{ color: "	#df4759" }}
              >{`Sản phẩm đã hết hàng :(`}</strong>
            )}
          </Space>
          <Space direction="vertical" style={{ width: "100%" }}>
            <strong>Màu sắc</strong>
            <ColorComponent
              items={product?.sanPhamNavigation?.colorGrouped}
            ></ColorComponent>
          </Space>

          <button className="AddToCart" onClick={handleAddToCart}>
            <strong>ADD TO CART</strong>
            <ArrowRightOutlined />
          </button>
          {/* <MyButton  onClick={handleAddToCart} style={{border:".1rem solid black"}} icon={<PlusSquare/>}>Thêm vào giỏ hàng </MyButton> */}
          <div>
            {" "}
            <a href="">
              <CarOutlined /> QUAY LẠI DỄ DÀNG
            </a>
          </div>
          <a href="">
            <RollbackOutlined /> Không đúng kích cỡ hoặc màu sắc? Vui lòng truy
            cập trang Trả lại hàng & Hoàn tiền của chúng tôi để biết chi tiết
          </a>
          <MyCollapse defaultOpen={true} id="ReviewPC" label="REVIEWS" Icon={ <Rate
                  style={{ color: "#D21312" }}
                  allowHalf
                  disabled
                  value={product?.sanPhamNavigation?.starReviewNavigation?.avr}
                />}>
                  {product?.sanPhamNavigation?.starReviewNavigation?.starReviewDetails?.map(review=>
                    {
                      return <Space style={{width:"100%"}} direction="vertical">
                      <Card bordered={false} role="article" extra={<Rate
                      style={{ color: "black" }}
                      allowHalf
                      disabled
                      value={review?.rating}
                    />} defaultOpen={true} title={`Ẩn danh`}>
                      {review?.comment||""}
                    </Card>
                    </Space>
                    })}
                </MyCollapse>
          {product?.sanPhamNavigation?.mota && (
            <MyCollapse defaultOpen={true} label="Mô tả">
              <div style={{ textAlign: "start" }}>
                {ReactHtmlParser(product?.sanPhamNavigation?.mota)}
              </div>
            </MyCollapse>
          )}
          {product?.sanPhamNavigation?.motaChiTiet && (
            <MyCollapse defaultOpen={true} label="Chi tiết">
              <div style={{ textAlign: "start" }}>
                {ReactHtmlParser(product?.sanPhamNavigation?.motaChiTiet)}
              </div>
              {/* {ReactHtmlParser(product?.motaChiTiet)} */}
            </MyCollapse>
          )}
        </Space>
      </Col>
    </Row>
  );
};
export default TrangChiTietSanPham;
