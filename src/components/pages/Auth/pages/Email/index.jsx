import { Space, notification } from 'antd'
import { useFormik } from 'formik'
import React from 'react'
import CustomSpin from '~/components/CustomSpin'
import MyButton from '~/components/commomComponents/Button'
import InputText from '~/components/commomComponents/InputText'
import  * as XacThucAPI from '~/redux/slices/XacThuc';
import * as YUP from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import EmailLoginForm from './Form/Login'
import EmailRegisterForm from './Form/Register'
const Email = () => {

  return (
    <div>
      <Routes>
        <Route element={<EmailLoginForm/>} path="dang-nhap"></Route>
        <Route element={<EmailRegisterForm/>} path="dang-ky"></Route>
      </Routes>
    </div>
  )
}

export default Email