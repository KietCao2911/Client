import { Card, Col, Descriptions, Row, Space, Tag } from "antd"
import { ArrowLeft } from "react-feather"
import { ProductsOrder } from "../OrderPage"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as MeAPI from "~/redux/slices/MeSlice/MeSlice"
import moment from "moment"
import convertVND from "~/components/utils/ConvertVND"
const OrderDetailPage =()=>
{
    const {id} = useParams();
    const dispatch = useDispatch()
    const {order} = useSelector(state=>state.Me)
    console.log({order})
    useEffect(()=>
    {
        dispatch(MeAPI.getMyOrder({id}))
    },[id])
    return <Row gutter={[20,20]}>
        <Col span={24}>
            <Row justify={"space-between"} >
                <Col>  
                <Link to="/me/don-hang">
                <ArrowLeft/> 
                </Link>
                </Col>
                <Col>
                <Space>
                    <strong>mã đơn hàng:#{order?.id}</strong>
                    {order?.steps>2&&order?.status!=-1?<Tag color="green">Đơn hàng hoàn tất</Tag>:<Tag>Đang xử lý</Tag>}
                </Space>
                </Col>
            </Row>
        </Col>
        <Col span={24}>
            <Card title="Địa chỉ nhận hàng">
                <Descriptions>
                    <Descriptions.Item>
                        <Space direction="vertical">
                        <span>
                            <b>{order?.diaChiNavigation?.name}</b>
                        </span>
                        <span>
                        {order?.diaChiNavigation?.addressDsc}
                        </span>
                        <span>
                        {order?.diaChiNavigation?.wardName},{order?.diaChiNavigation?.districtName},{order?.diaChiNavigation?.provinceName}
                        </span>
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Space direction="vertical">
                        <span><b>Đặt hàng vào lúc: {moment(order?.createdAt).format("DD-MM-YYYY hh:mm:ss")}</b></span>
                       
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </Col>
        <Col span={24}>
            {order?.chiTietNhapXuats?.map(ctnx=>
                {
                    return  <ProductsOrder value={ctnx}/>
                })}
           
        </Col>
        <Col span={24}>
            <Row justify={"end"}>
                <Col md={8} xs={24}>
                    <Space direction="vertical">
                        <p>Tổng tiền hàng: {convertVND(order?.chiTietNhapXuats?.reduce((x,y)=>x+y?.donGia,0))} </p>
                        <p>Phí giao hàng: {convertVND(order?.phiship)} </p>
                        <p>Giảm giá:{convertVND(order?.tienDaGiam)}</p>
                        <p>Thành tiền: {convertVND(order?.thanhTien)} </p>
                        <p>Phương thức thanh toán: {order?.phuongThucThanhToan} </p>
                        
                    </Space>
                </Col>
            </Row>
        </Col>
    </Row>
}

export default OrderDetailPage