import { Button, Checkbox, Col, FloatButton, Input, Modal, Row, Select, Space, Table, Tabs } from 'antd'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Key, UserPlus, Users } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import * as RoleAPI from '~/redux/slices/RoleManager'
const {Option} = Select
const columns =()=>
{
    return [{
        title:"Tên tài khoản",
        render:(_,record)=>
        {
            return <p>{record?.tenTaiKhoan}</p>
        }
    },
    {
        title:"Nhóm quyền",
        render:(_,record)=>
        {
            return <p>{record?.roleGroup}</p>
        }
    },
    {
        title:"Chi tiết các quyền truy cập",
        render:(_,record)=>
        {
            // return <p>{record?.roleDetails.map(role=>role.roleCode+" , ")}</p>
        }
    },
    {
        title:"",
        render:(_,record)=>
        {
           return <>
           <Space>
            <Button danger>Chặn</Button>
           <Link to={"chinh-sua/"+record?.tenTaiKhoan}> <Button info>Chỉnh sửa quyền truy cập </Button></Link>
           </Space>
           </>
        }
    }
]
}
const RoleGroup=(props)=>
{
    const {rolesChecked,roleGroup} = props;
    const {roles,rolesGroup,loading}= useSelector(state=>state.Role)
    const [values,setValues] = useState([])
    const dispatch = useDispatch();
    const handleChange=(value)=>
    {
        setValues([...value])
        console.log({value,roleGroup})
    }
    const handleChangeRoles=()=>
    {
        const params = {...roleGroup,roleDetails:values&&values.map(r=>
            {
                return{
                    roleGroup:roleGroup.groupName,
                    roleCode : r??"",
                }
            })}
            dispatch(RoleAPI.ChangeRoles(params))
    }
    return <>
    <Row gutter={[10,10]}>
        <Col span={24}>
        <Checkbox.Group 
    onChange={handleChange}
    defaultValue={rolesChecked&&rolesChecked?.map(checked=>{
        return checked?.roleCode
    })}
  
    >
          <Space direction='vertical
          '>

        {
            
            roles&&roles.map(role=>
                {
                    return   <Checkbox value={role?.roleCode}>{role?.roleName} - {role?.roleDsc}</Checkbox>
                })
            }
            </Space>
      
    </Checkbox.Group>
        </Col>
        <Col span={24}> <Button onClick={handleChangeRoles} loading={loading}>Change roles</Button></Col>
    </Row>

    <FloatButton.Group>
   
    <FloatButton icon={<Users/>} tooltip="Thêm một nhóm quyền "></FloatButton>
    
    </FloatButton.Group>
    </>
}
const UserTab=()=>
{
    const {staffs,rolesGroup,loading}= useSelector(state=>state.Role)
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const Form= useFormik({
        initialValues:{
            tenTaiKhoan:"",
            matKhau:"",
            roleGroup:""
        }
    })
    const handleSubmit=()=>
    {
        const params = {...Form.values}
        dispatch(RoleAPI.PostRole(params))
    }
    return  <>
    <Table columns={columns()} dataSource={staffs}/>
    <FloatButton.Group>
    <FloatButton onClick={()=>setOpen(!open)} icon={<UserPlus/>} tooltip="Thêm một tài khoản "></FloatButton>
    
    </FloatButton.Group>
    <Modal confirmLoading={loading} onOk={handleSubmit} open={open}>
      <Space style={{width:"100%"}} direction='vertical'>
      <Input  onChange={(e)=>Form.setFieldValue("tenTaiKhoan",e.target.value)} placeholder='Tên tài khoản'></Input>
        <Input onChange={(e)=>Form.setFieldValue("matKhau",e.target.value)} placeholder='Mật khẩu'></Input>
        <Select onChange={(e)=>Form.setFieldValue("roleGroup",e)} style={{width:"100%"}} placeholder="Nhóm quyền">
            {rolesGroup&&rolesGroup?.length>0&&rolesGroup?.map(otp=><Option value={otp?.groupName}> {otp?.groupName}</Option>)}
        </Select>
      </Space>
    </Modal>
    </>
}
const RoleManagerTab=()=>
{
    const {roles,rolesGroup}= useSelector(state=>state.Role)
    return <Tabs items={rolesGroup&&rolesGroup.length>0&&rolesGroup?.map(role=>{
        return {
            key:v4(),
            label:role?.groupName,
            children:<RoleGroup roleGroup={role} rolesChecked={role?.roleDetails||[]}/>
        }
    })}></Tabs>
}

const TrangChinh = () => {
    const dispatch = useDispatch();
    const {staffs}= useSelector(state=>state.Role)
    console.log({staffs});
    useEffect(()=>
    {
        dispatch(RoleAPI.getStaffs())
        dispatch(RoleAPI.GetRoles())
        dispatch(RoleAPI.GetRolesGroup())
    },[])
  return (

 <>
  
    <Tabs items={[{
        key:v4(),
        label:"Người dùng",
        children:<UserTab/>
        
    },{
        key:v4(),
        label:"Chi tiết các quyền truy cập",
        children:<RoleManagerTab/>
    }

]}></Tabs>
 
 </>
  )
}

export default TrangChinh