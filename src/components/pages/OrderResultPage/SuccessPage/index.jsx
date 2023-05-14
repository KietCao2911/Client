import { Card, Col, Descriptions, Row, Space } from "antd"
import { Check, CheckCircle, Home } from "react-feather"
import { Link } from "react-router-dom"
import MyButton from "~/components/commomComponents/Button"
import "./OrderSuccessPage.scss"
import convertVND from "~/components/utils/ConvertVND"

const OrderItem=(props)=>
{
    return <>
        <Card role="article">
            <Space style={{width:"100%"}}>
                <img style={{
                    width:"10rem",
                    height:"10rem"
                }} src={props?.img||"https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Giay_Samba_OG_trang_B75806_01_standard.jpg"}/>
                <Space  direction="vertical"  style={{width:"100%",textAlign:"left"}}>
                <div className="name"><b>
                {props?.sanPhamNavigation?.tenSanPham}
                    </b></div>
                    <div className="size">
                    <b>
                    Số lượng: {props?.soLuong}
                    </b>
                </div>
                <div className="size">
                    <b>
                    Kích thước: {props?.idSize}
                    </b>
                </div>
               <div>
                <b>Màu sắc:</b> <span className="color" style={{
                    display:"inline-block",
                    padding:"1rem",
                    backgroundColor:props?.idColor,
                    borderRadius:"50%",
                }}></span>
               </div>
                </Space>
                <Space style={{width:"100%"} } direction="vertical">
               <div className="size">
                    <b>
                    Đơn giá: {convertVND(500000)}
                    </b>
                </div>
               </Space>
            </Space>
        </Card>
    </>
}

const SuccessPage=({hoadon})=>
{

    return <div className="OrderSuccessPage">
        <Row gutter={[10,10]}>
           <Col span={24}>
            <Check color="black"/>
           </Col> 
           <Col span={24}>
            <strong >đơn hàng đã được đặt</strong    >
            <p>Chúng tôi đã tiếp nhận đơn hàng của bạn, vui lòng chờ email xác nhận. Chúc bạn một ngày tốt lành :) </p>
            </Col> 
           <Col span={24}>
                <Space style={{width:"100%"}} direction="vertical"> 
                   {hoadon?.chiTietNhapXuats?.map(order=>
                    {
                        return  <OrderItem {...order}/>
                    })}
                    {/* <OrderItem/>
                    <OrderItem/> */}
                </Space>
            </Col> 
            <Col span={24}>
                  <Descriptions layout="">
                  <Descriptions.Item  label={<strong>Giá phụ:</strong>} >
                    <b> {convertVND(hoadon?.chiTietNhapXuats?.reduce((x,y)=>x+y.donGia,0)||0)}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Phí giao hàng: </strong>}>
                <b>{convertVND(hoadon?.phiship||0)}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Khuyến mãi:</strong>}>
                <b>{convertVND(hoadon?.daGiamGia||0)}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Thành tiền:</strong>}>
                <b>{convertVND(hoadon?.thanhTien||0)}</b>
                </Descriptions.Item>
                    </Descriptions>  
            </Col>
           <Col  span={24}>
           <Link to={"/"}>
            <MyButton icon={<Home/>}>
                <strong>
                    trở về trang chủ
                </strong>
            </MyButton>
           </Link>
           </Col> 
        </Row>
    </div>
}

export default SuccessPage