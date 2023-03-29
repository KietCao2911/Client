import { DownOutlined, LeftOutlined } from "@ant-design/icons"
import { Button, Col, Popover, Row, Space, Steps } from "antd"
import { useState } from "react"

const TrangTaoDonNhap=()=>
{
    const [description,setDesciption] =useState("")
    return <div>
        <Row>
        <Col md={24} >
          <Row gutter={[20,20]}>
            <Col md={12}> <Space.Compact>
                    <Space> <LeftOutlined/></Space>
                    <Space> <a href={"./"}>Quay lại</a> </Space>
              </Space.Compact> </Col>
          </Row>
        </Col>
        <Col md={24}>
          <Row justify={"space-between"} align="middle">
            <Col md={12}>
          <h1><a>#123</a>  </h1>
          <Popover content={
            <>
             <Space.Compact direction="vertical">
             <Space.Compact >
                    <Button>Sửa</Button>
                </Space.Compact>
                <Space.Compact>
                <Button>Xóa</Button>

                </Space.Compact>
                <Space.Compact>
                <Button>In mã vạch</Button>
                </Space.Compact>
             </Space.Compact>
            </>
          } trigger={"click"}>

          <a>Thao tác <DownOutlined style={{fontSize:".5rem"}}/></a>
          </Popover>
            </Col>
            <Col>
            <Steps
    current={0}
    items={[
      {
        title: 'Đặt hàng',
        description,
      },
      {
        title: 'Duyệt',
        description,
      },
      {
        title: 'Nhập kho',
        description,
      },
      {
        title: 'Hoàn thành',
        description,
      },
    ]}
  />
            </Col>
          </Row>
        </Col>
        <Col>
        </Col>
        </Row>
    </div>
}
export default TrangTaoDonNhap