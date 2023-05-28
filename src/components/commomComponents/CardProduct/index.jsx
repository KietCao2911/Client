import React, { forwardRef, memo } from "react";
import { Card, Col, Rate, Space } from "antd";
import "./CardProduct.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import convertVND from "~/components/utils/ConvertVND";
import { v4 } from "uuid";
import { BASE_URL } from "~/const";
import { Switch, Typography } from "antd";
import { InView } from "react-intersection-observer";
import { Star } from "react-feather";
const { Paragraph, Text } = Typography;
const ImgVersion = (props) => {
  const { src, key } = props;
  return (
    <div className="item" {...props}>
      <img src={src} alt="" />
    </div>
  );
};
const CardProduct = (props, ref) => {
  const { value, key,type } = props;
  const [img, setImg] = useState(() => {
    let pic = "";
    if (value && value?.colorGrouped?.length > 0) {
      const img = value.colorGrouped[0][0] || [];
      const url =
        BASE_URL +
        "wwwroot/res/SanPhamRes/Imgs/" +
        value?.maSanPham?.trim() +
        "/" +
        img?.chiTietHinhAnhs[0]?.idMaMau?.trim() +
        "/" +
        img?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim();
      return url || "";
    }
  });
  const [price, setPrice] = useState(() => {
    let products =
      value?.sanPhams && value?.sanPhams?.length > 0 ? [...value.sanPhams] : [];
    let Prices = products.sort((a, b) => a.giaBanLe - b.giaBanLe);
    let giaBanDisplay = "";
    if (Prices[0]?.giaBanLe != Prices[Prices?.length - 1]?.giaBanLe) {
      giaBanDisplay = `${convertVND(Prices[0].giaBanLe)} - ${convertVND(
        Prices[Prices.length - 1].giaBanLe
      )}`;
    } else {
      giaBanDisplay = convertVND(Prices[0]?.giaBanLe);
    }
    return giaBanDisplay || "";
  });
  const handleChangeImg = (src) => {
    setImg(src);
  };

  return (
    <InView key={v4()}>
      {({ inView, ref, entry }) => (
        <div className={`Card ${inView ? "active" : ""}`} {...props} ref={ref}>

          {
            props?.ribbonTooltip||value?.isSale?  <div className="CardRibbon">
            <span>{props?.ribbonTooltip||(
             `- ${ (100-((((value?.giaBanLe+value?.tienDaGiam)-(value?.tienDaGiam))/(value?.giaBanLe+value?.tienDaGiam))*100))||0}%`
            )}</span>
          </div>:null
          }
         
          <Link
            draggable={false}
            to={`/${value?.slug?.trim()}`}
            className="CardContent"
          >
           
            <div className="ImgBox">
              <img
                draggable={false}
                className={`${type=="slider"?"slider":""}`}
                src={
                  inView
                    ? img ||
                      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Giay_Superstar_trang_EG4958_01_standard.jpg"
                    : null
                }
                alt=""
              />

              <div className="versions">
                {value?.colorGrouped &&
                  value?.colorGrouped.length > 1 &&
                  value?.colorGrouped?.map((img) => {
                    if (value && value?.colorGrouped?.length > 0) {
                      const url =
                        BASE_URL +
                        "wwwroot/res/SanPhamRes/Imgs/" +
                        value?.maSanPham?.trim() +
                        "/" +
                        img[0]?.idColor?.trim() +
                        "/" +
                        img[0]?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim();
                      return (
                        <div key={v4()}>
                          <ImgVersion
                            onMouseEnter={() => handleChangeImg(url)}
                            src={url}
                            onMouseLeave={() => setImg(url)}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <Space direction="vertical" className="ContentBox">
              <div className="name">
                
                  {value?.tenSanPham}
              </div>
              {
                value?.colorGrouped.length>1?
                  <small>{` ${value?.colorGrouped?.length} colours`}</small>
               :<small>1 color</small>
              }
                  
              {
                !value?.isSale?<div className={`priceDetails`}>{price || " 400.000₫"}</div>:<div>
                  <div className="priceDetails sale"> 
                  <div>
                  <del>{convertVND(value?.tienDaGiam+value?.giaBanLe)}</del>
                    </div>
                 <div>
                 {convertVND(value?.giaBanLe)}
                 </div>
                  </div>
                </div>
              }
              <div className="category">
                {" "}
                <small>{value?.nhanHieu?.name}</small>{" "}
              </div>
            </Space>
          </Link>
        </div>
      )}
    </InView>
  );
};

export default memo(CardProduct);
