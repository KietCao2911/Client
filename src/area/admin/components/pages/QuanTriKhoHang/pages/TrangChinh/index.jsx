import { Button, FloatButton, Input, Modal, Select, Space, Table, message } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Plus, RefreshCcw, Search, User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomSpin from '~/components/CustomSpin';
import CreateKhoHangForm from '~/components/Forms/CreateKhoHangForm';
import * as BranchAPI from '~/redux/slices/Branch/BranchSlice';
import * as KhoHangAPI from '~/redux/slices/KhoHang/KhoHangSlice';
const {Option} = Select;
const columns =[
  {
    title: "Mã chi nhánh",
    key: "maChiNhanh",
    dataIndex: "maChiNhanh",
  },
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
          record?.sanPhamNavigation?.tenSanPham
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
    const SyncProducts=()=>
    {
      if(branchSelected)
      {
        const params= {
          maChiNhanh:branchSelected
        }
        dispatch(BranchAPI.SyncProductsForBranch(params))
      }
      else{
        message.open({
          content:"Phải chọn một chi nhánh để tiến hành đồng bộ.",
          type:"error"
        })
      }
    }
    useEffect(()=>
    {
        dispatch(KhoHangAPI.fetchGetProducts({maChiNhanh:branchSelected.trim(),onlyVersion:true}));
      },[branchSelected])
      useEffect(()=>
      {
        
        dispatch(BranchAPI.fetchGetBranch());
    },[])
  return (
    <>
        {loading&&<CustomSpin/>}
        <Input placeholder='Tìm kiếm theo tên phiên bản, mã phiên bản'  addonAfter={<Space><Search className='icon'/> <Select onChange={(e)=>setBranchSelected(e)} placeholder="Kho hàng">
        {branchs&&branchs.length>0&&branchs.map(branch=><Option value={branch?.maChiNhanh}>{branch?.tenChiNhanh||""}</Option>)}

        </Select>
        </Space>} />
    <Space direction='vertical' style={{width:"100%"}}>
    <div className="actions">
    </div>
    <Table dataSource={sanPhamTrongKho||[]} columns={columns}></Table>
    </Space>
   
    <CreateKhoHangForm open={open} setOpen={setOpen}/>
    <FloatButton.Group  shape="square" style={{ right: 24 }}>
      <FloatButton onClick={SyncProducts}   icon={<RefreshCcw />} tooltip="Đồng bộ sản phẩm cho chi nhánh này" />
<FloatButton icon={<Plus/>} onClick={()=>setOpen(!open)} tooltip="Thêm mới kho hàng"></FloatButton>

    </FloatButton.Group>
    </>
  )
}

export default TrangChinh