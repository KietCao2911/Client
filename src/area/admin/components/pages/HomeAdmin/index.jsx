import { Card, Statistic ,Row, Col, Select, Form, DatePicker, Button} from "antd";
import { useForm } from "antd/lib/form/Form";
import React,{useState} from "react";
import locale from "antd/lib/date-picker/locale/en_US";
import { SelectInput } from "~/components/commomComponents/SelectInput";
import moment from "moment/moment";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import * as DoanhThuApi from "~/redux/slices/ThongKe/index" 
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
const {Option} = Select
const { RangePicker } = DatePicker;

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
      position: 'top' ,

    },
    title: {
      display: true,
      text: 'Bảng thống kê',
    },
  },
};
 const dataConverter =(labels,data)=>{

return {
  labels,
  datasets: [
    {
      label: 'Doanh thu',
      data: data,
      backgroundColor: '#333',
    },
    
  ],
}
 }

function HomeAdmin() {
  const [form] = useForm();
  const {labels,values} = useSelector(state=>state.ThongKe)
  const dispatch = useDispatch();
  const handleSubmit =()=>
  {
    const type =form.getFieldValue("type");
    const dateStart = form.getFieldValue("dateBetween")[0].format("YYYY-MM-DD");
    const dateEnd=form.getFieldValue("dateBetween")[1].format("YYYY-MM-DD");
     dispatch(DoanhThuApi.fetchGetDoanhThu({id:type,body:{dateEnd,dateStart}}))
  }
  useEffect(()=>
  {
    const type =form.getFieldValue("type");
    const dateStart = form.getFieldValue("dateBetween")[0].format("YYYY-MM-DD");
    const dateEnd=form.getFieldValue("dateBetween")[1].format("YYYY-MM-DD");
     dispatch(DoanhThuApi.fetchGetDoanhThu({id:type,body:{dateEnd,dateStart}})) 
  },[])
return <div>
    <strong>Báo cáo doanh thu </strong>
    <div className="actions">
      <Form layout="inline" form={form} initialValues={{type:"ngay",dateBetween:[moment(),moment()]}}>
        <Form.Item label="Loại thời gian" name={"type"} >
          <Select >
              <Option value="null">Chọn kiểu thống kê</Option>
              <Option value="ngay">Báo cáo theo ngày</Option>
              <Option value="thang">Báo cáo theo tháng</Option>
              <Option value="nam">Báo cáo theo năm</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Thời gian bắt đầu và kết thúc" name={"dateBetween"} >
            <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="DD/MM/YYYY "
          >

          </RangePicker>
        </Form.Item>
    
        <button type="submit" onClick={handleSubmit}>Tìm kiếm</button>
      </Form>
      <Bar options={options} data={dataConverter(labels,values)}>

      </Bar>
    </div>
  </div>
}

export default HomeAdmin;
