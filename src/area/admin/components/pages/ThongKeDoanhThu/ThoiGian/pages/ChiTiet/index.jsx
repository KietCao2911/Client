import { Button, Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import convertVND from '~/components/utils/ConvertVND';
import { utils,writeFile } from 'xlsx';
import moment from 'moment/moment';
const columns=[
  {
    title: '#ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title:'Tên khách hàng',
    dataIndex:'diaChiNavigation',
    key: 'id',

    render:(_,record)=>
    {
     return <p>{record?.diaChiNavigation?.name}</p>
    }
  },  {
    title:'Số điện thoại',
    dataIndex:'diaChiNavigation',
    key: 'id',
    render:(_,record)=>
    {
    return  <p>{record?.diaChiNavigation?.phone}</p>
    }
  }
  ,  {
    title:'Địa chỉ',
    dataIndex:'diaChiNavigation',
    key: 'id',

    render:(_,record)=>
    {
    return  <p>{`(${record?.diaChiNavigation?.addressDsc}),${record?.diaChiNavigation?.wardName}, ${record?.diaChiNavigation?.districtName}, ${record?.diaChiNavigation?.provinceName}`}</p>
    }
  }
  ,  {
    title:'Phí giao hàng',
    dataIndex:'phiship',
    key: 'id',

    render:(_,record)=>
    {
    return  <p>{`${convertVND(record?.phiship)}`}</p>
    }
  }
  ,  {
    title:'Thành tiền',
    dataIndex:'thanhtien',
    render:(_,record)=>
    {
    return  <p>{`${convertVND(record.thanhtien)}`}</p>
    }
  },  {
    title:'Số lượng',
    dataIndex: 'totalQty',
    key: 'totalQty',
  }
];
const exportToExcel = (fileName,data)=>
{
  const ws = utils.json_to_sheet(data); 
  const wb = utils.book_new();
  utils.book_append_sheet(wb,ws,fileName);
  writeFile(wb,`${fileName}.xlsx`);
}
const ChiTiet = () => {
  const {DoanhThu} = useSelector(state=>state.ThongKe)
  const handleExportExcel = (data)=>
  {
    console.log({data})
  var temp =   DoanhThu.details.map(item=>{
    const date = new Date(item.createdAt);
    console.log({date})
    return {
      ID:item.id,
      'Tên khách hàng':item?.diaChiNavigation?.name,
      "Số điện thoại":item?.diaChiNavigation?.phone,
      "Ngày đăt hàng":moment(date).format("DD-MM-YYYY HH:mm:ss"),
      "Địa chỉ":`(${item?.diaChiNavigation?.addressDsc}),${item?.diaChiNavigation?.wardName}, ${item?.diaChiNavigation?.districtName}, ${item?.diaChiNavigation?.provinceName}`,
      "Số lượng":item?.totalQty,
      "Thành tiền":item?.thanhtien,
    }
  })
  exportToExcel(`report(${moment().format("DD-MM-YYYY")})`,temp);
  }
  return (
    <div>
      <Button onClick={handleExportExcel}>Export to excel</Button>
      <Table rowKey={record=>record.id} dataSource={DoanhThu.details} columns={columns}></Table>
    </div>
  )
}

export default ChiTiet