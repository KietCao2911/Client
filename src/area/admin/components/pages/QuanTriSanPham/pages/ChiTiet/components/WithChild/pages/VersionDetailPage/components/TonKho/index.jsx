import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "Tên chi nhánh",
    render: (_, record) => {
      return <p>{record?.branchNavigation?.tenChiNhanh}</p>;
    },
  },
  {
    title: "Số lượng tồn",
    dataIndex: "soLuongTon",
  },
  {
    title: "Số lượng có thể bán",
    dataIndex: "soLuongCoTheban",
  },
  {
    title: "Số lượng hàng đang về",
    dataIndex: "soLuongHangDangVe",
  },
  {
    title: "Số lượng hàng đang giao",
    dataIndex: "soLuongHangDangGiao",
  },
];

const TonKho = (props) => {
  const { khohangs } = props;
  return <Table scroll={{ x: 400 }} columns={columns} dataSource={khohangs}></Table>;
};

export default TonKho;
