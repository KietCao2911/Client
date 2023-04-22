import { FloatButton, Table } from 'antd'
import React from 'react'
import { Plus, UserPlus, Users } from 'react-feather'
import { Route, Routes } from 'react-router-dom'
import TrangChinh from './Pages/TrangChinh'
import RoleForm from './Pages/RoleForm'

const RoleManager = () => {
  return (
   <>

  
    <Routes>
      <Route element={<TrangChinh/>} path=''></Route>
    </Routes>
   </>
  )
}

export default RoleManager