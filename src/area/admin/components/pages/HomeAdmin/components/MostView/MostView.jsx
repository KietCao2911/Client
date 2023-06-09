import { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import * as ThongKeAPI from "~/redux/slices/ThongKe";

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sản phẩm được xem nhiều nhất',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
   const data = {
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
const MostView=()=>
{
  const dispatch = useDispatch();
  const {mostviewProducts} = useSelector(state=>state.ThongKe);
  const data = {
    labels: mostviewProducts?.map(product=>product?.tenSanPham)||[],
    datasets: [
      {
        label: 'SL đã bán',
        data: mostviewProducts?.map(product=>product?.viewCount)||[],
        backgroundColor: [
          '#2B2A4C',
          '#B31312',
          '#EA906C',
          '#EEE2DE',
          '#116A7B',
          '#CDC2AE',
          '#ECE5C7',
          'C2DEDC',
          'E4A5FF',
          'FFAAC9',
        ],
        borderColor: [
          '#2B2A4C',
          '#B31312',
          '#EA906C',
          '#EEE2DE',
          '#116A7B',
          '#CDC2AE',
          '#ECE5C7',
          'C2DEDC',
          'E4A5FF',
          'FFAAC9',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(()=>
  {
    dispatch(ThongKeAPI.MostViewsProducts())
  },[])
  return <Doughnut data={data}/>;
}

export default MostView