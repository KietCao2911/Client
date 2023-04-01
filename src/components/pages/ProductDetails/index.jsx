import React, { useState } from "react";
import "./ProductDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import "swiper/css/pagination";
import { Col, Row, Space, Rate, notification } from "antd";
import { FreeMode, Pagination } from "swiper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as SanPhamAPI from "~/redux/slices/SanPham/Users";
import { v4 as uuidv4 } from "uuid";
import convertVND from "~/components/utils/ConvertVND";
import SizeSelect from "./components/SizeCompoent";
import ColorComponent from "./components/ColorComponent";
import {
  ArrowRightOutlined,
  CarOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
import GioHangSlice, { AddToCart } from "~/redux/slices/GioHang/GioHangSlice";
import MyCollapse from "~/components/commomComponents/Collapse";
import ReactHtmlParser from "react-html-parser";
import CardProduct from "~/components/commomComponents/CardProduct";
import CustomSpin from "~/components/CustomSpin";
import { Plus, PlusSquare, Star } from "react-feather";
import { BASE_URL } from "~/const";
import MyButton from "~/components/commomComponents/Button";
import Breadcrumb from "~/components/commomComponents/Breadcrumb";
import ListProducts from "~/components/commomComponents/ListProducts";
import ShowMore from "~/components/commomComponents/ShowMore";
const TrangChiTietSanPham = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.SanPham);
  const { imgsDisplay, sizesDisplay } = product;
  const { Messages } = useSelector((state) => state.Message);
  const { slug } = useParams();
  const [imgs, setImgs] = useState(
    (product.hinhAnhs && product?.hinhAnhs[0]) || []
  );
  const [productsRecentlyView, setProductsRecentlyView] = useState(
    JSON.parse(window.localStorage.getItem("recentlyView")) || []
  );
  document.title = product?.tenSanPham;
  const handleAddToCart = async () => {
    if (product.productCurrent && product.productCurrent.maSanPham) {
      const productChild = product.productCurrent;
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
      CartItem.maChiNhanh = window.localStorage.getItem("location") || "";
      console.log({location: window.localStorage.getItem("location")})
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
        <Row>
          {/* Slide Images Products */}
          {/* <Col className="ProductDsc" md={0}>
            <Breadcrumb />
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {imgsDisplay &&
                imgsDisplay.map((img) => {
                  const url =
                    BASE_URL +
                    "wwwroot/res/SanPhamRes/Imgs/" +
                    product?.maSanPham?.trim() +
                    "/" +
                    img?.idMaMau?.trim() +
                    "/" +
                    img?.idHinhAnhNavigation?.fileName?.trim();
                  return (
                    <SwiperSlide key={uuidv4()}>
                      <img style={{ objectFit: "contain" }} src={url || ""} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
        </Col> */}
          <Col className="ProductInfo" md={24} xs={24}>
            <Col xs={0} md={24}>
              <Breadcrumb style={{ width: "100%" }} />
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
                <Breadcrumb />
                <Rate
                  character={<Star />}
                  style={{ color: "black" }}
                  allowHalf
                  disabled
                  value={5}
                />{" "}
              </Row>
              <h1 className="InfoTitle">
                {product?.tenSanPham || "GIÀY SUPERSTAR TAEGEUKDANG"}
              </h1>
              <p className="InfoPrice">
                {convertVND(
                  product?.productCurrent?.giaBanLe || product?.giaBanLe || 0
                )}
              </p>
              <p>
                Mã SKU:{" "}
                {product?.productCurrent?.maSanPham || product?.maSanPham}
              </p>
            </Col>
            <ShowMore>
              <Row>
                {imgsDisplay &&
                  imgsDisplay.map((img) => {
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
                    Sản phẩm bạn vừa xem
                  </h1>
                  <Swiper
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      // when window width is >= 480px
                      480: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                      },
                      // when window width is >= 640px
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                    }}
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                  >
                    {productsRecentlyView &&
                      productsRecentlyView.map((product) => (
                        <SwiperSlide key={uuidv4()}>
                          <CardProduct value={product} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
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
                  <SizeSelect items={product?.productInfoByColor || []} />
                ) : (
                  <strong
                    style={{ color: "	#df4759" }}
                  >{`Sản phẩm đã hết hàng :(`}</strong>
                )}
              </Space>
              <Space style={{ width: "100%" }} direction="vertical">
                <strong>Màu sắc</strong>
                <ColorComponent items={product?.colorGrouped}></ColorComponent>
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
              {product?.mota && (
                <MyCollapse defaultOpen={false} label="Mô tả">
                  <div style={{ textAlign: "start" }}>
                    {ReactHtmlParser(product?.mota)}
                  </div>
                </MyCollapse>
              )}
              {product?.motaChiTiet && (
                <MyCollapse defaultOpen={false} label="Chi tiết">
                  <div style={{ textAlign: "start" }}>
                    {ReactHtmlParser(product?.motaChiTiet)}
                  </div>
                  {/* {ReactHtmlParser(product?.motaChiTiet)} */}
                </MyCollapse>
              )}
            </Space>
          </Col>
        </Row>
      </Col>
      <Col md={8} xs={0}>
        {/* Product Checkout forPC*/}
        <Space className="ProductInfo" direction="vertical">
          <Space style={{ width: "100%" }} direction="vertical">
            <div className="InfoHeader">
              <div className="InforHeader_ClsName">
                {/* {product?.boSuuTap?.value || "Chưa thuộc bộ sưu tập nào"} */}
              </div>
              <div className="InforHeader_Star">
                {" "}
                <Rate
                  character={<Star />}
                  style={{ color: "black" }}
                  allowHalf
                  disabled
                  value={5}
                />{" "}
              </div>
            </div>
            <div>
              {" "}
              <h1 className="InfoTitle">
                {product?.tenSanPham || "GIÀY SUPERSTAR TAEGEUKDANG"}
              </h1>
              <p className="InfoPrice">
                {convertVND(
                  product?.productCurrent?.giaBanLe || product?.giaBanLe || 0
                )}
              </p>
              <p>
                Mã SKU:{" "}
                {product?.productCurrent?.maSanPham || product?.maSanPham}
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
            <ColorComponent items={product?.colorGrouped}></ColorComponent>
          </Space>

          <button className="AddToCart" onClick={handleAddToCart}>
            <strong>THÊM VÀO GIỎ HÀNG</strong>
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
          {product?.mota && (
            <MyCollapse defaultOpen={false} label="Mô tả">
              <div style={{ textAlign: "start" }}>
                {ReactHtmlParser(product?.mota)}
              </div>
            </MyCollapse>
          )}
          {product?.motaChiTiet && (
            <MyCollapse defaultOpen={false} label="Chi tiết">
              <div style={{ textAlign: "start" }}>
                {ReactHtmlParser(product?.motaChiTiet)}
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
