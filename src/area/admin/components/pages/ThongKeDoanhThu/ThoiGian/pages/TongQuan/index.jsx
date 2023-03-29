import React from 'react'
import * as DoanhThuApi from "~/redux/slices/ThongKe/index" 
import { useForm } from 'antd/lib/form/Form';
import moment from "moment/moment";
import { Bar } from "react-chartjs-2";
import { useDispatch,useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
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
const TongQuan = () => {
  const {DoanhThu} = useSelector(state=>state.ThongKe)

  return (
 <Bar options={options} data={dataConverter(DoanhThu.labels,DoanhThu.values)}>
 </Bar>   )
}

export default TongQuan