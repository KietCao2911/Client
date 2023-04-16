import { DeleteOutlined } from '@ant-design/icons'
import { Checkbox, Col, notification, Row, Select } from 'antd'
import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '~/components/commomComponents/Button'
import "./ItemVersion.scss"

import { v4 } from 'uuid'
import { memo } from 'react'
import { Trash2 } from 'react-feather'
const {Option} = Select
const ItemVersion = (props) => {
  const {versions,branchs,setVersions, index,initValues,sizes,colors,soLuongTon,giaVon,giaBanSi,giaBanLe,tenSanPham,giaNhap} = props;
  const [checked,setChecked] = useState([]);
  console.log({ItemBranchs:branchs});
  const handleDeleteItem =()=>
  {
    versions.splice(index,1);
    setVersions([...versions])
  }
  const onChangeSelect=(e)=>
  {
    if(e!=null)
    {
      if(versions[index].length>0)
    {
      let res =versions[index].map(item=>{
        if(item.tenSanPham)
        {
          let splitArr = item.tenSanPham.split("-");
          splitArr[0]=tenSanPham;
          splitArr[1] = e;
          let tenSanPhamTemp = splitArr.join("-")
           return {
          ...item,
          IDColor:e,
          tenSanPham:tenSanPhamTemp
        }
        }
        else
        {
          return {
            ...item,
            IDColor:e,
            tenSanPham:null
          }
        }
       
      })
      versions[index]=res;
      setVersions([...versions])
    }
    }
    else
    {
      versions[index]=  [{IDColor:null,tenSanPham:null}]
      setVersions([...versions])
      setChecked([])
    }
  }
  const onChangeCheckbox=(e)=>
  {
    setChecked(e)
    if(e&&e.length>0)
    {
        let khohangsTemp = [];
        khohangsTemp = branchs.map(branch=>
          {
            return {
              soLuongTon,
              giaBanLe,
              giaBanSi,
              giaVon,
              giaNhap,
              maChiNhanh:branch.maChiNhanh
            }
          })
          console.log({versions});
        let temp = e.map(item=>{
          return {
            IDColor:versions[index][0].IDColor,
            IDSize:item,
            soLuongTon:soLuongTon||0,
            giaBanLe:giaBanLe||0,
            giaBanSi:giaBanSi||0,
            giaVon:giaVon||0,
            giaNhap:giaNhap||0,
            tenSanPham:tenSanPham+"-"+versions[index][0].IDColor+"-"+item,
            khohangs:khohangsTemp
          }
        })
        versions[index]=  temp;
        setVersions([...versions])
      
    }
    else
    {
      versions[index]=  [{IDColor:null}]
      setVersions([...versions])
    }
  }
  return (
    <Col xl={24}>
        <Row className='ItemVersion' justify={"space-between"} align={"middle"} gutter={20}>
        <Col xl={8}>
          <Select defaultValue={versions[index][0].IDColor} value={versions[index][0].IDColor} onChange={(e)=>onChangeSelect(e)} style={{ width: "100%" }}>
                <Option value={null}>Chọn màu sác</Option>
                {colors&&colors.map(color=><Option value={color.maMau.trim()}>{color.tenMau}</Option>)}
          </Select>
        </Col>
        <Col xl={8}>
          <Checkbox.Group  value={checked} onChange={onChangeCheckbox}>
          <Row>
      {sizes&&sizes.map(size=><Col key={v4()} span={8}>
        <Checkbox value={size.value}>{size.label}</Checkbox>
      </Col>)}
      
    </Row>
          </Checkbox.Group>
        </Col>
        <Col xl={8}>
          <Trash2 className='icon deteleHover' onClick={handleDeleteItem}></Trash2>
        </Col>
    </Row>
        </Col>
  )
}

export default memo(ItemVersion)