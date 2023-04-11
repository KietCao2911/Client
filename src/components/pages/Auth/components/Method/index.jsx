import { Link } from 'react-router-dom'
import React from 'react'
import MyButton from '~/components/commomComponents/Button'

const Method = () => {
  return (
    <div>
        <Link to="phone">
            <MyButton>Đăng nhập/đăng ký với số điện thoại</MyButton>
        </Link>

    </div>
  )
}

export default Method