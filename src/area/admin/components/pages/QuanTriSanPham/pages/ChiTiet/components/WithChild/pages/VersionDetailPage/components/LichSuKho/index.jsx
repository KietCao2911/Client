import { Table } from "antd";
import moment from "moment";
import React, { memo, useCallback, useMemo, useState } from "react";
const columns = [
  {
    title: "Ngày ghi nhận",
    render: (_, record) => {
      return <p>{moment(record?.createdAT).format("DD-MM-YYYY hh:mm")}</p>;
    },
  },
  {
    title: "Thao tác",
    render: (_, record) => {
      return <p>{record?.tenPhieu}</p>;
    },
  },
  {
    title: "Só lượng thay đổi",
    render: (_, record) => {
      return (
        <p>
          {record?.phieuNhapXuatNavigation?.loaiPhieu?.trim() == "PHIEUNHAP"
            ? `+${record?.soLuong}`
            : `-${record?.soLuong}`}
        </p>
      );
    },
  },
  {
    title: "Chi nhánh",
    render: (_, record) => {
      return <p>{record?.phieuNhapXuatNavigation?.khoHangNavigation?.tenChiNhanh}</p>;
    },
  },
];
const LichSuKho = (props) => {
  const { khohangs } = props;
 
  return (
    <Table
      columns={columns}
      dataSource={
       khohangs|| []
      }
    ></Table>
  );
};

export default LichSuKho;
