import { Button, FloatButton, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as PhieuNhapAPI from "~/redux/slices/PhieuNhap/PhieuNhap";
import convertVND from "~/components/utils/ConvertVND";
import MyButton from "~/components/commomComponents/Button";
import { FilePlus } from "react-feather";
import StickyActions from "~/components/commomComponents/stickyActions";
const columns = [
  {
    title: "Mã phiếu nhập",
    render: (_, record) => {
      return <p>#{record.id}</p>;
    },
  },
  {
    title: "Thành tiền",
    render: (_, record) => {
      return <p>{convertVND(record.thanhTien || 0)}</p>;
    },
  },
  {
    title: "Thanh toán",
    render: (_, record) => {
      return <p>{record.daThanhToan ? "Đã thanh toán" : "Chưa thanh toán"}</p>;
    },
  },
  {
    title: "Số lượng nhập",
    render: (_, record) => {
      return <p>{record.tongSoLuong || 0}</p>;
    },
  },
  {
    title: "Nhập kho",
    render: (_, record) => {
      console.log({ record });
      return <p>{record.daNhapHang ? "Đã Nhập kho" : "Chưa nhập kho"}</p>;
    },
  },
  {
    title: "Tiến trình",
    
    render: (_, record) => {
      return <p>{`${record?.steps < 2 ? "Đang chờ duyệt" : "Đã duyệt"}`}</p>;
    },
  },
  {
    title: "Trạng thái",
    key:"status",
    filters:[{
      text:"Đã hoàn thành",value:"HoanThanh",
    },{
      text:"Đã hủy",value:"DaHuy",
    }],
    render: (_, record) => {
      return (
        <>
          {record?.status == 0 ? (
            "Đang xử lý"
          ) : record.status == 1 ? (
            <Tag color="green">Đã xử lý</Tag>
          ) : (
            <Tag color="red">Đã hủy/trả hàng</Tag>
          )}
        </>
      );
    },
  },

];
const TrangChinh = () => {
  document.title="Trang quản lý đơn nhập"
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.PhieuNhap);
  const nav = useNavigate();
  const [tableParams, setTableParams] = useState({});
  
  useEffect(() => {
    dispatch(PhieuNhapAPI.fetchGetPhieuNhaps({...tableParams}));
  }, [tableParams]);
  
  const handleTableChange=(pagination,filters,sorter)=>
  {
    const daThanhToan = filters["daThanhToan"];
    const status = filters["status"];
    
    setTableParams({
      status:status[0]??"",
    });
  }
  const Actionsbtn=(
    <>
      <Link to="tao-moi"><Button type="primary">Thêm mới phiếu nhập</Button></Link>
    </>
  )
  return (
    <Space direction="vertical" style={{width:"100%"}}>
      <StickyActions  IconBack={<></>} Actionsbtn={Actionsbtn}></StickyActions>
      <Table scroll={{ x: 400 }} rowClassName={"icon"} onRow={(record,index)=>
      {
        return {onClick:(e)=> nav(`${record.id}`)}
      }} onChange={handleTableChange} columns={columns} dataSource={items}></Table>
    </Space>
  );
};

export default TrangChinh;
