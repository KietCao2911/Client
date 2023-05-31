import { Col, Row, Space } from "antd";
import "./ProductDetailSkeleton.scss"
import Skeletons from "~/components/commomComponents/Skeleton";

const Skeleton=()=>
{
    return<div className="ProductDetailSkeleton">
        <Row gutter={[20,20]} className="container">
            <Col md={16} xs={24} className="img"></Col>
            <Col md={8} xs={24}  className="product_dsc">
               <Space size={"large"} style={{width:"100%"}} direction="vertical">
                <Row justify={"space-between"} className="header">
                    <Col span={8} className="line"></Col>
                    <Col span={8} className="line"></Col>
                </Row>
               <div className="name"></div>
                <div className="price"></div>
                <div className="sku"></div>
                <div className="dsc">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
               
                <Row className="sizes">
                        <Col className="size" span={6}></Col>
                        <Col className="size" span={6}></Col>
                        <Col className="size" span={6}></Col>
                        <Col className="size" span={6}></Col>
                        <Col className="size" span={6}></Col>
                    </Row>
                    <div className="btnAdd">

                    </div>
                    <div className="dsc">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <div className="dsc">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
               </Space>
            </Col>
           
          <Col span={24}>
          <Skeletons itemsSize={2}></Skeletons></Col>
        </Row>
    </div>
}
export default Skeleton;