import React from 'react'
import "./Card.scss"
import { BASE_URL } from '~/const';
import ReactHtmlParser from "react-html-parser";
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import { v4 } from 'uuid';
const CardCollection = (props) => {
    const {tenBoSuuTap,mota,img,slug} = props;
    const url =  BASE_URL+"wwwroot/res/BstImgs/"+img||"";
  return (
    <Link  to={`/collection/${slug}`} className='CardCollection'>
        <div className="container">
            <div className="img">
                {
                    
                }
                <img src={url||""} alt="" />
            </div>
            <Space direction='vertical' style={{width:"100%"}} className="content">
                <div style={{textTransform:"capitalize"}} className="name"> 
                   <p> {tenBoSuuTap||""}</p>
                </div>
                <div className="dsc">
                {ReactHtmlParser(mota||"")}
                   
                </div>
            </Space>
        </div>
    </Link>
  )
}

export default CardCollection