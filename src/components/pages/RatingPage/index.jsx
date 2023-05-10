import { Button, Col, Rate, Row, Space } from "antd";
import { useFormik } from "formik";
import InputText from "~/components/commomComponents/InputText";
import "./RatingPage.scss"
import MyButton from "~/components/commomComponents/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as HoaDonAPI from "~/redux/slices/HoaDon/HoaDonSlice";
import * as ReviewAPI from "~/redux/slices/Review";
import { useDispatch, useSelector } from "react-redux";
import CustomSpin from "~/components/CustomSpin";
class RatingParam {
    constructor(maSanPham,idDonHang,comment,rating,starReviewID)
    {
        this.maSanPham=maSanPham;
        this.idDonHang=idDonHang;
        this.comment=comment;
        this.rating = rating;
        this.starReviewID = starReviewID;
    }
}
const RatingPage =()=>
{
    const params = useParams();
    console.log({params});
    const dispatch = useDispatch();
    const {  hoadon,loading } = useSelector((state) => state.Review);    console.log({params})
           const RatingForm = useFormik({
        initialValues:{
            body:[],
        }
    })
    useEffect(()=>
    {
        let body = hoadon?.chiTietNhapXuats?.map(order=>
            {
                    return new RatingParam(order.sanPhamNavigation?.parentID,params.orderID,"",1,0);
            })
       
        RatingForm.setFieldValue("body",body)
    },[hoadon])
    useEffect(()=>
    {
        //fetch Order products here
        dispatch(ReviewAPI.GetOrderRating({id:params.orderID,token:params.token}))
    },[params.orderID])
    const handleSubmit =()=>
    {
        dispatch(ReviewAPI.AddProductRating(RatingForm.values.body))
    }
    console.log({values:RatingForm.values})
    return <>
    {loading&&<CustomSpin/>}
    <div className="RatingContainer">
    <div className="Rating">
     <Row gutter={[10,10]}>
     {hoadon.chiTietNhapXuats?.map((order,index)=>
         {
             
             return       <Col span={24}>
             <Space  direction="vertical"  style={{width:"100%"}}>
                 <h2>YOUR REVIEW</h2>
                     <Space>
                         <img  style={{width:"100px",height:"100px"}} src={order?.img||""}/>
                         <div className="name">{order?.sanPhamNavigation?.tenSanPham}</div>
                     </Space>
                     <Rate defaultValue={1} style={{color:"black"}}  onChange={(value)=>RatingForm.setFieldValue(`body[${index}].rating`,value)}></Rate>
                     <InputText name={`body[${index}].comment`} onChange={RatingForm.handleChange} label="enter your comment"/>
                 
             </Space>
             </Col>
         })}
         {
            hoadon.chiTietNhapXuats?.length>0&&  <Col span={24}>
            <MyButton loading={loading} onClick={()=>handleSubmit()}>
                        <strong>SEND</strong>
                    </MyButton>
            </Col>
         }
           
     </Row>
 
     </div>
    </div>
     </>
 
}

export default RatingPage;