import SuccessPage from "./SuccessPage";
import "./OrderResult.scss"
import FailureOrderPage from "./FailurePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as HoaDonAPI from "~/redux/slices/HoaDon/HoaDonSlice";
import { useParams } from "react-router-dom";
import CustomSpin from "~/components/CustomSpin";
const OrderResult=()=>
{
    const dispatch = useDispatch();
    const {orderStatus,loading,hoadon} = useSelector(state=>state.HoaDon)
    const {orderID,token}= useParams();
    useEffect(()=>
    {
        dispatch(HoaDonAPI.fetchGetStatusOrder({orderID:orderID ,body:{token}}))
    },[orderID,token])
    if(loading)
    {
        return <CustomSpin/>
    }
    else{
        return <>
        <div className="layout OrderResult">
        {orderStatus?<SuccessPage hoadon={hoadon||{}}/>:<FailureOrderPage/>}
        </div>
        </>
    }
    }
   
export default OrderResult;