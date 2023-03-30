import React from "react";
import "./ColorChecked.scss";
import { Col, Row } from "antd";
import { v4 as uuidv4, v4 } from "uuid";
import { getImgs } from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "~/const";
const Item = ({ value, checked = false, onChange }) => {
  const { product } = useSelector((state) => state.SanPham);
  const { colorSelected, productInfoByColor } = product;
  const url =
    BASE_URL +
      "wwwroot/res/SanPhamRes/Imgs/" +
      product?.maSanPham?.trim() +
      "/" +
      value?.chiTietHinhAnhs[0]?.idMaMau?.trim() +
      "/" +
      value?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() || "";
  const dispatch = useDispatch();
  return (
    <>
      <div className="ColorChecked">
        <div
          htmlFor={value?.idColor}
          style={{
            border: `.2rem solid ${
              productInfoByColor[0] &&
              productInfoByColor[0]?.idColor?.trim() == value?.idColor?.trim()
                ? "black"
                : null
            }`,
          }}
          onClick={() => dispatch(getImgs({ colorID: value?.idColor }))}
        >
          <img
            src={
              url ||
              "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/335874970_1529805160878601_7721730018241347703_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=e5LzEdXpNSMAX_1fXBi&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfBaGXRlUn1kPuYgAduXhEghTH9FiMTsZdznUwgWN2JzXg&oe=6416164A"
            }
          />
        </div>
      </div>
    </>
  );
};
const ColorComponent = ({ items }) => {
  return (
    <>
      <Row gutter={[10, 10]}>
        {items &&
          items?.map((item) => {
            return (
              <Col key={v4()} span={3}>
                {" "}
                <Item value={item[0]} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};
export default ColorComponent;
