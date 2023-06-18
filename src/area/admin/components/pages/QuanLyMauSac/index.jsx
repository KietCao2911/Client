import { Button, Modal, Space, Table,ColorPicker } from "antd";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 } from "uuid";
import MyButton from "~/components/commomComponents/Button";
import StickyActions from "~/components/commomComponents/stickyActions";
import * as MauSacAPI from "~/redux/slices/MauSacSlice"
const columns=[{
    title:"Mã màu",
    render:(_,record)=>
    {
            return <p>{record?.maMau}</p>
    }
},{
    title:"",
    render:(_,record)=>
    {
            return <span style={{
                display:"inline-block",
                padding:"1rem",
                backgroundColor:`${record?.maMau}`
            }}></span>
    }
},

]

const QuanLyMauSac=()=>
{
    const dispatch = useDispatch();
    const {colors} = useSelector(state=>state.MauSac)
    const [colorSelected,setColorSelected] = useState("");
    const [open,setOpen] = useState(false)
    useEffect(()=>
    {
        dispatch(MauSacAPI.fetchALLColors())
    },[])
    const Actionsbtn=(
        <Space>
            <Button onClick={()=>setOpen(true)}>Thêm màu</Button>
        </Space>
    )
    const handleChangeColor =(e)=>
    {
        setColorSelected(e.target.value)
    }
    const handleSubmit=async()=>
    {
        if(!colorSelected)return;
        const params  = {
            tenMau:colorSelected,
            maMau:colorSelected,
        }
       try {
        const res = await dispatch(MauSacAPI.PostColor(params));
        console.log({res})
        setOpen(false);
    } catch (error) {
        alert("Lỗi")
        setOpen(false);
        }
    }
    return<>
    <StickyActions Actionsbtn={Actionsbtn}></StickyActions>
    <Table rowKey={()=>v4()} columns={columns} dataSource={colors}></Table>
    <Modal open={open} onOk={handleSubmit} onCancel={()=>setOpen(false)}>
            <Space>
             <>   <input  id="color"hidden type="color" onChange={handleChangeColor}/>
                <label htmlFor="color">Chọn màu sắc</label></>
                <div style={{
                display:"inline-block",
                padding:"1rem",
                backgroundColor:`${colorSelected}`
            }}>

                </div>
            </Space>
    </Modal>
    </>
}

export default QuanLyMauSac