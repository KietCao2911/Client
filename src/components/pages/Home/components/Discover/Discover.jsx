import React from "react";
import CardCollection from "./Card";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode, Navigation } from "swiper";
import { v4 } from "uuid";

const Discover = () => {
  const {types} = useSelector((state)=>state.BoSuuTap)
  return <Row gutter={[20,20]}>
    <Col xxl={24} md={0} xs={0}>
      <Row gutter={[20,20]}>

    {
      types?.Products&&types?.Products.map(bst=>  <Col  key={v4()} xxl={6} md={12} xs={24}>
        <CardCollection {...bst}/>
    
        </Col>)
    }
    </Row>
    </Col>
    <Col xxl={0} md={24} xs={24}>
    <Swiper
              breakpoints={{
                // when window width is >= 640px

                // when window width is >= 768px
                0: {
                  slidesPerView: 1,
                },
                499: {
                  width: 499,
                  slidesPerView: 2,
                },
                768: {
                  width: 768,
                  slidesPerView: 2,
                },
                1600: {
                  width: 1600,
                  slidesPerView: 4,
                },
              }}
              style={{ padding: "1rem" }}
              pagination={{
                clickable: true,
                bulletClass: "my-custom-pagination-item",
              }}
              spaceBetween={30}
              modules={[Pagination, FreeMode, Navigation]}
              className="mySwiper"
            >
              {
      types.Products&&types.Products.map(bst=>  <SwiperSlide key={v4()} >
        <CardCollection {...bst}/>
    
        </SwiperSlide>)
    }
            </Swiper>
    </Col>
  
  </Row>;
};

export default Discover;
