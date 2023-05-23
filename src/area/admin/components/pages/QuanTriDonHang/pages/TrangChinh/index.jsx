import React, { Fragment } from "react";
import "./QuanTriDonHang.scss";
import { useDispatch, useSelector } from "react-redux";
import HoaDonSlice, * as HoaDonApi from "~/redux/slices/HoaDon/HoaDonSlice";
import { useEffect } from "react";
import { Button, FloatButton, Modal, Space, Table, Tag } from "antd";
import convertVND from "~/components/utils/ConvertVND";
import { useState } from "react";
import { v4 } from "uuid";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Plus, RefreshCcw } from "react-feather";
import StickyActions from "~/components/commomComponents/stickyActions";
import { useQueryString } from "~/hooks/useQueryParams";
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
      title: "Phương thức thanh toán",
      dataIndex: "phiship",
      render: (_, record) => {
        return <p>{`${record?.phuongThucThanhToan}`}</p>;
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
      title: "Tráng thái thanh toán",
      key: "daThanhToan",
      dataIndex: "daThanhToan",
      filters:[{
        text:"Đã thanh toán",value:true,
      },{
        text:"Chờ thanh toán",value:false,
      }],
      render: (_, record) => (
        <>
      {record?.daHoanTien?"Đã hoàn tiền":"Chưa hoàn tiền"?record?.daThanhToan?"Đã thanh toán":"Chưa thanh toán":null}
        </>
      ),
    },
    {
      title: "Trạng thái kho",
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
    {
      title: "Trạng thái đơn ",
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
            {record?.daXuatKho?<Tag color="green">Đã xuất kho</Tag>:<Tag >Chờ xuất kho</Tag>}
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
  const [searchParams,setSearchParams] = useSearchParams();
  const querySearch = useQueryString()
  const handleTableChange=(pagination,filters,sorter)=>
  {
    const daThanhToan = filters["daThanhToan"];
    const status = filters["status"];
    const paginationParams ={
      ...pagination,page:pagination.current
    }
    setSearchParams({...paginationParams})
    dispatch(HoaDonApi.fetchGetAllOrder(paginationParams));
  }
  useEffect(() => {
    dispatch(HoaDonApi.fetchGetAllOrder(querySearch));
  }, []);
  const action=(
    <Space>
      <Link to="tao-moi"><Button type="primary">Thêm mới</Button></Link>
     
    </Space>
  )
  return (
    <div>
      <Space direction="vertical" style={{width:"100%"}}>
        <StickyActions IconBack={<RefreshCcw className="icon" onClick={()=>dispatch(HoaDonApi.fetchGetAllOrder({...tableParams}))}/>} Actionsbtn={action}></StickyActions>
      <Table
      pagination={{
        pageSize:1
      }}
      onRow={(record,index)=>
      {
        return{
          onClick:(e)=>
          {
            nav(`${record?.id}`)
          }
        }
      }}
      
      loading={loading}
      rowClassName={"icon"}
      onChange={handleTableChange}
        rowKey={(recort) => v4()}
        scroll={{ x: 400 }}
        columns={Columns({ setOpenModal })}
        dataSource={hoadons}
      ></Table>
      </Space>

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
