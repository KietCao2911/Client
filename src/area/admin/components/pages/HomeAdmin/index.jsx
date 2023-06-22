import { Card, Statistic ,Row, Col, Select, Form, DatePicker, Button, Table, FloatButton} from "antd";
import { useForm } from "antd/lib/form/Form";
import React,{useEffect, useState} from "react";
import {Logout as SignOut} from "~/redux/slices/XacThuc";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import convertVND from "~/components/utils/ConvertVND";
import { ArrowUp, LogOut } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import HomeAdminComponent from "./components/Home";
import HotProductsAdminHome from "./components/HotProduct";
import MostView from "./components/MostView/MostView";
import { v4 } from "uuid";
import moment from "moment";
import * as ThongKeAPI from "~/redux/slices/ThongKe";
import { SELECTION_NONE } from "antd/es/table/hooks/useSelection";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const columns=[{
  title:"",
  key:v4(),
  render:(_,record)=>
  {
      return <p>{moment(record?.createdAt).format("DD-MM-YYYY")}</p>
  },
  
},{
  title:"SL đơn hàng",
  render:(_,record)=>
  {
      return <p>{record?.tongSoLuong}</p>
  },
},{
  title:"Tiền hàng",
  render:(_,record)=>
  {
      return <p>{convertVND(record?.thanhTien)}</p>
  },
}
,{
  title:"Chiết khấu",
  render:(_,record)=>
  {
      return <p>{record?.tienDaGiam}</p>
  },
},{
  title:"Phí giao hàng",
  render:(_,record)=>
  {
      return <p>{convertVND(record?.phiship)}</p>
  },
},
// {
//     title:"Tiền hàng trả lại",
//     render:(_,record)=>
//     {
//         return <p>{convertVND(record?.phiship)}</p>
//     },
// }
,{
  title:"Doanh thu",
  render:(_,record)=>
  {
      return <p>{convertVND(record?.thanhTien-record?.phiship)}</p>
  },
}
]
function HomeAdmin() {
  const {DoanhThu} = useSelector(state=>state.ThongKe)
  const {values} =  DoanhThu;
  const dispatch = useDispatch();
  useEffect(()=>
  {
    const date =moment().format("YYYY/MM/DD")
    const body = {
      type:"date",
      start: date,
      end: date,
      maChiNhanh:""
  }
  dispatch(ThongKeAPI.fetchGetDoanhThu({body}))
  },[])
return <Row gutter={[10,10]}>
  <Col span={24}>
  </Col>
  <Col span={24}>
      <HomeAdminComponent/>
  </Col>
  <Col span={24}>
    <Row gutter={[10,10]}>
      <Col md={12 } xs={24}>
        <Card title="Sản phẩm được xem nhiều nhất">

        <MostView/>
        </Card>
      </Col>
      <Col md={12} xs={24}>
       <Card title="Sản phẩm bán chạy nhất">
       <HotProductsAdminHome/>
       </Card>
      
      </Col>
    </Row>
  </Col>
  <Col span={24}>
  <Table  
       rowKey={()=>v4()}
       bordered
       summary={(record) => (
         <Table.Summary fixed>
           <Table.Summary.Row>
             <Table.Summary.Cell index={0}>
                <strong>tổng</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={1}>
                <strong>{record?.reduce((x,y)=>x+y.tongSoLuong,0)}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={2}><strong>{convertVND(record?.reduce((x,y)=>x+y.thanhTien,0))}</strong></Table.Summary.Cell>
             <Table.Summary.Cell index={3}>
                <strong>{convertVND(record?.reduce((x,y)=>x+y.chietKhau,0))}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={4}>
                <strong>{convertVND(record?.reduce((x,y)=>x+y.phiship,0))}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={5}>
                <strong>{convertVND(record?.reduce((x,y)=>x+(y.thanhTien-y.phiship),0))}</strong>
             </Table.Summary.Cell>
           </Table.Summary.Row>
         </Table.Summary>
       )}
       pagination={false} columns={columns} dataSource={values||[]}/>
  </Col>
</Row>
}

export default HomeAdmin;
