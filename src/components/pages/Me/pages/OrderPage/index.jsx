import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./OrderPage.scss"
import  * as MeAPI from '~/redux/slices/MeSlice/MeSlice'
import convertVND from '~/components/utils/ConvertVND'
const Item=(props)=>
{
  const {cthd,hd} = props;
  return <div className='ItemMyOrder'>
      <div className="infoProduct">
        <img src={cthd.img} alt="" />
        <div className="content">
          <div className="name">
            <span>{cthd.masanPhamNavigation.tenSanPham}</span>
          </div>
          <div className="size">
            <span>Kích thước: {cthd.sizePhamNavigation.size1}</span>
          </div>
          <div className="color">
            <span>Màu sắc: {cthd.mausacPhamNavigation.tenMau}</span>
          </div>
        </div>
      </div>
      <div className="infoDelivery">
          <div className="content">
            <div className="orderID"><span><b>Mã hóa đơn: </b>#{hd.id}</span></div>
            <div className="nameOrder"><span><b>Tên:</b>{hd.diaChiNavigation.name} </span></div>
            <div className="address"><span><b>Địa chỉ:</b> {`${hd.diaChiNavigation.addressDsc+","}
             ${hd.diaChiNavigation.wardName},
              ${hd.diaChiNavigation.districtName},
              ${hd.diaChiNavigation.provinceName}`} </span></div>
            <div className="totalMoney"><span><b>Tổng tiền:</b> {convertVND(cthd.giaBan)}</span></div>
            <div className="paymentInfo"><span><b>Phương thức thanh toán:</b>{hd.phuongThucThanhToan}</span></div>
            <div className="paymentStatus"><span><b>Trạng thái thanh toán:</b> {hd.status==0?"Chưa thanh toán":"Đã thanh toán"}</span></div>
            <div className="deliveryStatus"><span><b>Trạng thái đơn hàng:</b>{hd.deliveryStatus==0?"Đang chuẩn bị hàng":"Đã hủy"}</span></div>
          </div>
      </div>
      {/* <div className="infoDelivery">
        Giao đến
      </div> */}
  </div>
}
const OrderPage = () => {
  const dispatch =useDispatch();
  const {myOrders} = useSelector(state=>state.Me);
  const {user} = useSelector(state=>state.XacThuc)
  console.log({user});
  useEffect(()=>
  {
    dispatch(MeAPI.getMyOrders({tenTaiKhoan:user.userName}))
  },[])
  return (
    <div className='OrderPage'>
      {myOrders.length>0?myOrders.map(item=>
        {
          return item.chiTietHoaDons.map(cthd=>
            <Item cthd={cthd} hd={item}></Item>)
        }):<strong>Bạn chưa đặt đơn hàng nào</strong>}
    </div>
  )
}

export default OrderPage