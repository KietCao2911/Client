import { Button, FloatButton, Table } from 'antd'
import React, { useEffect } from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import *as DanhMucAPI from '~/redux/slices/DanhMuc';
const expandedRowRender = (props) => {
    const { data } = props;
    const columns = [
      {
        title: "Tên danh mục",
        key: "tenSanPham",
        render: (_, record) => {
          return <p>{record?.tenDanhMuc}</p>;
        },
      },
      {
        title:"Hành động",
        render:(_,record)=>
        {
            return <>
            <Button onClick={()=>alert("Thêm 1 danh mục cho ID Danh mục = "+record.tenDanhMuc)}>Thêm 1 danh mục</Button>
            <Button>Xóa danh mục</Button>
            </>
        }
    }
    ];
    return (
      <Table
        pagination={{ hideOnSinglePage: true }}
        columns={columns}
        dataSource={data}
        expandable={{expandedRowRender:expandedRowRender(data.children)}}
      ></Table>
    );
  };
  const coumns=[
    {
        title: "Tên danh mục",
        key: "tenSanPham",
        render: (_, record) => {
          return <p>{record?.tenDanhMuc}</p>;
        },
      },
      {
        title:"Hành động",
        render:(_,record)=>
        {
            return <>
            <Button  onClick={()=>alert("Thêm 1 danh mục cho ID Danh mục = "+record.tenDanhMuc)}>Thêm 1 danh mục</Button>
            <Button>Xóa danh mục</Button>
            </>
        }
    }
  ]
const TrangChu = () => {
    const dispatch = useDispatch();
    const {items} = useSelector(state=>state.DanhMuc)
    useEffect(()=>
    {
        dispatch(DanhMucAPI.fetchCategoryAll());
    },[])
  return (
   <>
   <Table dataSource={items||[]} columns={coumns||[]}  expandable={{
              expandable: (record) =>
                expandedRowRender({ data: record.chillren }),
            }}></Table>
   </>
  )
}

export default TrangChu