import { memo, useRef } from "react";
import { ArrowLeft } from "react-feather";
import Breadcrumb from "../Breadcrumb";

const { Col, Row, Space } = require("antd")
const { Link } = require("react-router-dom")

const StickyActions=(props)=>
{
  
    const {link , label,Actionsbtn,breadcrumbsrc,IconBack} = props;
    const ref= useRef();
    window.addEventListener("scroll", () => {
        if (ref &&ref.current) {
          ref.current.classList.toggle("sticky", window.scrollY >40);
        }
      });
    return  <Col ref={ref} className="actions"  span={24}>
    <Row gutter={[10,10]} justify={"space-between"}>
        <Col><Space direction="vertical" style={{width:"100%"}}>
        <Col >
        <Link to={link||""}>
        <Row  align={"middle"} justify={"center"}>
       {IconBack?IconBack: <ArrowLeft/>}<h2>{label||""}</h2>
        </Row>
        </Link>
     </Col>
        {breadcrumbsrc&&<Breadcrumb location={breadcrumbsrc}/>}
        </Space></Col>

     <Col >
     {Actionsbtn&&Actionsbtn}
     </Col>
    </Row>
 </Col>
}
export default memo(StickyActions)