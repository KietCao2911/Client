import { Button, FloatButton, Modal, Space, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux';
import InputText from '~/components/commomComponents/InputText';
import *as DanhMucAPI from '~/redux/slices/DanhMuc';


const TrangChu = () => {
    const dispatch = useDispatch();
    const {items,loading} = useSelector(state=>state.DanhMuc);
    const [categoryParams,setCategoryParams] = useState({
      tenDanhMuc:"",
      parentCategoryID:-1,
      open:false,
      action:"create",
    })

    const ExpandedRowRender = (props) => {
      const { data } = props;
      const dispatch = useDispatch();
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
            <Space>
            <Button onClick={()=>setCategoryParams({...categoryParams,id:0,action:"create",open:true,parentCategoryID:record?.id})}>Thêm 1 danh mục</Button>
              <Button>Cập nhật danh mục</Button>
              <Button>Xóa danh mục</Button>
            </Space>
              </>
          }
      }
      ];
      return (
        <Table
          pagination={{ hideOnSinglePage: true }}
          columns={columns}
          dataSource={data}
          expandable={{expandedRowRender:ExpandedRowRender(data.children)}}
        ></Table>
      );
    };
    const Columns=()=>{
      const deleteRef = useRef();
      return[
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
               <Space>
               <Button onClick={()=>setCategoryParams({...categoryParams,action:"create",id:0,open:true,parentCategoryID:record?.id})}>Thêm 1 danh mục</Button>
                <Button onClick={()=>setCategoryParams({open:true,action:"update",...record})}>Cập nhật danh mục</Button>
                <Button onClick={()=>dispatch(DanhMucAPI.fetchCategoryDelete(record.id))}>Xóa danh mục</Button>
                <Button>Thêm sản phẩm vào danh mục này</Button>
               </Space>
                </>
            }
        }
      ]
    }
    useEffect(()=>
    {
        dispatch(DanhMucAPI.fetchCategoryAll());
    },[])
    const handleActionCategory =()=>
    {
      console.log({categoryParams})
      if(categoryParams.action=="create")
      {
        dispatch(DanhMucAPI.fetchCategoryAdd(categoryParams))
      }else{
        dispatch(DanhMucAPI.fetchCategoryUpdate({id:categoryParams.id,body:categoryParams}))
      }
    }
  return (
   <>
   <FloatButton icon={<Plus onClick={()=>setCategoryParams({...categoryParams,open:true})}/>} tooltip="Thêm một danh mục gốc">

   </FloatButton>
   <Table  dataSource={items||[]} columns={Columns()||[]}  expandable={{
              expandable: (record) =>
              ExpandedRowRender({ data: record.chillren }),
            }}></Table>
            <Modal onCancel={()=>setCategoryParams({...categoryParams,open:false})} confirmLoading={loading} onOk={handleActionCategory} open={categoryParams.open} title={`${categoryParams.action=="create"?"Thêm mới danh mục":"Cập nhật danh mục"}`}>
              <Space  direction='vertical' style={{width:"100%"}}>
                      <InputText value={categoryParams.tenDanhMuc} onChange={(e)=>setCategoryParams({...categoryParams,tenDanhMuc:e.target.value})} label="Tên danh mục"></InputText>
              </Space>
            </Modal>
   </>
  )
}

export default TrangChu