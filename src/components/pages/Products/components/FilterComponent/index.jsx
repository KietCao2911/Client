import React, { useCallback, useState } from "react";
import "./Filter.scss";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Collapse, Drawer, Menu, Row, Space } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import SizeOptions from "./components/sizeOptions";
import ColorOptions from "./components/colorsOptions";
import * as request from "~/axiosRequest/request";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Api from "~/redux/slices/SanPham/Users/index";
import MyButton from "~/components/commomComponents/Button";
import MyCollapse from "~/components/commomComponents/Collapse";
import CustomDrawer from "~/components/commomComponents/CustomDrawer";
import { Filter as MyFilter } from "react-feather";
import Breadcrumb from "~/components/commomComponents/Breadcrumb";
import { useQueryString } from "~/hooks/useQueryParams";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to={"?sort=price-low-to-hight"}>
      {" "}
      <b>Giá thấp đến giá cao</b>{" "}
    </Link>,
    uuidv4()
  ),
  getItem(
    <Link to={"?sort=price-hight-to-low"}>
      {" "}
      <b>Giá cao đến giá thấp</b>{" "}
    </Link>,
    uuidv4()
  ),
  getItem(
    <Link to={"?sort=date-newest"}>
      {" "}
      <b>Mới nhất</b>{" "}
    </Link>,
    uuidv4()
  ),
  getItem(
    <Link to={"?sort=date-oldest"}>
      {" "}
      <b>Cũ nhất</b>{" "}
    </Link>,
    uuidv4()
  ),
  getItem(
    <Link to={"?sale=true"}>
      {" "}
      <b>Đang giảm giá</b>{" "}
    </Link>,
    uuidv4()
  ),
];
const Filter = (props) => {
  const {sort} = useQueryString();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug, category } = useParams();
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.SanPham);
  const { fetchFnc } = props;

  useEffect(() => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    fetchFnc(params);
  }, [searchParams, slug, category]);
  const handleClickSort = (e) => {
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    params.sort = e;
    setSearchParams({ ...params });
  };
  return (
    <div className="Filter">
      <div className="header" justify={"space-between"}>
        <Breadcrumb style={{ position: "relative" }}></Breadcrumb>
        <MyFilter
          style={{ cursor: "pointer" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        />
      </div>
      <CustomDrawer
        placement="left"
        open={openDrawer}
        setOpen={setOpenDrawer}
        onClose={() => setOpenDrawer(false)}
      >
       <Space style={{width:"100%"}} direction="vertical">
       <h3>LỌC VÀ SẮP XẾP</h3>
        <MyCollapse label="Sắp xếp" defaultOpen={true}>
          <Space direction="vertical">
            <h4
            className={`${sort&&sort=="price-hight-to-low"?"active":""}`}
                         key={uuidv4()}
              onClick={() => handleClickSort("price-hight-to-low")}
            >
              {" "}
              Giá cao đến giá thấp
            </h4>
            <h4
            className={`${sort&&sort=="price-low-to-hight"?"active":""}`}

              key={uuidv4()}
              onClick={() => handleClickSort("price-low-to-hight")}
            >
              {" "}
              Giá thấp đến giá cao
            </h4>
            <h4
                        className={`${sort&&sort=="date-oldest"?"active":""}`}

            key={uuidv4()} onClick={() => handleClickSort("date-oldest")}>
              {" "}
              Cũ nhất
            </h4>
            <h4
                                    className={`${sort&&sort=="date-newest"?"active":""}`}
            key={uuidv4()} onClick={() => handleClickSort("date-newest")}>
              {" "}
              Mới nhất
            </h4>
            <h4 
                                                className={`${sort&&sort=="popular"?"active":""}`}
            key={uuidv4()} onClick={() => handleClickSort("popular")}>
              {" "}
              Bán chạy nhất
            </h4>
          </Space>
        </MyCollapse>
        <ColorOptions />
        <SizeOptions />

        </Space>
              </CustomDrawer>
    </div>
  );
};

export default Filter;
