import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { Button, Col, FloatButton, Input, Row, Select, Space, Table } from "antd";
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
import * as TypeAPI from "~/redux/slices/Type/TypeSlice";
import * as BrandAPI from "~/redux/slices/Brand/BrandSlice";
import { Plus } from "react-feather";
import StickyActions from "~/components/commomComponents/stickyActions";
const expandedRowRender = (props) => {
  const { data } = props;
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
         <p>
           {record.tenSanPham}
         </p> 
          
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
  const { types} = useSelector((state) => state.Type);
  const { brands } = useSelector((state) => state.Brand);
  const [searchText,setSearchText] = useState("")
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState();
  const nav = useNavigate()
  const onSelectChange = (key) => {
    setSelectedRowKeys(key);
    // setSelectedRowKeys([...selectedRowKeys,...key])
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (e) => onSelectChange(e),
  };
  useEffect(() => {
    dispatch(SanPhamAPI.fetchGetAllProducts({}));
    dispatch(TypeAPI.fetchGetTypes());
    dispatch(BrandAPI.fetchGetBrand());
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
  const handleSearch=(e)=>
  {
    const value = e.target.value;
    setSearchText(value)
    dispatch(SanPhamAPI.fetchGetAllProducts({s:value}))
  }
  const handleChangeType=(id)=>
  {
    dispatch(SanPhamAPI.fetchGetAllProducts({type:id}))
  }
  const handleChangeBrand=(id)=>
  {
    dispatch(SanPhamAPI.fetchGetAllProducts({brand:id}))
  }
  const Actionsbtn=(
    <Link to="tao-moi"> <Button type="primary">Thêm mới</Button></Link>
  )
  return (
    <div className="TrangChinhQLSP">
        <StickyActions IconBack={<></>} Actionsbtn={Actionsbtn}/>
      <Space direction="vertical" className="productsTable">
        <div className="filterActions">
          <Row gutter={[10,10]} align={"middle"}>
            <Col xl={12}>
              <Input value={searchText} onChange={(e)=>handleSearch(e)} placeholder="Tìm kiếm sản phẩm" type="search" addonAfter={ <Space>
            <Select onChange={(e)=>handleChangeType(e)} defaultValue={""}>
                <Select.Option value={""}>Loại sản phẩm</Select.Option>
                {types&&types.length>0&&types.map(type=>
                  {
                    return <Select.Option value={type?.slug}>{type?.name}</Select.Option>
                  })}
              </Select>
              <Select onChange={(e)=>handleChangeBrand(e)} defaultValue={""}>
                <Select.Option value={""}>Thương hiệu</Select.Option>
                {brands&&brands.length>0&&brands.map(brand=>
                  {
                    return <Select.Option value={brand?.slug}>{brand?.name}</Select.Option>
                  })}
              </Select>
            </Space>}/>
            </Col>
            <Col xl={12}>
           
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
          scroll={{ x: 400 }}
            loading={loading}
            className="icon"
            rowSelection={rowSelection}
            onRow={(record)=>{
              return {
                onClick:(e)=>
                {
                 nav(record.maSanPham.trim() + "/versions/")
                }
              }
            }}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) =>
                expandedRowRender({ data: record.sanPhams }),
            }}
            columns={columns({ product: data })}
          ></Table>
        </div>
      </Space>
    </div>
  );
};

export default TrangChinh;
