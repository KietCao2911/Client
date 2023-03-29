import React from 'react'
import { Form,Select,DatePicker } from 'antd'
import { useForm } from 'antd/lib/form/Form';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import NhapXuatTon from './pages/NhapXuatTon';
import *  as ThongKeAPI from '~/redux/slices/ThongKe';
import { useDispatch } from 'react-redux';
const {Option} = Select
const { RangePicker } = DatePicker;

const BaoCaoNhapXuat = () => {
    const [form] = useForm();
    const params = useParams();
    const dispatch = useDispatch();
    const handleSubmit = ()=>
    {
        const dateStart = form.getFieldValue("dateBetween")[0].format("YYYY-MM-DD");
        const dateEnd=form.getFieldValue("dateBetween")[1].format("YYYY-MM-DD");
        dispatch(ThongKeAPI.fetchXuatNhapTon({body:{dateEnd,dateStart}}))
    }
  return (
    <div className='BaoCaoNhapXuatPage'>
    <div className="actionPage">
    <Link to=""><div className={`btn ${!params["*"]?"active":""}`}>Phiếu nhập</div></Link>
    </div>
    <div className="navigation">
     <Form layout="inline" form={form} initialValues={{type:"ngay",dateBetween:[moment(),moment()]}}>
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
    </div>
    <div className="Content">
      <Routes>
        
        <Route path='' element={<NhapXuatTon/>} ></Route>
        {/* <Route path='thoi-gian/*' element={<ThoiGian/>} ></Route> */}
      </Routes>
    </div>
  </div>
  )
}

export default BaoCaoNhapXuat