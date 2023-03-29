import React from 'react'
import moment from 'moment/moment'
import { Form,Select,DatePicker } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import SanPham from './pages/SanPham';
import ThoiGian from './ThoiGian';
import "./ThongKeDoanhThu.scss"
import * as DoanhThuApi from "~/redux/slices/ThongKe/index" 
import { useDispatch } from 'react-redux';

const {Option} = Select
const { RangePicker } = DatePicker;
const ThongKeDoanhThu = () => {
  const dispatch= useDispatch();
  const [form] = useForm();
  const params = useParams();
  console.log({params})
  const handleSubmit =()=>
  {
    const type =form.getFieldValue("type");
    const dateStart = form.getFieldValue("dateBetween")[0].format("YYYY-MM-DD");
    const dateEnd=form.getFieldValue("dateBetween")[1].format("YYYY-MM-DD");
     dispatch(DoanhThuApi.fetchGetDoanhThu({id:'thoi-gian ',body:{type,dateEnd,dateStart}}))
  }
  return (
    <div className='ThongKeDoanhThuPage'>
      <div className="actionPage">
      <Link to="thoi-gian/tong-quan" ><div className={`btn ${params["*"]=="thoi-gian"||params["*"]=="thoi-gian/tong-quan"||params["*"]=="thoi-gian/chi-tiet"?"active":''}`}>Thời gian</div></Link>
      <Link to="san-pham" ><div className={`btn ${params["*"]=="san-pham"||params["*"]=="san-pham/tong-quan"||params["*"]=="san-pham/chi-tiet"?"active":''}`}>Sản phẩm</div></Link>
      </div>
      <div className="navigation">
     
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
    
        <button type="submit" onClick={handleSubmit} >Tìm kiếm</button>
      </Form>
      </div>
      <div className="Content">
        <Routes>
          
          <Route path='san-pham' element={<SanPham/>} ></Route>
          <Route path='thoi-gian/*' element={<ThoiGian/>} ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default ThongKeDoanhThu