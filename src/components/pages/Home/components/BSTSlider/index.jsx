import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Image from "rc-image";
import * as Api from "~/redux/slices/BoSuuTap";
import "swiper/css/pagination";
import { useEffect } from "react";
import { BASE_URL } from "~/const";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";
import { v4 } from "uuid";
import "./BSTSlider.scss";
import { ArrowDownRight, ArrowRight } from "react-feather";
const BSTSlider = () => {
  const { boSuuTaps } = useSelector((state) => state.BoSuuTap);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="BSTSlider">
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {boSuuTaps.map((item) => {
          return (
            <div className="ImgContainer" key={v4()}>
              <SwiperSlide key={v4()}>
                <div direction="vertical" className="content">
                  <div className="name"> {item?.tenBoSuuTap || ""} </div>

                  <Link
                    to={"/collection/" + item.slug.trim()}
                    className="button"
                  >
                    KHÁM PHÁ NGAY
                    <div className="icon">
                      <ArrowRight />
                    </div>
                  </Link>
                </div>
                <Link to={"/collection/" + item.slug.trim()}>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={`${BASE_URL}wwwroot/res/BstImgs/${item?.img}`}
                  />
                </Link>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BSTSlider;
