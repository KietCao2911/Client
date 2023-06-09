import React, { memo, useMemo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation } from "swiper";
import * as request from "~/axiosRequest/request";
import { useEffect, useState } from "react";
import CardProduct from "~/components/commomComponents/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
import { Col, Empty, Row, Skeleton } from "antd";
import { v4 } from "uuid";
import Skeletons from "../Skeleton";
import "swiper/css";
import "swiper/css/navigation";

const ListProducts = ({ items, loading, type, itemResponsive }) => {
  const [products, setProducts] = useState(items || []);
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState([]);
  const reRenderProducts = useMemo(() => {
    setProducts(items);
  }, [items]);

  return (
    <Row style={{ width: "100%" }}>
      {loading ? (
        <Col span={24}>
          <Skeletons itemsSize={10} />
        </Col>
      ) : (
        <>
          <Col span={type == "slider" ? 0 : 24}>
            <Row gutter={[10, 10]}>
              {products.length > 0 ? (
                products?.map((item, index) => {
                  return (
                    <Col xs={12} xl={8} xxl={8} key={v4()}>
                      <CardProduct
                        value={item?.sanPhamNavigation||item||{}}
                      ></CardProduct>
                    </Col>
                  );
                })
              ) : (
                <div
                  className="Empty"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Empty
                    description="Hiện chưa có sản phẩm nào"
                  />
                </div>
              )}
            </Row>
          </Col>
          <Col span={type == "slider" ? 24 : 0}>
            <Swiper
              breakpoints={{
                // when window width is >= 640px

                // when window width is >= 768px
                0: {
                  slidesPerView: 1,
                },
                375: {
                  // width: 375,
                  slidesPerView: 2,
                },
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
                1600: {
                  // width: 1600,
                  slidesPerView: 2,
                },
              }}
               navigation={true}
              style={{ padding: "1rem" }}
              // pagination={{
              //   clickable: true,
              //   bulletClass: "my-custom-pagination-item",
              // }}
              spaceBetween={10}
              modules={[ Navigation]}
              className="mySwiper"
            >
              {products.length > 0 ? (
                products?.map((item, index) => {
                  return (
                    <SwiperSlide key={v4()}>
                      <CardProduct
                        type={type}
                        value={item?.sanPhamNavigation||item||{}}
                      ></CardProduct>
                    </SwiperSlide>
                    //  <Col xl={8}>
                    //   <CardProduct value={item}></CardProduct>
                    //  </Col>
                  );
                })
              ) : (
                <div
                  className="Empty"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Empty description="Hiện chưa có sản phẩm nào" />
                </div>
              )}
            </Swiper>
          </Col>
        </>
      )}
    </Row>
  );
};

export default memo(ListProducts);
