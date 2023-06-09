import { Card, DatePicker,Col, Row, Select, Space, Statistic, Table, Button } from "antd"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUp, Printer } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import convertVND from "~/components/utils/ConvertVND"
import * as ThongKeAPI from "~/redux/slices/ThongKe"
import * as BranchsAPI from "~/redux/slices/Branch/BranchSlice"
import moment from "moment"
import handleGeneratePdf from "~/components/utils/Html2PDF"
import { DownloadPdf } from "~/hooks/useDownloadPdf"
import { useReactToPrint } from "react-to-print"
import { v4 } from "uuid"
import { Bar, Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import ExportToExcel from "~/components/commomComponents/ExportToExcel"
const { RangePicker } = DatePicker;
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
const columns=[{
    title:"",
    key:v4(),
    render:(_,record)=>
    {
        return <p>{moment(record?.createdAt).format("DD-MM-YYYY")}</p>
    },
    
},{
    title:"SL đơn hàng",
    render:(_,record)=>
    {
        return <p>{record?.tongSoLuong}</p>
    },
},{
    title:"Tiền hàng",
    render:(_,record)=>
    {
        return <p>{convertVND(record?.thanhTien)}</p>
    },
}
,{
    title:"Chiết khấu",
    render:(_,record)=>
    {
        return <p>{record?.tienDaGiam}</p>
    },
},{
    title:"Phí giao hàng",
    render:(_,record)=>
    {
        return <p>{convertVND(record?.phiship)}</p>
    },
},
// {
//     title:"Tiền hàng trả lại",
//     render:(_,record)=>
//     {
//         return <p>{convertVND(record?.phiship)}</p>
//     },
// }
,{
    title:"Doanh thu",
    render:(_,record)=>
    {
        return <p>{convertVND(record?.thanhTien-record?.phiship)}</p>
    },
}
]

 const TrangChinh=()=>
{
    const dispatch = useDispatch();
    const [typeDate,setTypeDate] = useState("date");
    const [dateValue,setDateValue]=  useState([]);
    const [branchSelect,setBranchSelect] = useState("");
    const {DoanhThu} = useSelector(state=>state.ThongKe)
    const {branchs} = useSelector(state=>state.Branch)
    const {values} =  DoanhThu;
    const refTable = useRef()
    const handleChangeDate=(date)=>
    {
        setDateValue([...date])
    }
    const onClickSubmit = ()=>
    {
        const body = {
            type:typeDate,
            start:dateValue[0]??null,
            end:dateValue[1]??null,
            maChiNhanh:branchSelect||""
        }
        dispatch(ThongKeAPI.fetchGetDoanhThu({body}))
    }
    const handleExport =useReactToPrint({
        content:()=>refTable.current,
        documentTitle:"test",    })
    useEffect(()=>
    {
        dispatch(BranchsAPI.fetchGetBranch())   
    },[])
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Biểu đồ doanh thu',
          },
        },
      };
      const label =values?.map(item=>moment(item.createdAt).format("DD-MM-YYYY"))
      const data={
        labels:label,
        datasets:[{
            label:"Biểu đồ tăng trường doanh thu",
            fill: true,
            data:values?.map(dt=>dt.thanhTien)
        }]
      }
    const excelResource=()=>{
        const data =  values&&values.map(item=>
            {
                return {
                    "Thời gian":moment(item?.createdAt).format("DD-MM-YYYY"),
                    "Số lượng đơn hàng":item?.tongSoLuong,
                    "Thành tiền":item?.thanhTien,
                    "Chiết khấu":item?.chietKhau,
                    "Phí giao hàng":item?.phiship,
                    "Doanh thu":item?.thanhTien-item?.phiship,
                    "Chi nhánh":branchSelect, 
                }

            })
            const sumary={
                "Thời gian":"TỔNG",
                "Số lượng đơn hàng":values?.reduce((x,y)=>x+y?.tongSoLuong,0),
                "Thành tiền":values?.reduce((x,y)=>x+y?.thanhTien,0),
                "Chiết khấu":values?.reduce((x,y)=>x+y?.tienDaGiam,0),
                "Phí giao hàng":values?.reduce((x,y)=>x+y?.phiship,0),
                "Doanh thu":values?.reduce((x,y)=>x+(y?.thanhTien-y.phiship),0)
            }
            data.push(sumary);
            return data
    }

    return <>
    <Row gutter={[10,10]}>
        <Col span={24}>
            {values&&values.length>0&&  <Line options={options} data={data} />}
        </Col>
        <Col span={24}>
            <Card role="article" title={"Doanh thu theo thời gian"} extra={<Space>
                <Select value={branchSelect} onChange={(e)=>setBranchSelect(e)} placeholder="Chọn chi nhánh">
                <Select.Option value={""}>Tất cả chi nhánh</Select.Option>
                    {branchs.map(branch=>
                        {

                  return      <Select.Option value={branch?.maChiNhanh}>{branch?.tenChiNhanh}</Select.Option>
                        })}
                </Select>
                <Select onChange={(e)=>setTypeDate(e)} value={typeDate}>
                    <Select.Option value={"date"}>Date</Select.Option>
                    <Select.Option value={"month"}>Month</Select.Option>
                    <Select.Option value={"year"}>Year</Select.Option>
                </Select>
                <RangePicker onChange={(e)=>handleChangeDate(e)} picker={typeDate} />
                <Button onClick={onClickSubmit}  type="primary">Lọc</Button>
                <Button onClick={handleExport} icon={<Printer/>} >Xuất PDF</Button>
                <ExportToExcel name={`Báo cáo doanh thu `+moment().format("DD-MM-YYYY")} data={()=>excelResource()}/>
            </Space>}>
           <Col span={24}>
           <Row gutter={[10,10]}>
    <Col span={24}>
       <div ref={refTable}>
       <Table  
       rowKey={()=>v4()}
       bordered
       summary={(record) => (
         <Table.Summary fixed>
           <Table.Summary.Row>
             <Table.Summary.Cell index={0}>
                <strong>tổng</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={1}>
                <strong>{record?.reduce((x,y)=>x+y.tongSoLuong,0)}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={2}><strong>{convertVND(record?.reduce((x,y)=>x+y.thanhTien,0))}</strong></Table.Summary.Cell>
             <Table.Summary.Cell index={3}>
                <strong>{convertVND(record?.reduce((x,y)=>x+y.chietKhau,0))}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={4}>
                <strong>{convertVND(record?.reduce((x,y)=>x+y.phiship,0))}</strong>
             </Table.Summary.Cell>
             <Table.Summary.Cell index={5}>
                <strong>{convertVND(record?.reduce((x,y)=>x+(y.thanhTien-y.phiship),0))}</strong>
             </Table.Summary.Cell>
           </Table.Summary.Row>
         </Table.Summary>
       )}
       pagination={false} columns={columns} dataSource={values||[]}/>
       </div>
    </Col>
    </Row>
           </Col>
            </Card>
        </Col>
    </Row>
    </>
}

export default TrangChinh