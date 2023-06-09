
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import * as ThongKeAPI from '~/redux/slices/ThongKe';
ChartJS.register(ArcElement, Tooltip, Legend);


const HotProductsAdminHome=()=>
{
  const {hotProducts} = useSelector(state=>state.ThongKe);
 const data = {
    labels: hotProducts?.map(product=>product?.tenSanPham)||[],
    datasets: [
      {
        label: 'SL đã bán',
        data: hotProducts?.map(product=>product?.soLuongDaBan)||[],
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
    const dispatch = useDispatch();
    useEffect(()=>
    {
      dispatch(ThongKeAPI.fetchGetHotProducts())
    },[])
    
    
    return <Doughnut data={data}/>;
}

export default HotProductsAdminHome