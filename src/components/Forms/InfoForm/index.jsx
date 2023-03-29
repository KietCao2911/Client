import React from 'react'
import "./InfoForm.scss"
import InputText from '~/components/commomComponents/InputText'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { DatePicker, Space, Spin } from 'antd'
import { FileAddFilled, FileAddOutlined } from '@ant-design/icons'
import * as XacThucAPI from '~/redux/slices/XacThuc'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '~/const'
const InfoForm = () => {
    const dispatch = useDispatch();
    const {user,loading} = useSelector(state=>state.XacThuc)
    const infoForm = useFormik({
        initialValues:{TenHienThi:"",
        NgaySinh:'',
        ThangSinh:'',
        NamSinh:'',
    },
        validationSchema:Yup.object({
            TenHienThi:Yup.string().max(50,"Không nên nhập quá 50 ký tự."),
            NgaySinh:Yup.string().min(1,"Giá trị không bé hơn 1").max(31,"Giá trị không lớn hơn 31"),
            ThangSinh:Yup.string().min(1,"Giá trị không bé hơn 1").max(12,"Giá trị không lớn hơn 12"),
            NamSinh:Yup.string().min(1900,"Giá trị không bé hơn 1900").max(2022,"Giá trị không lớn hơn 2022"),
        })
    })
    const onChangeFile=(e)=>
    {
        const file =e.target.files[0];
        let formData = new FormData();
        formData.append("file",file)
        dispatch(XacThucAPI.fetchSetAvatar({id:user.userName,body:formData}))
    }
  return (
    <div className='InfoForm'>
       <div className="Avatar">
       <div className="inputGroup">
            <input type="file" name="" id="file" hidden onChange={(e)=>onChangeFile(e)}/>
            <label htmlFor="file">
                <img src={`${BASE_URL}wwwroot/res/users/${user.userName.trim()}/avatars/${user?.avatar}`||"https://images.pexels.com/photos/356567/pexels-photo-356567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                {loading?<Spin className='IconAdd' style={{opacity:1}}/>: <FileAddOutlined className='IconAdd'/>}
               
                
            </label>
       </div>
       </div>
        <Space direction='vertical'> 
        
        <InputText label="Tên hiển thị" placeHolder="Tên hiển thị" name="TenHienThi" onChange={infoForm.handleChange} value={infoForm.values.TenHienThi}></InputText>
            <Space>
            <InputText label="Ngày " placeHolder="Ngày sinh" name="NgaySinh" onChange={infoForm.handleChange} value={infoForm.values.NgaySinh}></InputText>
            <InputText label="Tháng " placeHolder="Tháng sinh" name="ThangSinh" onChange={infoForm.handleChange} value={infoForm.values.ThangSinh}></InputText>
            <InputText label="Năm " placeHolder="Năm sinh" name="NamSinh" onChange={infoForm.handleChange} value={infoForm.values.NamSinh}></InputText>
            </Space>
        </Space>
    </div>
  )
}

export default InfoForm