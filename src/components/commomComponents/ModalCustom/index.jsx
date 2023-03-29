import React from 'react'
import { useState } from 'react'
import {CloseOutlined} from "@ant-design/icons"
import "./ModalCustom.scss"
const ModalCustom = (props) => {
    const {children,show,onCancel} = props
    const handleCancel = ()=>
    {
        onCancel();
    }
    const handleEscBtn =(e)=>
    {
        if(e.keyCode ==27)
        {
            alert("ESC")
            // onCancel();
        }
    }
  return (
    <div className='ModalCustom' {...props} style={{display:`${show?"block":"none"}`}}>
        <div className="ModalContainer" onClick={handleCancel} onKeyUp={(e)=>handleEscBtn(e)}>
        
        </div>
        <div className="ModalCustomContent">
            <CloseOutlined className='iconClose' onClick={handleCancel}/>
            {children}
        </div>
    </div>
  )
}

export default ModalCustom