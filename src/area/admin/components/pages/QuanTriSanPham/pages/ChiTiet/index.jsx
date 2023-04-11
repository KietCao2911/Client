import { LeftOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import { lazy } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import CustomSpin from "~/components/CustomSpin";
import * as SanPhamAPI from "~/redux/slices/SanPham";

const WithChild = lazy(() => import("./components/WithChild"));

const ChiTiet = () => {
  const { product } = useSelector((state) => state.SanPham);
  const { items } = useSelector((state) => state.DanhMuc);
  const dispatch = useDispatch();

  const params = useParams();
  console.log({ items });
  useEffect(() => {
    dispatch(SanPhamAPI.fetchGetProduct({ maSanPham: params.maSP }));
  }, [params.maSP]);
  return (
    <>{Object.keys(product).length > 0 ? <WithChild /> : <CustomSpin />}</>
  );
};

export default ChiTiet;
