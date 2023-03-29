import React,{useState} from 'react'
import "./InfoPage.scss"
import { useDispatch,useSelector } from 'react-redux'
import {Modal} from "antd"
import ModalCustom from '~/components/commomComponents/ModalCustom'
import { InputText } from '~/components/commomComponents/InputText'
import MyButton from '~/components/commomComponents/Button'
import InfoForm from '~/components/Forms/InfoForm'
const InfoPage = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.XacThuc)
    const [modalInfo,setModalInfo] = useState(false);
    const [userName,setUserName] = useState(user.info.tenKhachHang||"")
    const [wrong,setWrong] = useState(false)
    const [dateInfo,setDateInfo] = useState({
        dd:{
            value:"",
            error:""
        },
        mm:{
            value:"",
            error:""
        },
        yyyy:{
            value:"",
            error:""
        }
    })
    const [sex,setSex] = useState(user.info.gioitinh||null);
    console.log({sex})
    const handleToggleModalInfo=()=>
    {
        setModalInfo(true)
    }
    const handleSetDay=(value)=>
    {
        if(Number(value)<31&&Number(value))
        {
            setDateInfo({...dateInfo,dd:{value,error:""}})
        }
        else{
            setDateInfo({...dateInfo,dd:{value,error:"Ngày không hợp lệ"}})
        }
    }
  return (
    <div className='InfoPage'>
        <div className="MyInfo">
            <h2>THÔNG TIN CỦA TÔI</h2>
            <i>Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của bạn luôn được cập nhật.</i>
        </div>
        <div className="InfoDetail">
        <h2>THÔNG TIN CHI TIẾT</h2>
            <div className="name">{user.info.tenKhachHang||<i>Chưa cập nhật ngày sinh</i>}</div>
            <div className="date">{user.info.ngaysinh||<i>Chưa cập nhật ngày sinh</i>}</div>
            <div className="date">{user.info.gioitinh||<i>Chưa cập nhật giới tính</i>}</div>
            <div className="action">
                <span onClick={handleToggleModalInfo}>
                    Chỉnh sửa
                </span>
            </div>
        </div>
        <div className="LoginDetail">
            <h2>THÔNG TIN ĐĂNG NHẬP</h2>
            <div className="email">
                <h3>EMAIL</h3>
                <div className="date">{user.info.email||<i>Chưa cập nhật email</i>}</div>
               <div className="action">
               <span>
                    Chỉnh sửa
                </span>
               </div>
            </div>
            <div className="password">

            </div>
        </div>
       <Modal visible={modalInfo} onCancel={()=>setModalInfo(false)}>
      <div className="formUpdateInfo">
      <strong>CHỈNH SỬA THÔNG TIN CỦA BẠN</strong>
            <InfoForm/>
            <MyButton style={{width:"100%"}}>CẬP NHẬT</MyButton>
      </div>
       </Modal>
    </div>
  )
}

export default InfoPage