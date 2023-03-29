import {Space, Col, Row, Table,Button, Form, Input, InputNumber } from 'antd'
import React from 'react'
import "./ChiTietPage.scss"
import * as PhieuNhapAPI from '~/redux/slices/PhieuNhap/PhieuNhap'
import { useSelector,useDispatch } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { useEffect } from 'react'
import convertVND from '~/components/utils/ConvertVND'
import { EditOutlined,DeleteOutlined, SaveOutlined, CheckCircleFilled, CheckCircleOutlined, SearchOutlined, FileAddOutlined, AndroidFilled, FileAddFilled, CloseOutlined, CheckOutlined, MinusOutlined, FolderOpenOutlined } from '@ant-design/icons'
import MyButton from '~/components/commomComponents/Button'
import { useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import * as SanPhamAPI from '~/redux/slices/SanPham'
import { v4 } from 'uuid'
import SearchProducts from './components/Search'

const EditableCell=({ editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps})=>
{
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
     
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  ); 
}



const ChiTietPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {chiTietPhieuNhaps,PhieuNhapInfo,reload} = useSelector(state=>state.PhieuNhap)
  const [phieuNhap,setPhieuNhap] = useState({})
  const {TongSoLuong,SoMatHang,TrangThai} = PhieuNhapInfo
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record._id === editingKey;
  console.log({editingKey}) 
  const [dataSource,setDataSource] = useState([]);
  const [form] = useForm()
  const edit = (record) => {
    console.log({record})
    form.setFieldsValue({ soluongTon:record.soluongTon,soluong:record.soluong });
    setEditingKey(record._id);
  };
  const handleSaveCTSL=(record)=>
  {
    const Soluong = form.getFieldValue("soluong") 
    const soluongTon = form.getFieldValue("soluongTon") 
    const IDPN = id.split("N")[1];
    const body = {
      maMau:record.maMau.trim(),
      maSanPham:record.maSanPham.trim(),
      _idSize:record._idSize,
      Soluong,
      soluongTon
    }
      dispatch(PhieuNhapAPI.fetchPutCTSL({id:IDPN,body}))
      setEditingKey('')
  }
  useEffect(()=>
  {
    const fetch=async()=>
    {

      const res = await dispatch(PhieuNhapAPI.fetchGetCTPN({maPN:id}))
      form.setFieldsValue({VAT:"10%",tongTien:convertVND(PhieuNhapInfo.TongSoLuong||0),totalQty:PhieuNhapInfo.SoMatHang||0,trangThai:PhieuNhapInfo.status?"Đã hoàn thành":"Phiếu tạm"})
    }
    fetch()
   
  },[id,reload,TongSoLuong,SoMatHang])
  const columns =  
     [
    {
      title: "Mã sản phẩm",
      dataIndex: 'maSanPham',
      filters:chiTietPhieuNhaps.map((item,index,self)=>{

          return {
            text:item.maSanPham,
            value:item.maSanPham,
  
          }
        
        
      }),

      filterSearch: true,
      onFilter: (value, record) => record.maSanPham.startsWith(value),
      // render:(_,record)=>
      // {
      //   return <p>#{record.maSanPham}</p>
      // }
    },
    {
      title: "Tên sản phẩm",
      dataIndex:"tenSanPham",
      render:(_,record)=>
      {
        return <p>{`${record.tenSanPham} (${record.sizeLabel}) (${record.colorLabel})`}</p>
      }
    },
    {
      title: "Giá bán",
      editAble:true,
      render:(_,record)=>
      {
        return <p>{convertVND(record.giaBan)}</p>
      }
    },
    {
      title: "Số lượng ",
      dataIndex:"soluong",
      editable:true,
      // render:(_,record)=>
      // {
      //   return  <p>{record.soluong}</p>
      // }
    },
    {
      title: "Số lượng tồn",
      dataIndex:"soluongTon",
      editable:true,
      // render:(_,record)=>
      // {
      //   return <p>{record.soluongTon}</p>
      // }
    },
    {
      title: "Hành động",
      key: "action",
      responsive: ["md"],
      render: (_, record) => 
      {
       
        const editable = isEditing(record);
        console.log({editable})
       return !editable? <Space size="middle">
        <MyButton  onClick={()=>edit(record)} style={{color:"blue"}}><EditOutlined/></MyButton>
       <MyButton  style={{color:"red"}}><DeleteOutlined/></MyButton>
     </Space>:<Space size="middle">
        <MyButton  style={{color:"blue"}} onClick={()=>handleSaveCTSL(record)}><SaveOutlined/></MyButton>
       <MyButton  onClick={()=>setEditingKey("")} style={{color:"red"}}><CloseOutlined/></MyButton>
     </Space>
      }
      
      ,
    },
  ];
  const mergedColumns =columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    console.log({col})
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  })

  const handleSavePhieuNhap=()=>
  {
    const params ={...PhieuNhapInfo,status:true,VAT:10,TongSoLuong:PhieuNhapInfo.TongSoLuong}
    dispatch(PhieuNhapAPI.fetchPutPhieuNhaps({id:params.maPhieuNhap.trim(),body:params}))
  }

  return (
    <div className='ChiTietPage'>
      <div className="Actions">
        <SearchProducts maPN={id}/>
      </div>
     <Row gutter={20}>
      <Col span={16} sm={24} md={24} xl={16}>
     <div className="SanPham">
      <Form component={false} form={form} components={false}>
        <Table rowClassName="editable-row" components={{
          body: {
            cell: EditableCell,
          },
        }} rowKey={v4()} scroll={{ x: 400 }} columns={mergedColumns} dataSource={chiTietPhieuNhaps}></Table>
        </Form>
        </div>
      </Col>
      
      <Col span={8} sm={24} md={24} xl={8}>
        <div className="PhieuNhap">
        
          <Form form={form} >
            <Form.Item label="Mã phiếu nhập" name={"maPN"}>
              <Input placeholder='Mã phiếu tự động' readOnly disabled/>
            </Form.Item>
            <Form.Item label="Tổng tiền hàng" name={"tongTien"}>
              <Input placeholder='Tiền hàng' readOnly />
            </Form.Item>
            <Form.Item label="Trạng thái" name={"trangThai"}>
              <Input placeholder='Trạng thái' readOnly />
            </Form.Item >
            <Form.Item  label="Thuế (VAT)" name="vat" >
              <Input  placeholder='Tiền thuế VAT (10%)' readOnly/>
            </Form.Item>
            <Form.Item label="Tổng số lượng" name="totalQty">
              <Input placeholder='Tổng số lượng' readOnly/>

            </Form.Item>
            <div className="Actions" >
              <Row justify='space-around'>
               {!TrangThai?<>
                <Col>
                <MyButton style={{backgroundColor:"#0275d8"}} Icon={<SaveOutlined/>}>Lưu tạm</MyButton>
                </Col>
                <Col>
                <MyButton style={{backgroundColor:"green"}} Icon={<CheckOutlined/>} onClick={handleSavePhieuNhap}>Hoàn Thành</MyButton>
                </Col>
               </>:
                <>
                <Col><MyButton style={{backgroundColor:"#0275d8"}} onClick={handleSavePhieuNhap} Icon={<EditOutlined/>  }>Cập nhật</MyButton></Col>
                <Col><MyButton style={{backgroundColor:"#d9534f"}} Icon={<DeleteOutlined/>}>Xóa</MyButton></Col>
                </>
               }
              </Row>
            </div>
          </Form> 
                  </div>
      </Col>  
     </Row>
    </div>
  )
}

export default ChiTietPage