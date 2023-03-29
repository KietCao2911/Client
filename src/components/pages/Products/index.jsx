import React from "react";
import { Table, Button, Row, Col, Empty, Pagination, Space } from "antd";
import "./TrangSanPham.scss";
import Filter from "./components/FilterComponent";
import CardProduct from "~/components/commomComponents/CardProduct";
import * as Api from "~/redux/slices/SanPham/Users/index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CustomSpin from "~/components/CustomSpin";
import Skeletons from "~/components/commomComponents/Skeleton";
import ListProducts from "~/components/commomComponents/ListProducts";
import CustomPagination from "~/components/commomComponents/Pagination";
import Breadcrumb from "~/components/commomComponents/Breadcrumb";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    responsive: ["lg"],
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    responsive: ["lg"],
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["lg", "xs"],
  },
];

const TrangSanPham = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category, slug, brand } = useParams();
  const { products, loading, totalRow } = useSelector((state) => state.SanPham);
  const { tableLoading } = loading;
  const params = {};
  for (let [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  const handleFetchProducts = (params) => {
    dispatch(
      Api.fetchGetAllProductsUser({
        params: { ...params, category, brand },
      })
    );
  };
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Filter fetchFnc={handleFetchProducts} />
      <Space style={{ width: "100%" }} className="Filter" direction="vertical">
        <Space style={{ width: "100%" }} direction="vertical">
          <ListProducts loading={loading} items={products || []}></ListProducts>
          {!loading && (
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
              align="center"
            >
              {" "}
              <Pagination
                responsive={true}
                onChange={(e) => setSearchParams({ ...params, page: e })}
                // pageSize={10}
                total={totalRow || 0}
                current={parseInt(params?.page || 1)}
              />
            </div>
          )}
        </Space>
      </Space>
      <div></div>
    </Space>
  );
};

export default TrangSanPham;
