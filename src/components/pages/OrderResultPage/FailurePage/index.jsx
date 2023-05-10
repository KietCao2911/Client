import { Col, Row } from "antd"
import { Frown, Home } from "react-feather"
import { Link } from "react-router-dom"
import MyButton from "~/components/commomComponents/Button"
import "./FailureOrderPage.scss"


const FailureOrderPage=()=>
{
    return<div className="OrderFailurePage">
    <Row gutter={[10,10]}>
        <Col span={24}>
            <Frown/>
        </Col>
        <Col span={24}>
            <div className="h1">Đặt hàng thất bại, vui lòng thử lại sau</div>
        </Col>
        <Col span={24}>
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
export default FailureOrderPage