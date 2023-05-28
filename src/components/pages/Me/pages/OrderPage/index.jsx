import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./OrderPage.scss"
import  * as MeAPI from '~/redux/slices/MeSlice/MeSlice'
import convertVND from '~/components/utils/ConvertVND'
import { Button, Card, Col, Row, Space, Tabs } from 'antd'
import { v4 } from 'uuid'
import { Truck } from 'react-feather'
const OrderPage = () => {
  const dispatch =useDispatch();
  const {myOrders} = useSelector(state=>state.Me);
  const {user} = useSelector(state=>state.XacThuc);
  
  const OrdersItem=({orders})=>
  {
    if(orders.length<=0)
    {
      return <h1>Chưa có đơn hàng nào.</h1>
    }

    return <Row gutter={[10,10]}>
      
        {orders&&orders.map(item=>
            {
return   <Col span={24}>
  <Card  role='article' title={`#${item?.id}`} extra={<Space>
    {/* <Button>Mua lại</Button> */}
    <Button>Xem chi tiết</Button>
  </Space>}>
                {item?.chiTietNhapXuats.map(ctnx=>
                  {
                    return <ProductsOrder value={ctnx}/>
                  })}
                  <strong>Thành tiền: {convertVND(item?.thanhTien)}</strong>
          </Card>
          </Col>
            })}
          
        
      </Row>
  }
  const ProductsOrder=({value})=>
  {
    return<Row  justify={"space-between"}>
      <Col md={18} xs={24}>
        <Space align='start'>
        <img style={{width:"150px",height:"150px"}} src={value?.img||""}/>
        <div className="content">
          <Space direction='vertical'>
            <div className="name">
              <strong>{value?.sanPhamNavigation?.tenSanPham}</strong>
            </div>
            <Space className="phanLoai" style={{color:"#8288A1"}}>
            <p>Phân loại hàng: </p>Color: <span style={{padding:"1.5rem",display:"inline-block",backgroundColor:value?.sanPhamNavigation?.idColor}}></span>
            Size: {value?.sanPhamNavigation?.idSize}
            </Space>
            <div className="qty">
              <b>x{value?.soLuong}</b>
            </div>
          </Space>
        </div>
        </Space>
      </Col>
      <Col xs={24} md={6}>
      <strong>{convertVND(value?.thanhTien)}</strong>
      </Col>
    </Row>
  }
  useEffect(()=>
  {
    dispatch(MeAPI.getMyOrders({tenTaiKhoan:user.userName}))
  },[])
  const items=[{
    key:v4(),
    label:"Chưa thanh toán",
    children:<OrdersItem orders={myOrders.filter(x=>!x.daThanhToan)||[]}/>
  },
  {
    key:v4(),
    label:"Chờ vận chuyển",
    children:<OrdersItem orders={myOrders.filter(x=>x.steps>=2&&x.steps<3)||[]}/>
  },
  {
    key:v4(),
    label:"Đã hủy",
    children:<OrdersItem orders={myOrders.filter(x=>x.status==-1)||[]}/>
  }
  ,
  {
    key:v4(),
    label:"Đã vận chuyển",
    children:<OrdersItem orders={myOrders.filter(x=>x.steps>=3)||[]}/>
  },
  
]
  return (
    <div className='OrderPage'>
      <Tabs centered items={items}>

      </Tabs>
    </div>
  )
}

export default OrderPage