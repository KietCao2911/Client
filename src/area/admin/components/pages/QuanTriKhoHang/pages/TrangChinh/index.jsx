import { Button, FloatButton, Input, Modal, Select, Space, Table } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Plus, Search } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateKhoHangForm from '~/components/Forms/CreateKhoHangForm';
import * as BranchAPI from '~/redux/slices/Branch/BranchSlice';
import * as KhoHangAPI from '~/redux/slices/KhoHang/KhoHangSlice';
const columns =[
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
          <Link to={record?.sanPhamNavigation?.maSanPham.trim() + "/versions/"}>
            {record?.sanPhamNavigation?.tenSanPham}
          </Link>
        );
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
              {record?.soLuongTon}
            </p>
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
              {record?.soLuongCoTheban}
            </p>
          </div>
        );
      },
    },
    {
      title: "Hàng đang về",
      key: "coTheBan",
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
             <p>
              {record?.soLuongHangDangVe}
            </p>
          </div>
        );
      },
    },
  ];
const TrangChinh = () => {
    document.title="Quản trị kho hàng"
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.SanPham);
    const { khohangs,sanPhamTrongKho} = useSelector((state) => state.KhoHang);
    const { branchs} = useSelector((state) => state.Branch);
    const [branchSelected,setBranchSelected] = useState("");
    const [open,setOpen]= useState(false)
    useEffect(()=>
    {
        dispatch(KhoHangAPI.fetchGetProducts({maChiNhanh:branchSelected,onlyVersion:true}));
      },[branchSelected])
      useEffect(()=>
      {
        
        dispatch(BranchAPI.fetchGetBranch());
    },[])
  return (
    <>
        <Input placeholder='Tìm kiếm theo tên phiên bản, mã phiên bản'  addonAfter={<Space><Search/> <Select onChange={(e)=>setBranchSelected(e)} placeholder="Kho hàng"></Select>
        {branchs&&branchs.length>0&&branchs.map(branch=><Select.Option value={branch?.maChiNhanh}>{branch?.tenChiNhanh||""}</Select.Option>)}
        </Space>} />
    <Space direction='vertical' style={{width:"100%"}}>
    <div className="actions">
    </div>
    <Table dataSource={sanPhamTrongKho||[]} columns={columns}></Table>
    </Space>
   
    <CreateKhoHangForm/>
    </>
  )
}

export default TrangChinh