import React from 'react'
import MyButton from '~/components/commomComponents/Button'
import { InputText } from '~/components/commomComponents/InputText'
import "./LoginComponent.scss"
const LoginComponent = () => {
  return (
    <div className='LoginComponent'>
        <h1>ĐĂNG NHẬP</h1>
        <InputText></InputText>
        <InputText></InputText>
        <MyButton>ĐĂNG NHẬP</MyButton>
    </div>
  )
}

export default LoginComponent