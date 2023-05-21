import React from 'react'
import moment from 'moment/moment'
import { Form,Select,DatePicker } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { Link, Route, Routes, useParams } from 'react-router-dom';
  import "./ThongKeDoanhThu.scss"
import * as DoanhThuApi from "~/redux/slices/ThongKe/index" 
import { useDispatch } from 'react-redux';
import TrangChinh from './pages/TrangChinh';

const {Option} = Select
const { RangePicker } = DatePicker;
const ThongKeDoanhThu = () => {
  const dispatch= useDispatch();
  const [form] = useForm();
  const params = useParams();
  return (

        <Routes>
          
          <Route path='' element={<TrangChinh/>} ></Route>
        </Routes>
  )
}

export default ThongKeDoanhThu