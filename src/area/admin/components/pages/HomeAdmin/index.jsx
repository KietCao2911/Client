import { Card, Statistic ,Row, Col, Select, Form, DatePicker, Button, Table, FloatButton} from "antd";
import { useForm } from "antd/lib/form/Form";
import React,{useState} from "react";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function HomeAdmin() {
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
    <Table></Table>
  </Col>
</Row>
}

export default HomeAdmin;
