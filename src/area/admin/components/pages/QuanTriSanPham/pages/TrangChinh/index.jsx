import { Link } from "react-router-dom";
import React from "react";
import { Col, Input, Row, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as SanPhamAPI from "~/redux/slices/SanPham";
import { useEffect } from "react";
import MyButton from "~/components/commomComponents/Button";
import { FileAddFilled } from "@ant-design/icons";
import { v4 } from "uuid";
import { useMemo } from "react";
import convertVND from "~/components/utils/ConvertVND";
import moment from "moment";
import { useState } from "react";
import InputText from "~/components/commomComponents/InputText";
import "./TrangChinh.scss";
const expandedRowRender = (props) => {
  const { data } = props;
  console.log({ data });
  const columns = [
    {
      title: "Tên sản phẩm",
      key: "tenSanPham",
      render: (_, record) => {
        return <p>{record.tenSanPham}</p>;
      },
    },
    {
      title: "Có thể bán",
      key: "soLuongCoTheban",
      dataIndex: "soLuongCoTheban",
    },
    {
      title: "Giá bán lẻ",
      key: "giaBanLe",
      render: (_, record) => {
        return <p>{convertVND(record.giaBanLe) || 0}</p>;
      },
    },
    {
      title: "Giá bán sỉ",
      key: "giaBanSi",
      render: (_, record) => {
        return <p>{convertVND(record.giaBanSi) || 0}</p>;
      },
    },
  ];
  return (
    <Table
      pagination={{ hideOnSinglePage: true }}
      columns={columns}
      dataSource={data}
    ></Table>
  );
};
const columns = (props) => {
  const { product } = props;
  return [
    {
      title: "Mã sản phẩm",
      key: "maSanPham",
      dataIndex: "maSanPham",
    },
    {
      title: "Tên sản phẩm",
      key: "tenSanPham",
      render: (_, record) => {
        return (
          <Link to={record.maSanPham.trim() + "/versions/"}>
            {record.tenSanPham}
          </Link>
        );
      },
    },
    {
      title: "Nhãn hiệu",
      render: (_, record) => {
        return <p>{record?.nhanHieu?.name || ""}</p>;
      },
    },
    {
      title: "Loại hàng",
      render: (_, record) => {
        return <p>{record?.loaiHang?.name || ""}</p>;
      },
    },
    {
      title: "Ngày tạo",
      key: "createdAT",
      render: (_, record) => {
        return <p>{moment(record.createdAT).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Tồn kho",
      key: "soLuongTon",
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <p>
              {record?.sanPhams?.reduce((x, y) => {
                return x + y.soLuongTon;
              }, 0)}{" "}
            </p>
            <p>(Có {record?.sanPhams?.length || 0} phiên bản)</p>
          </div>
        );
      },
    },
    {
      title: "Có thể bán",
      key: "coTheBan",
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <p>
              {record?.sanPhams?.reduce((x, y) => {
                return x + y.soLuongCoTheban;
              }, 0)}{" "}
            </p>
            <p>(Có {record?.sanPhams?.length || 0} phiên bản)</p>
          </div>
        );
      },
    },
  ];
};
const TrangChinh = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.SanPham);
  console.log({ products });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState();
  const onSelectChange = (key) => {
    console.log({ key });
    setSelectedRowKeys(key);
    // setSelectedRowKeys([...selectedRowKeys,...key])
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => onSelectChange(e),
  };
  useEffect(() => {
    dispatch(SanPhamAPI.fetchGetAllProducts({}));
  }, []);
  const ChangeData1 = useMemo(() => {
    let temp = products.map((item) => {
      return {
        ...item,
        key: item.maSanPham,
      };
    });
    setData([...temp]);
  }, [products]);
  return (
    <div className="TrangChinhQLSP">
      <div className="filesActions">
        <div className="printDocs"></div>
        <div className="create">
          <Link to="tao-moi">
            <MyButton style={{ width: "30rem" }} icon={<FileAddFilled />}>
              Tạo sản phẩm mới
            </MyButton>
          </Link>
        </div>
      </div>
      <div className="productsTable">
        <div className="filterActions">
          <Row gutter={20} align={"middle"}>
            <Col xl={12}>
              <InputText placeHolder="Tìm kiếm sản phẩm" type="search" />
            </Col>
            <Col xl={12}>
              <Select defaultValue={null}>
                <Select.Option value={null}>Loại sản phẩm</Select.Option>
              </Select>
              <Select defaultValue={null}>
                <Select.Option value={null}>Thương hiệu</Select.Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div className="table">
          {selectedRowKeys.length > 0 && (
            <div>
              <Select defaultValue={null}>
                <Select.Option value={null}>Chọn hành động</Select.Option>
                <Select.Option value={1}>Xóa trường được chọn</Select.Option>
                <Select.Option value={2}>In mã vạch</Select.Option>
              </Select>
            </div>
          )}
          <Table
            loading={loading}
            rowSelection={rowSelection}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) =>
                expandedRowRender({ data: record.sanPhams }),
            }}
            columns={columns({ product: data })}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default TrangChinh;
