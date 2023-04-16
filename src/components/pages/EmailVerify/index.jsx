import { Modal } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomSpin from '~/components/CustomSpin';
import *as XacThucAPI from '~/redux/slices/XacThuc'
import SuccessPage from './pages/Success';
import "./EmailVerify.scss"
import { useParams } from 'react-router-dom';
const EmailVerifyPage = () => {
    const dispatch= useDispatch();
    const [modal, contextHolder] = Modal.useModal();
    const {emailValidateStatus,loading} = useSelector(state=>state.XacThuc)
    const {token} = useParams();
  useEffect(()=>
  {
    dispatch(XacThucAPI.EmailVerify({token}))
  },[])
  return (
    <div className='EmaiVerify'>
        {loading&&<CustomSpin/>}
        {!loading&&emailValidateStatus?<SuccessPage isSuccess={emailValidateStatus}/>:<SuccessPage isSuccess={emailValidateStatus}/>}
    </div>
  )
}

export default EmailVerifyPage