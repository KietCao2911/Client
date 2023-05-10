import { useDispatch, useSelector } from "react-redux";
import "./Promo.scss"
import { Space } from "antd";
import ReactHtmlParser from "react-html-parser";
import { X } from "react-feather";
import {removeCoupon} from "~/redux/slices/GioHang/GioHangSlice";
const Promo=(props)=>
{
    const { ghnAPI, chiTietNhapXuats, thanhTien, tongSoLuong, phiShip,couponCode,chiTietCoupons,tienDaGiam,loadingCoupon,couponNavigation } =
    useSelector((state) => state.GioHang);
    const dispatch= useDispatch()
    return <>
    <div className="Promo">
        <X onClick={()=>dispatch(removeCoupon())} className="icon iconClose"/>
        <Space direction="vertical" style={{width:"100%"}}>
            <strong>Đã áp dụng mã giảm giá {couponCode}</strong>
            {props?.couponNavigation ||couponNavigation?.moTa&&  ReactHtmlParser(props?.couponNavigation|| couponNavigation?.moTa) }
        </Space>
    </div>
    </>
}
export default Promo;