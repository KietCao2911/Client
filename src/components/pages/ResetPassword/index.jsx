import { Button, Col, Modal, Row, Space } from "antd"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import InputText from "~/components/commomComponents/InputText"
import * as XacThucAPI from "~/redux/slices/XacThuc"
import * as Yup from "yup"
import MyButton from "~/components/commomComponents/Button"
const ResetPasswordPage =()=>
{
    const dispatch =useDispatch();
    const {token,tenTaiKhoan} = useParams();
    const {loading} = useSelector(state=>state.XacThuc)
    const passwordResetForm = useFormik({
        initialValues:{
        tenTaiKhoan,
        rePassword:"",
        newPassword:"",
        token,
    },
    validationSchema:Yup.object({
        rePassword:Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu nhập lại không khớp')
    }),
    onSubmit:(values)=>
    {
        dispatch(XacThucAPI.ResetPassword(values))
    }
    })
    console.log({error:passwordResetForm.errors})
    return <Modal okButtonProps={{
        style:{
            display:"none"
        }
    }} 
    cancelButtonProps={{
        style:{
            display:"none"
        }
    }} 
    open={true}>
        <form onSubmit={passwordResetForm.handleSubmit}>
        <Space direction="vertical" style={{width:"100%"}}>
            <InputText type="password" label="Mật khẩu mới" name="newPassword" onChange={passwordResetForm.handleChange}></InputText>
            <InputText type="password" className={`${passwordResetForm.errors.rePassword&&"error"}`} label="Nhập lại mật khẩu mới" name="rePassword" onChange={passwordResetForm.handleChange}></InputText>
            {passwordResetForm.errors.rePassword&&<span className="error">{passwordResetForm?.errors.rePassword}</span>}
            <MyButton loading={loading} type="submit" >Thay đổi mật khẩu</MyButton >
            </Space> 
    </form>
    </Modal>
}
export default ResetPasswordPage