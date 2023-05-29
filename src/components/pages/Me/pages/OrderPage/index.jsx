import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./OrderPage.scss"
import  * as MeAPI from '~/redux/slices/MeSlice/MeSlice'
import convertVND from '~/components/utils/ConvertVND'
import { Button, Card, Col, Row, Space, Tabs, Tag, Typography } from 'antd'
import { v4 } from 'uuid'
import { Truck } from 'react-feather'
import { Link } from 'react-router-dom'
const { Paragraph, Text } = Typography;
export const ProductsOrder=({value})=>
{

  return<Row  justify={"space-between"}>
    <Col md={18} xs={24}>
      <Row gutter={[10,10]}>
      
      <Col xs={24} md={6}>
      <img style={{height:"150px"}} src={value?.img||""}/>
      </Col>
      <Col xs={24} md={18}>
      <div className="content">
        <Space direction='vertical'>
        <Paragraph ellipsis={true}>
        {value?.sanPhamNavigation?.tenSanPham}
    </Paragraph>
          <Space className="phanLoai" style={{color:"#8288A1"}}>
          <p>Phân loại hàng: </p>Color: <span style={{padding:"1.5rem",display:"inline-block",backgroundColor:value?.sanPhamNavigation?.idColor}}></span>
          Size: {value?.sanPhamNavigation?.idSize}
          </Space>
          <div className="qty">
            <b>SL: x{value?.soLuong}</b>
          </div>
        </Space>
      </div>
      </Col>
      </Row>
    </Col>
    <Col xs={24} md={6}>
    <strong>Đơn giá: {value?.sanPhamNavigation?.tienDaGiam>0?<Space>
                <del>{convertVND(value?.sanPhamNavigation?.tienDaGiam)}</del>
                <span>{convertVND(value?.sanPhamNavigation?.giaBanLe)}</span>
    </Space>:convertVND(value?.sanPhamNavigation?.giaBanLe)}</strong>
    </Col>
  </Row>
}
const OrderPage = () => {
  const dispatch =useDispatch();
  const {myOrders} = useSelector(state=>state.Me);
  const {user} = useSelector(state=>state.XacThuc);
  const getStepsOrder=(steps)=>
  {
    if(steps<0)
    {
      return <Tag color="red">Đơn hàng đã hủy</Tag>
    }
    else if(steps<2)
    {
      
      return <Tag >Đơn hàng chờ xử lý</Tag>
    }
    else return <Tag color="green">Đơn hàng hoàn tất</Tag>
  }
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
            <Link to={`${item?.id}`}>
            <Card  role='article' title={`Mã đơn hàng: #${item?.id}`} extra={<Space>
           {getStepsOrder(item?.steps)}
  </Space>}>
                {item?.chiTietNhapXuats.map(ctnx=>
                  {
                    return <ProductsOrder value={ctnx}/>
                  })}
                  <strong>Thành tiền: {convertVND(item?.thanhTien)}</strong>
          </Card>
            </Link>
          </Col>
            })}
          
        
      </Row>
  }

  useEffect(()=>
  {
    dispatch(MeAPI.getMyOrders({tenTaiKhoan:user.userName}))
  },[])
  const items=[{
    key:v4(),
    label:"Chưa thanh toán",
    children:<OrdersItem orders={myOrders&&myOrders.length>0&& myOrders?.filter(x=>!x?.daThanhToan)||[]}/>
  },
  {
    key:v4(),
    label:"Chờ vận chuyển",
    children:<OrdersItem orders={myOrders&&myOrders.length>0&& myOrders?.filter(x=>x?.steps>=2&&x?.steps<3)||[]}/>
  },
  {
    key:v4(),
    label:"Đã hủy",
    children:<OrdersItem orders={myOrders&&myOrders.length>0&& myOrders?.filter(x=>x?.status==-1)||[]}/>
  }
  ,
  {
    key:v4(),
    label:"Đã vận chuyển",
    children:<OrdersItem orders={myOrders&&myOrders.length>0&& myOrders?.filter(x=>x?.steps>=3&&x?.status!=-1)||[]}/>
  },
  
]
  return (
    <div className='OrderPage'>
      <Tabs  items={items}>

      </Tabs>
    </div>
  )
}

export default OrderPage