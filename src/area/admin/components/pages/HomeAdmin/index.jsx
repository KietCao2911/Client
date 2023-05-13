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
import { useDispatch } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
function HomeAdmin() {
  const dispatch = useDispatch();
return <Row gutter={[10,10]}>
   <FloatButton onClick={()=>dispatch(SignOut())} icon={<LogOut/>} tooltip={"Đăng xuất"}></FloatButton>
  <Col span={24}>
  </Col>
  <Col span={24}>
    <Row gutter={[10,10]}>
      <Col md={6}>
        <Card  title="Doanh thu" bordered={false} >
        <Statistic
          title="Active"
          value={convertVND(500000)}
        />
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUp />}
          suffix="%"
        />

       
        </Card>
      </Col>
      <Col md={6}>
                <Card  title="Doanh thu" bordered={false} >
        <Statistic
          title="Active"
          value={convertVND(500000)}
        />
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUp />}
          suffix="%"
        />

       
        </Card>
      </Col>
      <Col md={6}>
               <Card  title="Doanh thu" bordered={false} >
        <Statistic
          title="Active"
          value={convertVND(500000)}
        />
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUp />}
          suffix="%"
        />

       
        </Card>
      </Col>
      <Col md={6}>
               <Card  title="Doanh thu" bordered={false} >
        <Statistic
          title="Active"
          value={convertVND(500000)}
        />
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUp />}
          suffix="%"
        />

       
        </Card>
      </Col>
    
    </Row>
  </Col>
  <Col span={24}>
    <Bar options={options} data={data}></Bar>
  </Col>
  <Col span={24}>
    <Table></Table>
  </Col>
</Row>
}

export default HomeAdmin;
