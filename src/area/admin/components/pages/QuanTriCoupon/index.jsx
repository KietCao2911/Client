import { Route, Routes, useNavigate } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import CouponForm from "./Form/CouponForm";
import { FloatButton } from "antd";
import { Plus } from "react-feather";

const QuanTriCoupon=()=>
{
    
    return <>
      
    <Routes>
        <Route element={<TrangChu/>} path=""></Route>
        <Route element={<CouponForm isCreate={true}/>}  path="tao-moi"></Route>
        <Route element={<CouponForm isReadOnly={true}/>}  path=":id"></Route>
        <Route element={<CouponForm isUpdate={true}/>}  path=":id/chinh-sua"></Route>
        <Route element={<CouponForm isApply={true}/>}  path=":id/apply"></Route>
        <Route element={<CouponForm isCancel={true}/>}  path=":id/cancel"></Route>
    </Routes>
    </>
}
export default QuanTriCoupon;