import { Button, Card, Checkbox, Col, Descriptions, Form, Input, Row, Select, Space, Table, Tag, message } from "antd";
import { useFormik } from "formik";
import { useCallback, useEffect, useLayoutEffect, useState, useTransition } from "react";
import { ArrowLeft, Edit2, HelpCircle, Home, PenTool, RefreshCcw, Search, Trash2 } from "react-feather";
import { Link, useParams } from "react-router-dom";
import StickyActions from "~/components/commomComponents/stickyActions";
import { DatePicker } from 'antd';
import * as  BranchAPI from "~/redux/slices/Branch/BranchSlice";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "~/components/commomComponents/Breadcrumb";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import { BASE_URL } from "~/const";
import BuyXGiveY from "../components/BuyXGiveY";
import BuyXGiveX from "../components/BuyXGiveX";
import * as YUP  from "yup"
import generateRandomCode from "~/components/utils/RandomCode";
import * as CouponAPI from "~/redux/slices/Coupon";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import CustomSpin from "~/components/CustomSpin";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import convertVND from "~/components/utils/ConvertVND";
import { v4 } from "uuid";
const couponCons ={
    1:"Giảm giá theo % giá trị",
    2:"Giảm giá theo giá trị",
    3:"Mua X tặng X",
    4:"Mua X tặng Y",
}
const couponArea ={
    1:"Toàn bộ khách hàng",
    2:"Chỉ thành viên",
    3:"Thành viên đã mua hàng trên N lần",
    4:"Thành viên đã thanh toán X giá trị",
}
const CouponAreasApply=({conID})=>
{
  

    if(conID=="")
    {
        return ""
    }
    else if(conID==1)
    {
        return ;
    }
    else if(conID==2)
    {
        return ;
    }else if(conID==3)
    {
        return <Space direction="vertical" style={{width:"100%"}}>
                <Input placeholder="Giá trị N" addonAfter={<Search className="icon infoHover"/>}/>
                <Table/>
        </Space>
    }
    else
    {
        return <Space direction="vertical" style={{width:"100%"}}>
        <Input placeholder="Giá trị X" addonAfter={<Search className="icon infoHover"/>}/>
        <Table/>
</Space> 
    }
}

const CouponConditionType=(props)=>
{             
    const {conID,CouponForm} =props;                             
    if(conID=="")
    {
        return null;
    }
    else if(conID==1)
    {
        return <Space  style={{width:"100%"}}>
            <Input {...props} placeholder="Nhập giá trị %" value={CouponForm.values.giaTri} min={0} max={100} onChange={(e)=>CouponForm.setFieldValue("giaTri",e.target.value)} type="number"></Input>%
        </Space>
    }
    else if(conID==2)
    {
        return <Space style={{width:"100%"}}>
        <Input {...props} placeholder="Nhập giá trị " value={CouponForm.values.giaTri} onChange={(e)=>CouponForm.setFieldValue("giaTri",e.target.value)} type="number"></Input>
    </Space>
    }
    else if(conID==3)
    {

        return <Space direction="vertical" style={{width:"100%"}}>
        {CouponForm.values.chiTietCoupons&&CouponForm.values.chiTietCoupons.length>0&&CouponForm.values.chiTietCoupons.map((coupon,index)=>
            {
                return <BuyXGiveX {...props} CouponForm={CouponForm} index={index}/>
            })}
        <Button onClick={()=>CouponForm.setFieldValue("chiTietCoupons",[...CouponForm.values.chiTietCoupons,{maSanPhamX:"",maSanPhamY:"",imgX:"",imgY:""}])} type="primary">Thêm một điều kiện</Button>
    </Space>
    }else
    {

        return <Space direction="vertical" style={{width:"100%"}}>
            {CouponForm.values.chiTietCoupons&&CouponForm.values.chiTietCoupons.length>0&&CouponForm.values.chiTietCoupons.map((coupon,index)=>
                {
                    return <BuyXGiveY {...props} CouponForm={CouponForm} index={index}/>
                })}
            <Button onClick={()=>CouponForm.setFieldValue("chiTietCoupons",[...CouponForm.values.chiTietCoupons,{maSanPhamX:"",maSanPhamY:"",imgX:"",imgY:""}])} type="primary">Thêm một điều kiện</Button>
        </Space>
    }
}
const CouponDsc =(values)=>
{
    let str = "";
    const renderConsCoupon=(idCon)=>
    {
        if(!idCon)
    {
        return ""
    }
        if(idCon==1||idCon==2)
        {
            return `Giảm ${idCon==2?convertVND(values.giaTri):`${values.giaTri}%`}`;
        }else if(idCon==3){
            return `Mua sản phẩm ${values.chiTietCoupons.map(c=>c.maSanPhamX)} được tặng sản phẩm cùng loại`
        }
        else{
            return values.chiTietCoupons.map(c=>`Mua sản phẩm ${c.maSanPhamX} được tặng ${c.maSanPhamY}`);
        }
    }
    const renderAreasCoupon=(idCon)=>
    {
      
        if(!idCon)
        {
            return ""
        }
            if(idCon==1)
            {
                return `tất cả khách hàng`;
            }else if(idCon==2){
                return `tất cả thành viên`
            }
            else if(idCon ==3)
            {
                return ``
            }
            else{
                return    ``
            }
    }
    str= `${values.loaiKhuyenMai&&`<b>${renderConsCoupon(values?.loaiKhuyenMai) } cho ${renderAreasCoupon(values?.nhomDoiTuong)} </b> ` }
            <ul style="list-style-type: square;">
            <li>
            Đơn hàng tối thiểu ${values?.soLuongSPToiThieu} sản phẩm
            </li>
            <li>
            Đơn hàng tối thiểu ${convertVND(values?.giaTriDonHangToiThieu)}
            </li>

            </ul>
            
    `
    
    return str;
}
const CouponForm=(props)=>
{
const {isCreate,isUpdate,isApply,isCancel,isReadOnly} = props;
const {branchs} = useSelector((state)=>state.Branch)
const {coupon,loading} = useSelector((state)=>state.Coupon)
const dispatch = useDispatch();
const {id } =useParams();
const [title,setTitle ] = useState(()=>
{
    return isCreate&&"Tạo Coupons"||isUpdate&&"Cập nhật Coupons"||isApply&&"Xác nhận Coupons"||isCancel&&"Hủy áp dụng coupons"||isReadOnly&&"Chế độ xem";
})
const CouponForm = useFormik({
    initialValues:{
        trangThai:coupon?.trangThai||false,
        maCoupon:coupon?.maCoupon||"",
        tenCoupon:coupon?.maCoupon||"",
        maChiNhanh:coupon?.maChiNhanh||"",
        loaiKhuyenMai:coupon?.loaiKhuyenMai||"",
        giaTri:coupon?.giaTri||0,
        nhomDoiTuong:coupon?.nhomDoiTuong||1,
        soLuongSPToiThieu:coupon?.soLuongSPToiThieu||0,
        soLanDung:coupon?.soLanDung|| 1,
        soLuong:coupon?.soLuong|| 1,
        giaTriDonHangToiThieu:coupon?.giaTriDonHangToiThieu|| 0,
        mota:coupon?.moTa|| "",
        couponNavigation:coupon?.couponNavigation|| {},
        chiTietCoupons:coupon?.chiTietCoupons|| [],
        couponsKhachHang: coupon?.couponsKhachHang ||[],
        ngayBatDau:coupon?.ngayBatDau|| "",
        ngayKetThuc:coupon?.ngayKetThuc||"",
        
    },
    initialErrors:{
        maCoupon:true,
        loaiKhuyenMai:true,
        ngayBatDau:true,
        ngayKetThuc:true,
    },
    initialTouched:{
        maCoupon:false,
        loaiKhuyenMai:false,
        ngayBatDau:false,
        ngayKetThuc:false,
    },
    validationSchema:YUP.object({
        maCoupon:YUP.string().required("Phải nhập trường này"),
        loaiKhuyenMai:YUP.number().required("Phải chọn trường này"),
        ngayBatDau:YUP.date().required("Phải chọn trường này"),
        ngayKetThuc:YUP.date().required("Phải chọn trường này"),
    }),
    onSubmit:(values)=>
    {
        alert("submit")
        const body = {...values,mota:CouponDsc(CouponForm.values)}

        dispatch(CouponAPI.PostCouponThunk({body}))
    },
    
})
const handleCreate=()=>
{
    const body = {...CouponForm.values,mota:CouponDsc(CouponForm.values)}
    console.log({errors:CouponForm.errors})
    if(CouponForm.isValid)
    {
        dispatch(CouponAPI.PostCouponThunk({body}))
    }
    else{
        message.open({
            content:"Chưa nhập đầy đủ thông tin",
            type:"error"
        })
    }
}
useEffect(()=>
{
    if(isReadOnly||isUpdate)
    {
        dispatch(CouponAPI.GetCouponThunk({id}))
    }
},[id])
useEffect(()=>
{
    if(isUpdate||isReadOnly)
    {
        CouponForm.setValues({...coupon})
    }
},[coupon])
const ActionsBtn=(

     <Space>
      {isCreate&&  <Button type="primary" onClick={()=>handleCreate()} loading={loading} >Xác nhận</Button>}
      {isReadOnly&& <>
       {CouponForm.values.trangThai? <Button onClick={()=>dispatch(CouponAPI.PauseCoupon(id))} type="default" >Tạm ngưng</Button>
        :<Button type="default" onClick={()=>dispatch(CouponAPI.StartCoupon(id))}>Áp dụng</Button>}
        <Link to="chinh-sua"><Button type="primary" >Chỉnh sửa</Button></Link>
        <Button type="primary" danger >Xóa</Button>
      </>}
      {isUpdate&& <>
        <Button type="primary"  >Xác nhận</Button>
        <Link to={"../"+id}><Button  >Hủy</Button></Link>
      </>}
    </Space>
)
const onChangeDate=(e,fieldName)=>
{
   CouponForm.setFieldValue(fieldName,e);
}
useEffect(()=>
{
    dispatch(BranchAPI.fetchGetBranch())
    document.title=isCreate&&"Tạo Coupons"||isUpdate&&"Cập nhật Coupons"||isApply&&"Xác nhận Coupons"||isCancel&&"Hủy áp dụng coupons"||isReadOnly&&"Chế độ xem";
},[])
{
    return<form onSubmit={CouponForm.handleSubmit}>
   {<Row gutter={[0,10]}>
        {/* HEADER ACTIONS */}
        <StickyActions  Actionsbtn={ActionsBtn} breadcrumbsrc={"Admin/Quản trị coupons/"+title} label={"Trở về trang Coupons"} link="/admin/quan-tri-coupons"></StickyActions>

    {(isUpdate||isCreate)&&        <Col span={24}>
            <Row gutter={[10,10]}>
                {/* Coupons Details */}
                <Col md={16} xs={24}>
                    <Row gutter={[10,10]}>
                        <Col span={24}>
                        <Card bordered={false} title="Thông tin chung">
                            <Row gutter={[10,10]}>
                            <Col span={24}>
                                    <Row gutter={[10,10]}>
                                        <Col span={24}>
                                            <Space style={{width:"100%"}} direction="vertical">
                                                <b>Mã coupon</b>
                                            <Input
                                            onBlur={CouponForm.handleBlur}
                                           status={(CouponForm.touched.maCoupon&&CouponForm.errors.maCoupon&&CouponForm.touched.maCoupon)?"error":""} 
                                         value={CouponForm.values.maCoupon} 
                                         name="maCoupon" 
                                         placeholder="Nhập mã coupon"
                                        //  onChange={CouponForm.handleChange} 
                                         addonAfter={<RefreshCcw className="icon" onClick={()=>{

                                            CouponForm.setFieldValue("maCoupon",generateRandomCode(10))
                                            CouponForm.setFieldTouched("maCoupon",true)
                                         }}/>}/>
                                         {CouponForm.touched.maCoupon&&CouponForm.errors.maCoupon&&<span className="error">{CouponForm.errors.maCoupon}</span>}
                                            </Space>
                                        
                                       
                                        </Col>
                                        <Col span={24}>
                                      <Space direction="vertical" style={{width:"100%"}}>
                                      <b>Tên coupon</b>
                                        <Input
                                        placeholder="Nhập tên coupon"                                           status={(CouponForm.touched.tenCoupon&&CouponForm.errors.tenCoupon&&CouponForm.touched.tenCoupon)?"error":""} 
                                         value={CouponForm.values.tenCoupon} 
                                         name="tenCoupon" 
                                         onChange={CouponForm.handleChange} 
                                        />
                                      </Space>
                                       
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[10,10]}>
                                        <Col span={24}>
                                        <b>Loại khuyến mãi</b>
                                            <Select   value={CouponForm.values.loaiKhuyenMai}

                                             fieldNames={"loaiKhuyenMai"}
                                             status={(CouponForm.touched.loaiKhuyenMai&&CouponForm.errors.loaiKhuyenMai&&CouponForm.touched.loaiKhuyenMai)?"error":""}
                                               onChange={(e)=>{

                                                CouponForm.setFieldValue("loaiKhuyenMai",e) 
                                                CouponForm.setFieldTouched("loaiKhuyenMai",true) 
                                                CouponForm.setFieldValue("chiTietCoupons",[])
                                        }} defaultValue={[""]} style={{width:"100%"}}>
                                            <Select.Option key={v4()} value={""}>Chọn phương thức khuyến mãi</Select.Option>
                                            {
                                            Object.entries(couponCons).map(opt=>  <Select.Option key={v4()} value={opt[0]}>{opt[1]}</Select.Option>)
                                            }
                                              
                                            </Select>
                                        </Col>
                                        {CouponForm.values.loaiKhuyenMai&&   <Col md={24} xs={24}>
                                                <CouponConditionType CouponForm={CouponForm} conID={CouponForm.values.loaiKhuyenMai}/>
                                        </Col>}
                                    </Row>
                                </Col>
              
                            </Row>
                            
                        </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Thời gian khuyến mãi">
                            <Space direction="vertical" style={{width:"100%"}}>
                                <b>Ngày bắt đầu</b>
                                <DatePicker showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} 
                                name="ngayBatDau" defaultValue={CouponForm.values?.ngayBatDau? dayjs(CouponForm.values?.ngayBatDau, 'YYYY-MM-DD HH:mm:ss'):null}    
                                format={"DD-MM-YYYY HH:mm:ss"} onBlur={CouponForm.handleBlur} 
                                status={(CouponForm.touched.ngayBatDau&&CouponForm.errors.ngayBatDau&&CouponForm.touched.ngayBatDau)?"error":""}  
                                 onChange={(e)=>onChangeDate(e,"ngayBatDau")} placeholder="Chọn ngày bắt đầu" style={{width:"100%"}}/>
                                <b>Ngày kết thúc</b>
                                <DatePicker  showshowTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}Time name="ngayKetThuc" 
                                defaultValue={CouponForm.values?.ngayKetThuc? dayjs(CouponForm.values?.ngayKetThuc, 'YYYY-MM-DD HH:mm:ss'):null} 
                                 format={"DD-MM-YYYY HH:mm:ss"} onBlur={CouponForm.handleBlur} 
                                 status={(CouponForm.touched.ngayKetThuc&&CouponForm.errors.ngayKetThuc&&CouponForm.touched.ngayKetThuc)?"error":""}
                                   onChange={(e)=>onChangeDate(e,"ngayKetThuc")} placeholder="Chọn ngày kết thúc" style={{width:"100%"}}/>
                            </Space>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                {/* Coupons settings */}
                <Col md={8} xs={24}>
                        <Row gutter={[10,10]}>
                        <Col span={24}>
                        <Card  title="Mô tả" bordered={false}>
                        {ReactHtmlParser(CouponDsc(CouponForm.values,CouponForm))}
                    </Card>
                        </Col>
                        <Col span={24}>
                        <Card  title="Chi nhánh áp dụng" bordered={false}>
                    <Row gutter={[10,10]} span={24}>
                    <Select onChange={(e)=>CouponForm.setFieldValue("maChiNhanh",e)} placeholder="Chọn chi nhánh áp dụng"  value={CouponForm.values?.maChiNhanh} style={{width:"100%"}}>
                    <Select.Option value={""}>Tất cả chi nhánh</Select.Option>
                                              {branchs&&branchs.length>0&&branchs.map(branch=><Select.Option key={v4()} value={branch?.maChiNhanh.trim()}>{branch?.tenChiNhanh}</Select.Option>)}
                                            </Select>
                                        {CouponForm.values.nhomDoiTuong&&   <Col md={24} xs={24}>
                                                <CouponAreasApply conID={CouponForm.values.nhomDoiTuong}/>
                                        </Col>}
                                </Row>
                    </Card>
                        </Col>
                        <Col span={24}>
                        <Card bordered={false} title="Điều kiện">
                        <Space direction="vertical" style={{width:"100%"}}>
                            <b>Số lượng sản phẩm tối thiểu</b>
                            <Input min={0} onChange={(e)=>CouponForm.setFieldValue("soLuongSPToiThieu",Number(e.target.value))} defaultValue={0} type="number"/>
                            <b>Giá trị đơn hàng tối thiểu</b>
                            <Input min={0} defaultValue={0} type="number" onChange={(e)=>CouponForm.setFieldValue("giaTriDonHangToiThieu",Number(e.target.value))} />
                            <b>Số lượng Coupon</b>
                            <Input min={1} onChange={(e)=>CouponForm.setFieldValue("soLuong",Number(e.target.value))}  defaultValue={1} type="number"/>

                        </Space>
                   
                    </Card>
                        </Col>
                        <Col span={24}>
                        <Card  title="Đối tượng áp dụng" bordered={false}>
                    <Row gutter={[10,10]} span={24}>
                    <Select   onChange={(e)=>CouponForm.setFieldValue("nhomDoiTuong",e)}   value={CouponForm.values.nhomDoiTuong||1} style={{width:"100%"}}>
                                            {
                                            Object.entries(couponArea).map(opt=>{
                                                return <Select.Option key={v4()} value={parseInt(opt[0])}>{opt[1]}</Select.Option>
                                            })
                                            }
                                            </Select>
                                        {CouponForm.values.nhomDoiTuong&&   <Col md={24} xs={24}>
                                                <CouponAreasApply conID={CouponForm.values.nhomDoiTuong}/>
                                        </Col>}
                                </Row>
                    </Card>
                        </Col>
                        </Row>
                </Col>
            </Row>
        </Col>}
        {isReadOnly&& <Col span={24}>
            <Card>
              <Descriptions layout="vertical">
                <Descriptions.Item  label={<strong>Mã coupon</strong>}>
                    <b>{CouponForm.values?.maCoupon}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Tên coupon</strong>}>
                    <b>{CouponForm.values?.tenCoupon}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Loại coupon</strong>}>
                   <b>{couponCons[CouponForm.values.loaiKhuyenMai]}</b>
                </Descriptions.Item>
              
                <Descriptions.Item  label={<strong>Tình trạng</strong>}>
                    {
                        CouponForm.values.trangThai?<Tag color="green">Đang chạy</Tag>:   <Tag color="#ccc">Ngưng áp dụng</Tag>

                    }
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Số lượng</strong>}>
                    <b>{CouponForm.values?.soLuong}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Mô tả</strong>}>
                <Space direction="vertical">
                {ReactHtmlParser(CouponDsc(CouponForm.values))}

                </Space>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Số lần dùng cho mỗi đơn hàng</strong>} >
                    <b>{CouponForm.values?.soLanDung}</b>
                </Descriptions.Item>
                <Descriptions.Item  label={<strong>Số lượng sản phẩm tối thiểu</strong>}>
                <b>{CouponForm.values?.soLuongSPToiThieu}</b>
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian bắt đầu">
                <b>{moment(CouponForm.values?.ngayBatDau).format("DD/MM/YYYY HH:mm:ss")}</b>
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc">
                <b>{moment(CouponForm.values?.ngayKetThuc).format("DD/MM/YYYY HH:mm:ss")}</b>

                </Descriptions.Item>
              </Descriptions>
            

            </Card>
        </Col>}                          
    </Row>}
  
    </form>
}
}
export default CouponForm