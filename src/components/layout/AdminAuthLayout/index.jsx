import React from 'react'
import "./AdminAuthLayout.scss"
import DangNhap from '~/area/admin/components/pages/AuthPage/pages/DangNhap/DangNhap'
const AdminAuthLayout = ({children}) => {
  return (
  <>
    <div className='AdminAuthLayout layout'>
        {children}
    </div>
  </>
  )
}

export default AdminAuthLayout