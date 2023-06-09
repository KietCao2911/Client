import { Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";
import { ArrowUp } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import convertVND from "~/components/utils/ConvertVND";
import * as ThongKeAPI from "~/redux/slices/ThongKe";
const HomeAdminComponent=()=>
{
    const dispatch = useDispatch();
    const {homeAdmin} = useSelector(state=>state.ThongKe);
    useEffect(()=>
    {
        dispatch(ThongKeAPI.fetchGetHotHomeAdmin());
    },[])

    return<Row gutter={[10,10]}>
    <Col md={6}>
      <Card  title="Doanh thu ngày" bordered={false} >
      <Statistic
        title="Active"
        value={convertVND(homeAdmin?.tongthu)}
      />
    

     
      </Card>
    </Col>
    <Col md={6}>
              <Card  title="Đơn hàng chờ" bordered={false} >
      <Statistic
        title="Active"
        value={homeAdmin?.donhang}
      />
     
      </Card>
    </Col>
    <Col md={6}>
             <Card  title="Doanh thu thành công" bordered={false} >
      <Statistic
        title="Active"
        value={homeAdmin?.donhangthanhcong}
      />

     
      </Card>
    </Col>
    <Col md={6}>
             <Card  title="Đơn hàng hủy" bordered={false} >
             <Statistic
        title="Active"
        value={homeAdmin?.donhanghuy}
      />

     
      </Card>
    </Col>
  
  </Row>
}
export default HomeAdminComponent;