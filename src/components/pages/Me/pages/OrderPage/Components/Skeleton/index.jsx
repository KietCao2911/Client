import { Col, Row, Space } from "antd"
import "./OrderPageSkeleton.scss"
const Skeleton=()=>
{
    return<Row  justify={"space-between"} gutter={[20,20]} className="OrderPageSkeleton">
    <Col className="LeftContainer" md={16} xs={24} >
    <Row gutter={[20,20]}>

    <Col xs={24} md={6} className="img"></Col>
    <Col xs={24} md={18} className="dsc">
        <Space style={{width:"100%"}} direction="vertical">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
        </Space>
    </Col>
    </Row>
    </Col>
    <Col md={4} xs={24}className="RightContainer">
    <div className="line"></div>
  
    </Col>
</Row>
}
const OrderPageSkeleton=({size})=>
{
    return <Row gutter={[10,10]} >
                  <Col span={24}>
                  <Skeleton/>
                  </Col>
                  <Col span={24}>
                  <Skeleton/>
                  </Col>
                  <Col span={24}>
                  <Skeleton/>
                  </Col>
                  <Col span={24}>
                  <Skeleton/>
                  </Col>
                  
    </Row >
}

export default OrderPageSkeleton