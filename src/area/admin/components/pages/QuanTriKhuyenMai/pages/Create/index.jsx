import { Button, Card, Col, DatePicker, Input, Row, Select, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import TableProductKN from "../../components/TableProductKN";
import  * as SanPhamAPI from '~/redux/slices/SanPham';
import * as KhuyenMaiAPI from '~/redux/slices/KhuyenMai';
import StickyActions from "~/components/commomComponents/stickyActions";
import { v4 } from "uuid";
import { useTransition } from "react";

const { RangePicker } = DatePicker;
const { useFormik } = require("formik")

const CreateSale =()=>
{
    const {khuyenmai,loading,products} = useSelector(state=>state.KhuyenMai)
    const dispatch = useDispatch()
    const [isPending, startTransition] = useTransition();
    const Form = useFormik({
        initialValues:{
          maDotKhuyenMai:"",
          tenKhuyenMai:"",
          moTa:"",
          ngayBatDau:Date.now().toString(),
          ngayKetThuc:Date.now().toString(),
          giaTriGiamGia:0,
          kieuGiaTri:0,
          trangThai:0,
          chiTietKhuyenMais:[],
        }
      })
      const handleChangeDate=(date)=>
  {
    const dateStart =date[0];
    const dateEnd = date[1]
    console.log({dateStart,dateEnd,date})
    Form.setFieldValue("ngayBatDau",dateStart);
    Form.setFieldValue("ngayKetThuc",dateEnd);
  }
  const handleOnClickProduct=(product)=>
  {
    const temp = [...Form.values.chiTietKhuyenMais];
    const isExist =temp&&temp.length>0? temp.some(x=>x.maSanPham==product.maSanPham):false;
    if(isExist)
    {
      message.open({
        content:"Sản phẩm đã được thêm",
        type:"error"
      })
      return;
    }
    
    const chiTietKhuyenMai = {
      maSanPham:product.maSanPham,
      kieuGiaTri:0,
      giaTri:0,
      thanhTien:0,
      sanPhamNavigation:{...product}
    }
    temp.push(chiTietKhuyenMai);
    Form.setFieldValue("chiTietKhuyenMais",[...temp])
  }
  const handleSearchProducts = (e)=>
  {
    startTransition(() => {
      dispatch(KhuyenMaiAPI.GetProducts({s:e}))
    });
    
  }
  const handleSubmit=()=>
  {
    dispatch(KhuyenMaiAPI.PostKhuyenMaiThunk({body:Form.values}))
  }
  const Actionsbtn=(
    <Space>
          <Button  onClick={handleSubmit}> Xác nhận thêm</Button>
          </Space>
  )
      return <>
        <Row gutter={[10,10]}>
        <Col md={24}>
        <StickyActions Actionsbtn={Actionsbtn}/>
         </Col>
            <Col span={24}>
                <Row gutter={[10,10]}>
                    <Col md={18}>
                        <Card title="Thông tin khuyến mãi">
                            <Space style={{width:"100%"}} direction="vertical">
                                <span>Tên khuyến mãi:</span>
                                <Input onBlur={e=>Form.setFieldValue("tenKhuyenMai",e.target.value)} placeholder="Vui lòng nhập tên khuyến mãi"/>
                                <span>Thời gian khuyến mãi:</span>
                                <RangePicker  onChange={(e)=>handleChangeDate(e)} format={"DD/MM/YYYY"}/>
                            </Space>
                        </Card>
                    </Col>
                    <Col md={6}>
                    <Card title="Chi nhánh">
                        <Select style={{width:"100%"}} defaultValue={""}>
                            <Select.Option value="">Tất cả chi nhánh</Select.Option>
                        </Select>
                    </Card>
                    </Col>
                </Row>
            </Col>
            <Col md={24}>
            <Space style={{width:"100%"}} direction="vertical">
                <b>Tìm kiếm sản phẩm giảm giá:</b>
            <Input placeholder="Chọn sản phẩm giảm giá" onChange={(e)=>handleSearchProducts(e.target.value)}/>
            <List >
          {products&&products.length>0&&products.map(product=>
            {

          return <div key={v4()}>
            <ItemResult onItemClick={()=>handleOnClickProduct(product)} labelProps={{
            name:product.tenSanPham
          }}/>
          </div>
            })}
        </List>
        <TableProductKN form={Form} isEdit={true} source={Form.values?.chiTietKhuyenMais||[]}/>
            </Space>
            </Col>
        </Row>
      </>
}

export default CreateSale;