import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import CardProduct from "~/components/commomComponents/CardProduct";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { v4 } from 'uuid';
import { useDispatch,useSelector } from "react-redux";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import { useEffect } from "react";
const HotProducts = () => {
    const {productsHot} = useSelector(state=>state.SanPham)

  return (
    <>
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
            slidesPerView: 4,
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
      {productsHot?.map((item) => {
          return (
            <SwiperSlide key={v4()}>
              <CardProduct value={item}></CardProduct>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  )
}

export default HotProducts