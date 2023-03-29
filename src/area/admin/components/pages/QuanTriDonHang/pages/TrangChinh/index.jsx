import React from "react";
import "./QuanTriDonHang.scss";
import { useDispatch, useSelector } from "react-redux";
import HoaDonSlice, * as HoaDonApi from "~/redux/slices/HoaDon/HoaDonSlice";
import { useEffect } from "react";
import { Button, Modal, Table, Tag } from "antd";
import convertVND from "~/components/utils/ConvertVND";
import { useState } from "react";
import { v4 } from "uuid";
import { Link, useParams } from "react-router-dom";
const Columns = (props) => {
  const { setOpenModal } = props;
  const dispatch = useDispatch();

  const handleGetProductDetails = (id) => {
    dispatch(HoaDonApi.fetchGetOrderDetails({ id }));
    setOpenModal(true);
  };
  const handleCancelOrder = (id) => {
    dispatch(HoaDonApi.fetchCancelOrder({ id: id }));
  };

  return [
    {
      title: "#ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "diaChiNavigation",
      render: (_, record) => {
        return <p>{record?.diaChiNavigation?.name}</p>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "diaChiNavigation",
      render: (_, record) => {
        return <p>{record?.diaChiNavigation?.phone}</p>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChiNavigation",
      render: (_, record) => {
        return (
          <p>{`(${record?.diaChiNavigation?.addressDsc || "--"}),${
            record?.diaChiNavigation?.wardName || "--"
          }, ${record?.diaChiNavigation?.districtName || "--"}, ${
            record?.diaChiNavigation?.provinceName || "--"
          }`}</p>
        );
      },
    },
    {
      title: "Phí giao hàng",
      dataIndex: "phiship",
      render: (_, record) => {
        return <p>{`${convertVND(record?.phiship)}`}</p>;
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhtien",
      render: (_, record) => {
        return <p>{`${convertVND(record?.thanhTien)}`}</p>;
      },
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            <Button onClick={() => handleCancelOrder(record?.id)}>
              Hủy đơn
            </Button>
            <Link to={record.id + "/chinh-sua"}>
              <Button>Chỉnh sửa</Button>
            </Link>
            <Link to={record.id + ""}>
              <Button>Xem</Button>
            </Link>
          </>
        );
      },
    },
    {
      title: "Tráng thái thanh toán",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          {record?.daThanhToan ? (
            <Tag color="green">Đã thanh toán</Tag>
          ) : (
            <Tag color="yellow">Chưa thanh toán</Tag>
          )}
        </>
      ),
    },
    {
      title: "Tráng thái ",
      key: "tags",
      dataIndex: "tags",
      render: (_, record) => (
        <>
          {record?.steps < 4 ? (
            <Tag color="yellow">Đang xử lý</Tag>
          ) : (
            <Tag color="green">Đã xuất kho</Tag>
          )}
        </>
      ),
    },
  ];
};
const TrangChinh = () => {
  const dispatch = useDispatch();
  const { hoadons, hoadon } = useSelector((state) => state.HoaDon);
  const [openModal, setOpenModal] = useState(false);
  console.log({ hoadon });
  useEffect(() => {
    dispatch(HoaDonApi.fetchGetAllOrder());
  }, []);
  return (
    <div>
      <Table
        rowKey={(recort) => v4()}
        scroll={{ x: 400 }}
        columns={Columns({ setOpenModal })}
        dataSource={hoadons}
      ></Table>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      ></Modal>
    </div>
  );
};

export default TrangChinh;
