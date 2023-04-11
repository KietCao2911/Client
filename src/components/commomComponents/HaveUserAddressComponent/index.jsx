import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./HaveUserComponent.scss"
import { Col, Input, Modal, Row, Space } from 'antd'
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
import OrderDsc from '../OrderDsc/OrderDsc'
import convertVND from '~/components/utils/ConvertVND'
import { CheckCircle, Plus } from 'react-feather'
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
            <Plus className='iconPlus'/>
        </div>
    )
}
const HaveUserAddressComponent = () => {
    const {user} = useSelector(state=>state.XacThuc)
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const { thanhTien, tongSoLuong, chiTietNhapXuats, phiShip } = useSelector(
      (state) => state.GioHang
    );
    const [openModal,setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const handleSave=()=>
    {
      dispatch(XacThucAPI.fetchAddAddress({body:{}}))
    }
  return (
    <div className='HaveUserComponent'>
      <Row gutter={[20,20]}>
        <Col md={16} xs={24}>
        <div className="AddressSelected">
            <Row gutter={[20,20]} >
              <Col md={16} xs={24}>
                <Row gutter={[10,10]}>
            {user.info&&user.info.map(item=>
                
               <Col key={v4()} md={8} xs={24}>
                
                <Item user={user} data={item}/>  
          </Col>
                )}
                <Col md={8} xs={24}>
                <AddItem onClick={()=>setOpenModal(true)}/>
                </Col>
               </Row>
               </Col>
                
               
            </Row>
            
            
        </div>
        </Col>
        <Col md={8} xs={24}>
              <Space direction='vertical'>
              <Row>
                <Col span={24}>
                  <Row  style={{textAlign:"center"}}> 
                    <Col span={12}>
                     (x{tongSoLuong}) Sản phẩm:
                    </Col>
                    <Col span={12}>
                    {convertVND(
                chiTietNhapXuats?.reduce(
                  (x, y) => x + (y?.donGia * y?.soLuong || 0),
                  0
                )
              ) || convertVND(0)}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}
                >
                     <Row style={{textAlign:"center"}}> 
                    <Col span={12}>
                      Phí giao hàng:
                    </Col>
                    <Col span={12}>{convertVND(phiShip||0)}</Col>
                  </Row>
                </Col>
                <Col span={24}>
                <Row style={{textAlign:"center"}}> 
                    <Col span={12}>
                      Thành tiền:
                    </Col>
                    <Col span={12}>{convertVND(thanhTien) || convertVND("0")}</Col>
                  </Row>
                </Col>
              </Row>
              <InputText label="Nhập mã khuyến mãi nếu có"></InputText>
              <MyButton >Xác nhận mua hàng</MyButton>
              </Space>
        </Col>
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