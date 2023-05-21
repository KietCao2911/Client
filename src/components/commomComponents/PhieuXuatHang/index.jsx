import { Col, Modal, Row, Space, Table } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import convertVND from "~/components/utils/ConvertVND";
import convertNumberToWords from "~/components/utils/NumberToWord";
const columns = [
    {
      title: "Mã phiếu",
      render: (_, record) => {
        return <p>#{record.id}</p>;
      },
    },
    {
        title: "",
        render: (_, record) => {
          return <img src={record?.img} alt="" style={{width:"100px",height:"100px"}} />;
        },
      },
    {
      title: "Số lượng",
      render: (_, record) => {
        return <p>{record.soLuong || 0}</p>;
      },
    },
    {
        title: "Giá",
        render: (_, record) => {
          return <p>{record.donGia || 0}</p>;
        },
      },
      {
        title: "Thành tiền",
        render: (_, record) => {
          return <p>{convertVND(record.thanhTien || 0)}</p>;
        },
      },
  
  ];
const PhieuXuatHang =({hoadon,open,setOpen})=>
{
    const refPrah =  useRef()
    const handleExportPDF = useReactToPrint({
        content:()=>refPrah.current,
        documentTitle:"Hóa đơn #"+hoadon?.id
    })
    return <>
    <Modal open={open} onCancel={()=>setOpen(false)} cancelText={"Hủy in"} okText="In" onOk={handleExportPDF} >
    <div ref={refPrah} style={{
            padding:"2rem"
        }} > 
        <Row >

{/* header */}
<Col span={24}>
  <Row gutter={[10,10]}>
    <Col span={24}>
        <Row justify={"space-between"}>
            <Col span={12}>
                <Space direction="vertical">
                    <span>
                        <b>Đơn vị:</b> abc</span>
                    <span>
                        <b>Bộ phận:</b> Thu ngân</span>
                </Space>
            </Col>
            <Col span={12}>
                <Space direction="vertical">
                        <p>Ban hành theo thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ tài chính</p>
                </Space>
            </Col>
        </Row>
    </Col>
    <Col span={24}>
    <Space style={{textAlign:"center",width:"100%"}} direction="vertical">
        <h1>PHIếu XUất hàng</h1>
        <p>Ngày... tháng... năm...</p>
        <p>Số: #{hoadon?.id}</p>
    </Space>
    </Col>
    <Col>
    <Space style={{textAlign:"left",width:"100%"}} direction="vertical">
        <p>Người đặt hàng:{hoadon?.diaChiNavigation?.name}</p>
        <p>Xuất hàng tại kho: {hoadon?.maChiNhanh} đến địa điểm:{`${hoadon?.diaChiNavigation?.addressDsc}, ${hoadon?.diaChiNavigation?.wardName},
         ${hoadon?.diaChiNavigation?.districtName}, ${hoadon?.diaChiNavigation?.provinceName}`}</p>
    </Space>
    </Col>
  </Row>
</Col>
{/* body */}
<Col span={24}>
    <Space style={{textAlign:"left",width:"100%"}} direction="vertical">
    <Table pagination={false} columns={columns} dataSource={hoadon?.chiTietNhapXuats||[]} bordered/>
        <p>Tổng tiền bằng chữ: {convertNumberToWords(hoadon?.thanhTien)}</p>
        <p>Tổng tiền bằng số: {convertVND(hoadon?.thanhTien)}</p>
    </Space>
</Col>
<Col span={24} style={{textAlign:"right"}}>
    <p>
        Ngày...tháng...năm...
    </p>
</Col>
{/* footer */}
<Col span={24}>
    <Row justify={"space-between"}  style={{textAlign:"center"}} >
        <Col span={6}>
            <Space direction="vertical">
                <b>Khách hàng</b>
                <p>(Kí họ,tên)</p>
                <p></p>
            </Space>
        </Col>
        <Col span={6} >
            <Space direction="vertical">
            <b>Bên bán</b>
                <p>(Kí họ,tên)</p>
                <p></p>
            </Space>
       
        </Col>
    </Row>
</Col>
<Col span={24}></Col>
<Col span={24}></Col>
</Row>
        </div>
    </Modal>
    </>
}

export default PhieuXuatHang;