import { Avatar, Button, Col, Dropdown, Row } from 'antd'
import React from 'react'
import { User } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import {Logout} from '~/redux/slices/XacThuc'
const Menu=()=>
{
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.XacThuc);

  const onLogout=()=>
  {
    dispatch(Logout());
  }
  return [{
    key:v4(),
    label:<Link to={`settings/${user?.userName}`}>Cài đặt</Link>
  },{
    key:v4(),
    label:<Button onClick={onLogout} danger to="setttings">Đăng xuất</Button>
  }
  
  ]
}

const HeaderAdmin = () => {
  return (
    <Row justify={"end"}>
      <Col>
      <Dropdown menu={{items:Menu()}}>
        <User className='icon'/>
      </Dropdown>
      </Col>
    </Row>
  )
}

export default HeaderAdmin