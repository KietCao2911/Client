import { Space } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "~/components/commomComponents/Button";
import InputText from "~/components/commomComponents/InputText";
import * as XacThucAPI from "~/redux/slices/XacThuc";
import * as YUP from "yup"
const ForgotPassword =()=>
{
    const {loading} = useSelector(state=>state.XacThuc)
    const ForgotForm = useFormik({
        initialValues:{
            email:""
        },
        validationSchema:YUP.object({
            email:YUP.string().required("Vui lòng nhập trường này").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Email sai định dạng")
        }),
        onSubmit:(values)=>
        {
            dispatch(XacThucAPI.RequestResetPassword(values.email))
        }
    })
    const dispatch = useDispatch();
    const handleRequestForgotPassword=()=>
    {
        
    }
        return <form onSubmit={ForgotForm.handleSubmit}>
            <Space direction="vertical">
            <InputText className={`${ForgotForm.errors.email&&"error"}`} label="Nhập email khôi phục" name="email" onChange={ForgotForm.handleChange} ></InputText>
            {ForgotForm.errors.email&&<span className="error">{ForgotForm.errors.email}</span>}
            <MyButton loading={loading}>Gửi yêu cầu lấy lại mật khẩu</MyButton>
        </Space>
        </form>
}
export default ForgotPassword;