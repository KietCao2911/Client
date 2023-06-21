import React, { useEffect } from "react";
import BSTSlider from "./components/BSTSlider";
import NewRelease from "./components/NewReleaseSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { BackTop, Card, Col, FloatButton, Modal, Row, Space, Statistic, Tabs } from "antd";
import HotProducts from "./components/HotProducts";
import "./Home.scss";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import * as SanPhamUserAPI from "~/redux/slices/SanPham/Users/index";
import { useDispatch, useSelector } from "react-redux";
import CategoryHome from "./components/Category";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import * as Api from "~/redux/slices/BoSuuTap";
import BrandConponent from "./components/Brands";
import Skeletons from "~/components/commomComponents/Skeleton";
import * as BrandAPI from "~/redux/slices/Brand/BrandSlice";
import ListProducts from "~/components/commomComponents/ListProducts";
import { v4 } from "uuid";
import CategoryTag from "./components/CategoryTag";
import Discover from "./components/Discover/Discover";
import TrendingProducts from "./components/TrendingProducts";
import { Pagination, FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowUp, ArrowUpCircle, SkipBack } from "react-feather";
const Home = () => {
  document.title = "Trang chính";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  const { boSuuTaps } = useSelector((state) => state.BoSuuTap);
  const { productsLatest, loading } = useSelector((state) => state.SanPham);
  const { productsHot, products } = useSelector((state) => state.SanPham);
  const { brands } = useSelector((state) => state.Brand);
  const profile = user?.info?.find((x) => user.addressDefault == x.id) || null;
  useEffect(() => {
    dispatch(
      SanPhamUserAPI.fetchGetAllProductsUser({ params: { sort: "popular" } })
    );
    dispatch(
      SanPhamUserAPI.fetchGetAllProductsUser({
        params: { sort: "date-newest" },
      })
    );
    dispatch(Api.fetchAllBSTUSER({type:"Banner"}));
    dispatch(Api.fetchAllBSTUSER({type:"Products"}));
    dispatch(BrandAPI.fetchGetBrand());
  }, []);

  return (
    <div className="HomeDefaultLayout">
      <FloatButton.BackTop icon={<ArrowUp/>}  />
      <BSTSlider />
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        className="PageContainer"
      >
        <Card role="article" title="NHÃN HÀNG" bordered={false}>
          <Row gutter={[20, 20]}>
          <Col md={24} xs={0}>
         <Row gutter={[10, 10]}>
         {brands &&
              brands.map((brand) => (
                <Col key={v4()} md={8}>
                  <BrandConponent url={brand?.logoLink || ""} value={brand} />
                </Col>
              ))}
         </Row>
          </Col>
          <Col xs={24} md={0}>
          
          <Swiper
              breakpoints={{
                // when window width is >= 640px

                // when window width is >= 768px
                0: {
                  slidesPerView: 1,
                },
                499: {
                  width: 499,
                  slidesPerView: 1,
                },
                768: {
                  width: 768,
                  slidesPerView: 1,
                },
                1600: {
                  // width: 1600,
                  slidesPerView: 6,
                },
              }}
              style={{ padding: "1rem" }}
              pagination={{
                clickable: true,
                bulletClass: "my-custom-pagination-item",
              }}
              spaceBetween={10}
              modules={[Pagination, FreeMode, Navigation]}
              className="mySwiper"
            >
               {brands &&
              brands.map((brand) => (
                <SwiperSlide key={v4()}>
                   <Col key={v4()} span={24}>
                  <BrandConponent url={brand?.logoLink || ""} value={brand} />
                </Col>
                  </SwiperSlide>
              ))}
            </Swiper>
          </Col>
          </Row>
        </Card>
        <Card title="MỚI NHẤT" role="article" bordered={false}>
          <ListProducts
                    // type={"slider"}

            items={productsLatest || []}
            loading={loading}
            miniProducts={true}
          />
        </Card>
        <Card title="MUA NHIỀU NHẤT" bordered={false}>
          <ListProducts
          // type={"slider"}
            items={productsHot || []}
            loading={loading}
            miniProducts={true}
          />
        </Card>
        <Card role="article" title="SẢN PHẨM ĐƯỢC XEM NHIỀU">
          <TrendingProducts />
        </Card>
     {
      boSuuTaps&&boSuuTaps.length>0&&   <Card title="KHÁM PHÁ THÊM">
      <Discover />
    </Card>
     }
        <Card role="article" title="DANH MỤC PHỔ BIẾN">
          <CategoryTag />
        </Card>
      </Space>
      {/* <Modal  open={true}>
        <img src="https://localhost:44328/wwwroot/res/BstImgs/WinterCollection.png" alt="" />
      </Modal> */}
    </div>
  );
};

export default Home;
