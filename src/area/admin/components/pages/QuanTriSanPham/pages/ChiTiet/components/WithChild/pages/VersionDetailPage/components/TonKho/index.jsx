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
    title: "Só lượng tồn",
    dataIndex: "soLuongTon",
  },
  {
    title: "Só lượng có thể bán",
    dataIndex: "soLuongCoTheban",
  },
  {
    title: "Só lượng hàng đang về",
    dataIndex: "soLuongHangDangVe",
  },
  {
    title: "Só lượng hàng đang giao",
    dataIndex: "soLuongHangDangGiao",
  },
];

const TonKho = (props) => {
  const { khohangs } = props;
  console.log({ khohangs });
  return <Table columns={columns} dataSource={khohangs}></Table>;
};

export default TonKho;
