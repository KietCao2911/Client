import { Button, Col, FloatButton, Input, Row, Select, Space, Table, Tag } from "antd";
import { useEffect } from "react";
import { Plus, Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StickyActions from "~/components/commomComponents/stickyActions";
import * as CouponAPI from "~/redux/slices/Coupon";
const columns =[
    {
        title:"Mã coupons",
        render:(_,record)=>
        {
            return <p>{record?.maCoupon}</p>
        }
    },  {
        title:"Trạng thái",
        render:(_,record)=>
        {
            return  <p>{record?.trangThai?<Tag color="green">Đang áp dụng</Tag>:<Tag color="">Ngừng áp dụng</Tag>}</p>
        }
    }
]

const AddOns=()=>
{
    return <Row size={"middle"}>
    <Col md={12} xs={24}>
    <Select  defaultValue={[1]}>
        <Select.Option value={1}>Vui lòng chọn giá trị</Select.Option>
        <Select.Option value={2}>123</Select.Option>
    </Select>
    </Col>
    <Col md={12} xs={24}>
    <Select  defaultValue={[1]}>
        <Select.Option value={1}>Vui lòng chọn giá trị</Select.Option>
        <Select.Option value={2}>123</Select.Option>
    </Select>
    </Col>
    <Col md={12} xs={24}>
    <Select  defaultValue={[1]}>
        <Select.Option value={1}>Vui lòng chọn giá trị</Select.Option>
        <Select.Option value={2}>123</Select.Option>
    </Select>
    </Col>
    <Col md={12} xs={24}>
    <Select  defaultValue={[1]}>
        <Select.Option value={1}>Vui lòng chọn giá trị</Select.Option>
        <Select.Option value={2}>123</Select.Option>
    </Select>
    </Col>
    </Row>
}

const TrangChu=()=>
{
    const nav= useNavigate();
    const dispatch= useDispatch()
    const {coupons } = useSelector(state=>state.Coupon)
    const Actionsbtn =( <Space>
        <Link to="tao-moi"><Button type="primary">Tạo mới</Button></Link>
    </Space>)
    useEffect(()=>
    {
            dispatch(CouponAPI.GetCouponsThunk())
    },[])
    return<>
     <Space direction="vertical" style={{width:"100%"}}>
                <StickyActions Actionsbtn={Actionsbtn} IconBack={<></>}  label={"TRANG COUPONS"} link="/admin/quan-tri-coupons"></StickyActions>

    <Input placeholder="Tìm kiếm coupons code" addonAfter={<Search/>} ></Input>
    <Table rowClassName={"icon"} onRow={(record,index)=>
    {
        return{
            onClick:(e)=>nav(record?.maCoupon)
        }
    }} columns={columns} dataSource={coupons||[]}/>
    </Space>
    </>
}
export default TrangChu;