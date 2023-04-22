import React from "react";
import "./QuanTriDonHang.scss";
import { useDispatch, useSelector } from "react-redux";
import HoaDonSlice, * as HoaDonApi from "~/redux/slices/HoaDon/HoaDonSlice";
import { useEffect } from "react";
import { Button, FloatButton, Modal, Table, Tag } from "antd";
import convertVND from "~/components/utils/ConvertVND";
import { useState } from "react";
import { v4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus } from "react-feather";
const Columns = (props) => {
  const { setOpenModal } = props;
  const dispatch = useDispatch();

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
            <Link to={record.id + ""}>
              <Button>Xem</Button>
            </Link>
          </>
        );
      },
    },
    {
      title: "Tráng thái thanh toán",
      key: "daThanhToan",
      dataIndex: "daThanhToan",
      filters:[{
        text:"Đã thanh toán",value:true,
      },{
        text:"Chưa thanh toán",value:false,
      }],
      render: (_, record) => (
        <>
      {record?.status!=-1?record?.daThanhToan?<Tag>Đã thanh toán</Tag>:<Tag>Chưa thanh toán</Tag>:record?.status==-1?record?.daThanhToan?<Tag>Đã hoàn tiền</Tag>:<Tag>Chưa hoàn tiền</Tag>:null}
        </>
      ),
    },
    {
      title: "Tráng thái ",
      key: "status",
      dataIndex: "status",
      filters:[{
        text:"Đã xử lý",value:"HoanThanh",
      },{
        text:"Đang xử lý",value:0,
      },
      {
        text:"Đã bị bị hủy",value:"DaHuy",
      }],
      render: (_, record) => (
        <>
            {record?.status==0?<Tag color="">Đang xử lý</Tag>:record?.status==1?<Tag color="green">Đã xử lý</Tag>:<Tag color="red">Đã hủy đơn</Tag>}
        </>
      ),
    },
  ];
};
const TrangChinh = () => {
  const dispatch = useDispatch();
  const { hoadons, hoadon,loading } = useSelector((state) => state.HoaDon);
  const [openModal, setOpenModal] = useState(false);
  const nav = useNavigate();
  const [tableParams, setTableParams] = useState({});

  const handleTableChange=(pagination,filters,sorter)=>
  {
    console.log({filters,sorter})
    const daThanhToan = filters["daThanhToan"];
    const status = filters["status"];
    
    setTableParams({
      daThanhToan:daThanhToan[0]??"",
      status:status[0]??"",
    });
  }
  useEffect(() => {
    dispatch(HoaDonApi.fetchGetAllOrder({...tableParams}));
  }, [tableParams]);
  return (
    <div>
      <FloatButton onClick={()=>nav("tao-moi")} icon={<Plus/>}></FloatButton>
      <Table
      loading={loading}
      onChange={handleTableChange}
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
