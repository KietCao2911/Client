import React,{useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
import "./HaveUserComponent.scss"
import { Button, Card, Col, Input, Modal, Row, Space } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import ModalCustom from '../ModalCustom'
import { InputText } from '../InputText'
import { SelectInput } from '../SelectInput'
import *as XacThucAPI from '~/redux/slices/XacThuc'
import { useState } from 'react'
import MyButton from '../Button'
import { v4 } from 'uuid'
import AddressUserForm from '~/components/Forms/AddressUserForm'
import convertVND from '~/components/utils/ConvertVND'
import { Plus } from 'react-feather'
import { removeCoupon } from '~/redux/slices/GioHang/GioHangSlice'
const Item=(props)=>
{
    const {data,user,setModalDeleteCouponOpen} = props;
    const dispatch = useDispatch();
    const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip,couponCode,loadingCoupon,couponNavigation,tienDaGiam } = useSelector(
      (state) => state.GioHang
    );
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
               <div className="name">{data.name}</div>
               <div className="addressDsc">{data.addressDsc}</div>
               <div className="ward">{data.wardName}</div>
               <div className="addressDetail">{`${data.districtName}, ${data.provinceName}, ${data.phone}`}</div>
               <div className="action">
                <p  onClick={()=>handleDeleteAddress(data.id)}>Xóa</p>
                {user.addressDefault == data.id?null: <p  onClick={()=>handleChangeAddressDefault(data.id)}>Đặt làm địa chỉ mặc định</p>}
               
               </div>
        </div>  
    )
}
const AddItem=(props)=>
{
    return(
        <div className='AddItem' {...props}>
            <span>Thêm địa chỉ</span>
            <Plus className='iconPlus'/>
        </div>
    )
}
const HaveUserAddressComponent = () => {
    const {user,loading,state} = useSelector(state=>state.XacThuc)
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip } = useSelector(
      (state) => state.GioHang
    );
    const [modalDeleteCouponOpen,setModalDeleteCouponOpen]= useState(false);
    const [openModal,setOpenModal] = useState(false);
    const onAddedAddress=useMemo(()=>
    {
      if(state.created)
      {
        setOpenModal(false)
      }
    },[state.created])
    const dispatch = useDispatch();
    const handleSave=()=>
    {
      dispatch(XacThucAPI.fetchAddAddress({body:{}}))
    }
  return (
    <div className='HaveUserComponent'>
      <Row gutter={[20,20]}>
        {!openModal&&!loading&&<Col md={24} xs={24}>
        <div className="AddressSelected">
            <Row gutter={[20,20]} >
              <Col md={24} xs={24}>
                <Row gutter={[10,10]}>
            {user.info&&user.info.map(item=>
                
               item?.deletedAT==null&&<Col key={v4()} md={8} xs={24}>
                
               <Item setModalDeleteCouponOpen={setModalDeleteCouponOpen} user={user} data={item}/>  
         </Col>
                )}
                <Col md={8} xs={24}>
                <AddItem onClick={()=>setOpenModal(true)}/>
                </Col>
               </Row>
               </Col>
                
               
            </Row>
        </div>
        </Col>}
        
             
      </Row>
        <Modal okButtonProps={{style:{
          display:"none"
        }}} 
        cancelButtonProps={{
          style:{
            display:"none"
          }
        }}
        open={openModal} onCancel={()=>setOpenModal(false)}>
            <AddressUserForm/>
        </Modal>
      {/* <CustomSpin></CustomSpin> */}
    </div>
  )
}

export default HaveUserAddressComponent