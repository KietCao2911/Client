import { Col, Row } from "antd";
import React, { memo } from "react";
import "./SizeSelect.scss";
import { v4 as uuidv4 } from "uuid";
import KichCoSlice, {
  checkedSize,
  fetchALLSize,
  fillSizes,
} from "~/redux/slices/KichCoSlice";
import SanPhamSlice, { sizeSelected } from "~/redux/slices/SanPham";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchGetQTY } from "~/redux/slices/ChiTietSoLuong/CtslAPI";
const SizeRadio = ({ label, value, onChange, obj, disable }) => {
  const { product } = useSelector((state) => state.SanPham);
  const [disabled, setDisabled] = useState(() => {
    const state =
      obj && obj.length > 0 && obj[0].soLuongCoTheban > 0 ? false : true;

    return state;
  });
  const { QtyRemain } = product;
  const dispatch = useDispatch();
  const handleSelected = async () => {
    dispatch(sizeSelected({ size: value }));
  };
  return (
    <>
      <div className={`SizeRadio ${disabled ? "disable" : ""}`}>
        {disabled && <span className="disableMess">Tạm hết hàng</span>}
        <input
          disabled={disabled}
          id={value}
          type={"radio"}
          name={"checkboxGroup"}
          value={value}
          onChange={() => handleSelected()}
          className={`${
            product?.productCurrent?.idSize?.trim() == value.trim()
              ? "checked"
              : ""
          }`}
        />
        <label htmlFor={value}>{label || 35}</label>
      </div>
    </>
  );
};
const SizeSelect = ({ items, setSize }) => {
  const { product } = useSelector((state) => state.SanPham);
  const { QtyRemain } = product;
  const sort = () => {
    let temp = [...items];
    temp.sort((a, b) => {
      const numA = parseInt(a.idSize);
      const numB = parseInt(b.idSize);
      if (numA < numB) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log({ temp });
    return temp;
  };
  useEffect(() => {});
  return (
    <Row>
      {sort()?.map((item) => {
        return (
          <Col key={uuidv4()} span={6}>
            {" "}
            <SizeRadio
              key={uuidv4()}
              obj={item?.khoHangs}
              label={item?.idSize}
              value={item?.idSize}
            />
          </Col>
        );
      })}
      {QtyRemain < 10 && QtyRemain > 0 ? (
        <small style={{ color: "red" }}>
          <b>Chỉ còn {QtyRemain} trong kho.</b>
        </small>
      ) : QtyRemain <= 0 ? (
        <small style={{ color: "red" }}>
          <b>Sản phẩm vừa hết hàng.</b>
        </small>
      ) : null}
    </Row>
  );
};

export default memo(SizeSelect);
