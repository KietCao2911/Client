import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import "./CategoryHome.scss"
import childImg  from "~/assets/child.jpg"
import womanImg  from "~/assets/woman.jpg"
import manImg  from "~/assets/man.jpg"
import {v4} from 'uuid'
const CategoryHome = () => {
    console.log("CategoryHome");
    const data =[{
        img:manImg,
        value:[{
            path:"nam",
            label:"Nam"
        },{
            path:"giay-chay-bo-nam",
            label:"Giày chạy bộ"
        },{
            path:"bong-ro-giay-nam",
            label:"Giày bóng rổ"
        }]    
    },{
        img:womanImg,
        value:[{
            path:"nu",
            label:"Nữ"
        },{
            path:"giay-chay-bo-nu",
            label:"Giày chạy bộ"
        },{
            path:"bong-ro-giay-nu",
            label:"Giày bóng rổ"
        }] 
    }];
  return (
    <div className='CategoryHome'>
        <Row>
           <Col span={24}>
                <Row gutter={[10,10]} >
                    {data.map(item=> <Col key={v4()} md={8} xs={24}>
            <div className="Item">
            <img  src={item.img} alt="" />
            <div  className="content">
                    {item.value.map(link=> <Link to={link.path}><strong>{link.label}</strong></Link>)}               
            </div>
        </div>
            </Col>)}
               
            
                </Row>
           </Col>
           <Col span={0}>adad</Col>
        </Row>
    </div>
  )
}

export default CategoryHome