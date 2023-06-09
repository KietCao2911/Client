import { Button, Col, Row, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import InputText from "~/components/commomComponents/InputText"
import * as XacThucAPI from "~/redux/slices/XacThuc"
const AccounSettings=()=>
{
    const {user,loading} = useSelector(state=>state.XacThuc);
    const dispatch = useDispatch();
const handleRequestResetPassword=()=>
{
    console.log({email:user.email})
    dispatch(XacThucAPI.RequestResetPassword(user.email))
}
    return <Row>
<Col span={12}>
<Space direction="vertical" style={{width:"100%"}}>
        <Button   loading={loading} onClick={handleRequestResetPassword}>Yêu cầu thay đổi mật khẩu</Button>
    </Space>
</Col>
    </Row>
}

export default AccounSettings