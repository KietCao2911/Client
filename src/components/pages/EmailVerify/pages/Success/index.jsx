import React from 'react'
import "./Success.scss"
import { CheckCircle, XCircle } from 'react-feather'
import { Space } from 'antd'
import MyButton from '~/components/commomComponents/Button'
import { Link } from 'react-router-dom'
const SuccessPage = (props) => {
  const {isSuccess} = props;
  return (
    <div className='SuccessPage'>
        <div className="content">
           <Space direction='vertical'>
          {isSuccess? <CheckCircle className='icon iconSuccess'/>:<XCircle className='icon iconFail'/>}
           {isSuccess? <h1>XÁC THỰC THÀNH CÔNG</h1>: <h1>XÁC THỰC THẤT BẠI</h1>}
           {isSuccess? <Link  to={"/auth/email/dang-nhap"}><MyButton>ĐĂNG NHẬP NGAY</MyButton></Link>:<p>Vui lòng thử lại:(</p>}
           </Space>
        </div>
    </div>
  )
}

export default SuccessPage