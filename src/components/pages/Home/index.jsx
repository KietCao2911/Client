import React, { useEffect } from "react";
import BSTSlider from "./components/BSTSlider";
import NewRelease from "./components/NewReleaseSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, Col, Row, Space, Statistic, Tabs } from "antd";
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

const Home = () => {
  document.title = "Trang chính";
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  const { boSuuTaps } = useSelector((state) => state.BoSuuTap);
  const { productsLatest, loading } = useSelector((state) => state.SanPham);
  const { productsHot, products } = useSelector((state) => state.SanPham);
  const { brands } = useSelector((state) => state.Brand);
  const profile = user?.info?.find((x) => user.addressDefault == x.id) || null;
  console.log("HOME ");
  useEffect(() => {
    dispatch(SanPhamUserAPI.fetchGetAllProductsUser({ sort: "popular" }));
    dispatch(SanPhamUserAPI.fetchGetAllProductsUser({ sort: "date-newest" }));
    dispatch(Api.fetchAllBST({}));
    dispatch(BrandAPI.fetchGetBrand());
  }, []);

  return (
    <div className="HomeDefaultLayout">
      <BSTSlider />
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        className="PageContainer"
      >
        <Card title="Nhãn hàng" bordered={false}>
          <Row gutter={[20, 20]}>
            {brands &&
              brands.map((brand) => (
                <Col key={v4()} xs={24} md={8}>
                  <BrandConponent url={brand?.logoLink || ""} value={brand} />
                </Col>
              ))}
          </Row>
        </Card>
        <Card title="Vừa cập nhật" bordered={false}>
          <ListProducts
            type={"slider"}
            items={products || []}
            loading={loading}
            miniProducts={true}
          />
        </Card>

        <Card title="Sản phẩm nổi bật" bordered={false}>
          <ListProducts
            type={"slider"}
            items={productsHot.products || []}
            loading={loading}
            miniProducts={true}
          />
        </Card>
      </Space>
    </div>
  );
};

export default Home;
