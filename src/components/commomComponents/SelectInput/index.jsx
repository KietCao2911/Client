import React from 'react'
import "./SelectInput.scss"
import { Spin } from 'antd';
import CustomSpin from '~/components/CustomSpin';
export const SelectInput = (props) => {
  const {onChange,defaultValue,options,children,name,loading=false}= props;
  return (
    <div className='SelectInput'>
        <select value={defaultValue} defaultValue={defaultValue||null} name={name} onChange={onChange} {...props} >
          {children}
        </select>
        <div className="loading">
           {loading&&<CustomSpin/>} 
        </div>
    </div>
  )
}
