import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import * as request from "~/axiosRequest/request";
import { useEffect, useState } from "react";
import CardProduct from "~/components/commomComponents/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham";
import { Col, Row, Skeleton } from "antd";
import { v4 } from "uuid";
const NewRelease = () => {
  const dispatch = useDispatch();
  const { productsLatest } = useSelector((state) => state.SanPham);
  return (
    <div>
      <Col md={24} xs={0}>
        <Row gutter={[20, 20]}>
          {productsLatest.length > 0 ? (
            productsLatest?.map((item) => {
              return (
                <Col md={6}>
                  <CardProduct value={item}></CardProduct>
                </Col>
                //  <Col xl={8}>
                //   <CardProduct value={item}></CardProduct>
                //  </Col>
              );
            })
          ) : (
            <Skeleton active={true}></Skeleton>
          )}
        </Row>
      </Col>
      <Col md={0} xs={24}>
        <Swiper
          breakpoints={{
            // when window width is >= 640px

            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1600: {
              width: 1600,
              slidesPerView: 3,
            },
          }}
          style={{ padding: "1rem" }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          modules={[Pagination]}
          className="mySwiper"
        >
          {productsLatest.length > 0 ? (
            productsLatest?.map((item) => {
              return (
                <SwiperSlide key={v4()}>
                  <CardProduct value={item}></CardProduct>
                </SwiperSlide>
                //  <Col xl={8}>
                //   <CardProduct value={item}></CardProduct>
                //  </Col>
              );
            })
          ) : (
            <Skeleton active={true}></Skeleton>
          )}
        </Swiper>
      </Col>
    </div>
  );
};

export default NewRelease;
