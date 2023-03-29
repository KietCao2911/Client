import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./HaveUserComponent.scss"
import {CheckCircleFilled,PlusCircleFilled} from "@ant-design/icons"
import { Col, Modal, Row } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import ModalCustom from '../ModalCustom'
import { InputText } from '../InputText'
import { SelectInput } from '../SelectInput'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import XacThucSlice,*as XacThucAPI from '~/redux/slices/XacThuc'
import { useState } from 'react'
import MyButton from '../Button'
import CustomSpin from '~/components/CustomSpin'
import { v4 } from 'uuid'
import AddressUserForm from '~/components/Forms/AddressUserForm'
const Item=(props)=>
{
    const {data,user} = props;
    const dispatch = useDispatch();
    const handleChangeAddressDefault=(id)=>
    {
      if(user.addressDefault==id)
      {
        return ;
      }
      else
      {
        dispatch(XacThucAPI.fetchChangeAddressDefault({body:{TenTaiKhoan:user.userName,addressDefault:id}}))
      }
        
    }
    const handleDeleteAddress =(id)=>
    {
          dispatch(XacThucAPI.fetchDeleteAddress({id}));
    }
    return(
        <div className={`AddressSelecteItem ${user.addressDefault == data.id?"active":""}`} {...props} >
            {/* <CheckCircleFilled className='iconChecked'/> */}
               <div className="name">{data.name}</div>
               <div className="addressDsc">{data.addressDsc}</div>
               <div className="ward">{data.wardName}</div>
               <div className="addressDetail">{`${data.districtName}, ${data.provinceName}, ${data.phone}`}</div>
               <div className="action">
                <p  onClick={()=>handleDeleteAddress(data.id)}>Xóa</p>
                {user.addressDefault == data.id?null: <p  onClick={()=>handleChangeAddressDefault(data.id)}>Đặt làm địa chỉ mặt định</p>}
               
               </div>
        </div>  
    )
}
const AddItem=(props)=>
{
    return(
        <div className='AddItem' {...props}>
            <span>Thêm địa chỉ</span>
            <PlusCircleFilled className='iconPlus'/>
        </div>
    )
}
const HaveUserAddressComponent = () => {
    const {user} = useSelector(state=>state.XacThuc)
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const [openModal,setOpenModal] = useState(false);
    const [GuessInfo,setGuessInfo] = useState({
      Name:"",
      Phone:"",
      ProvinceName:"",
      DistrictName:"",
      WardName:"",
      ProvinceID:null,
      DistrictID:null,
      WardId:null,
      AddressDsc:"",
      Email:"",
      PaymendMethod:"COD"
  })
  const [wrong,setWrong] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>
    {
      dispatch(GiaoHangNhanhApi.fetchGetProvinces())
    },[])
 
    const handleChangeProvince=(e)=>
    {
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuessInfo({...GuessInfo,ProvinceID:e.target.value,ProvinceName:e.target.options[e.target.selectedIndex].text})
        dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
      }
    }
    const handleChangeDistrict=(e)=>
    {
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuessInfo({...GuessInfo,DistrictID:e.target.value,DistrictName:e.target.options[e.target.selectedIndex].text})
        dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))
      }
    }
    const handleChangeWard=(e)=>{
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuessInfo({...GuessInfo,WardId:e.target.value,WardName:e.target.options[e.target.selectedIndex].text})
      }
    }
    const handleSave=()=>
    {
      dispatch(XacThucAPI.fetchAddAddress({body:{...GuessInfo,tenTaiKhoan:user.userName.trim()}}))
    }
  return (
    <div className='HaveUserComponent'>
        <div className="WelcomeBack"></div>
        <div className="AddressSelected">
            <Row gutter={16}  >
            {user.info&&user.info.map(item=>
                
                 <Col key={v4()} md={{span:8}} xs={{span:24}}>
                
                <Item user={user} data={item}/>  
             
              
          </Col>
                )}
                
                <Col md={{span:8}} xs={{span:24}}>
                <AddItem onClick={()=>setOpenModal(true)}/>
                </Col>
            </Row>
            
            
        </div>
        <Modal visible={openModal} onCancel={()=>setOpenModal(false)}>
            <AddressUserForm/>
        </Modal>
      {/* <CustomSpin></CustomSpin> */}
    </div>
  )
}

export default HaveUserAddressComponent