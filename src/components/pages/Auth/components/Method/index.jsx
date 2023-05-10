import { Link } from 'react-router-dom'
import React from 'react'
import MyButton from '~/components/commomComponents/Button'
import { Space } from 'antd'
import { Mail, Phone } from 'react-feather'

const Method = () => {
  return (
    <div>
      <Space direction='vertical'>
      <Link to="phone">
            <MyButton icon={<Phone></Phone>}> <strong>continue with phone number</strong> </MyButton>
        </Link>
        <Link to="email/dang-nhap">
            <MyButton icon={<Mail/>}>
              
            <strong>continue with email/password</strong>
            </MyButton>
        </Link>
      </Space>
    </div>
  )
}

export default Method