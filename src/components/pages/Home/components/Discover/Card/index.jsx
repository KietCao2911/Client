import React from 'react'
import "./Card.scss"
import { BASE_URL } from '~/const';
import ReactHtmlParser from "react-html-parser";
import { Link } from 'react-router-dom';
const CardCollection = (props) => {
    const {tenBoSuuTap,mota,img,slug} = props;
    const url =  BASE_URL+"wwwroot/res/BstImgs/"+img||"";
  return (
    <Link to={`/collection/${slug}`} className='CardCollection'>
        <div className="container">
            <div className="img">
                {
                    
                }
                <img src={url||""} alt="" />
            </div>
            <div className="content">
                <div className="name"> 
                    {tenBoSuuTap||""}
                </div>
                <div className="dsc">
                {ReactHtmlParser(mota||"")}
                   
                </div>
            </div>
        </div>
    </Link>
  )
}

export default CardCollection