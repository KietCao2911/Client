import { Input, Select, Table } from 'antd'
import React, { memo } from 'react'
import { Delete, Trash } from 'react-feather';
import { v4 } from 'uuid';
import convertVND from '~/components/utils/ConvertVND';



const TableProductKN = (props) => {
    const {source,isEdit,form} = props;
    const columns=[ {
        title: "Mã SKU",
        render: (_, record) => {
          console.log({record})
          return <a>{record?.maSanPham}</a>;
        },
      },
      {
        title: "Tên sản phẩm",
        render: (_, record) => {
          return <p>{record?.sanPhamNavigation?.tenSanPham}</p>;
        },
      },
      {
        title: "Giá bán ",
        render: (_, record) => {
          return <p>{convertVND(record?.sanPhamNavigation?.giaBan||record?.sanPhamNavigation?.giaBanLe)}</p>;
        },
      },
      {
        title: "Giá trị",
        render: (_, record) => {
          return isEdit?<Input  defaultValue={record?.giaTriGiamGia} onBlur={(e)=>onChangeGiaTri(record?.maSanPham||"",e)}  addonAfter={<Select value={record?.kieuGiaTri} onChange={(e)=>onChangeKieuGiaTri(record?.maSanPham||"",e)}>
             <Select.Option value={0}>Phần trăm</Select.Option>
    <Select.Option value={1}>Giá trị</Select.Option>
          </Select>}  type='number'/>:<p>{convertVND(record?.giaTri||0)}</p>
        },
      },
      {
        title: "Thành tiền",
        render: (_, record) => {
          return <p>{convertVND(((record?.sanPhamNavigation?.giaBanLe)-record?.thanhTien)||0)}</p>
        },
      },
      {
        title: "",
        render: (_, record) => {
          return isEdit?<Trash  onClick={()=>onDelete(record?.maSanPham||"")} className='icon'/>:null 
        },
      }
    ]
    const onChangeGiaTri=(key,value)=>
    {
        const arrs = [...source];
        console.log({source})
        const obj = arrs.find(x=>x.maSanPham ==key);
        const vls = value.target.value
        if(obj)
        {
            const index = arrs.indexOf(obj)
            if(index>-1)
            {
                const kieuGiaTri = arrs[index].kieuGiaTri;
                if(kieuGiaTri==1)
                {
                    if((obj?.sanPhamNavigation?.giaBanLe||0) - vls>=0)
                    {
                        
                        arrs[index].giaTriGiamGia =parseInt(vls);
                        arrs[index].thanhTien = (obj?.sanPhamNavigation?.giaBanLe||0) - vls
                    }
                }
                else
                {
                    if(vls>0&&vls<=100)
                    {
                        arrs[index].giaTriGiamGia =vls;
                        arrs[index].thanhTien = (obj?.sanPhamNavigation?.giaBanLe||0) *( vls/100);
                    }
                   
                }
                console.log({arrs});
                form.setFieldValue("chiTietKhuyenMais",[...arrs])
            }
        }
    }
    const onChangeKieuGiaTri=(key,value)=>
    {
        const arrs = [...source];
        const obj = arrs.find(x=>x.maSanPham ==key);
        if(obj)
        {
            const index = arrs.indexOf(obj)
            if(index>-1)
            {
                arrs[index].kieuGiaTri = value;
                form.setFieldValue("chiTietKhuyenMais",[...arrs])
            }
        }
    }
    const onDelete=(key)=>
    {
        const arrs = [...source];
        const obj = arrs.find(x=>x.maSanPham ==key);
        if(obj)
        {
            const index = arrs.indexOf(obj)
            if(index>-1)
            {
               arrs.splice(index,1)
               form.setFieldValue("chiTietKhuyenMais",[...arrs])
            }
        }
    }
  return (
    <Table rowKey={()=>v4()} columns={columns} dataSource={source||[]}/>
  )
}
export default memo(TableProductKN)