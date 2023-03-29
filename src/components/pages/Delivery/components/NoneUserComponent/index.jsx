import React from 'react'
import { InputText } from '~/components/commomComponents/InputText'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect,useMemo } from 'react'
import  GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import ThanhToanSlice,{AddressInfo,ChangeValueField} from '~/redux/slices/ThanhToanSlice'
import "./NoneUserComponent.scss"
import { useState } from 'react'
const NoneUserInfo = (props) => {
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const {GuessInfo,setGuessInfo,setWrong} =props

    const dispatch = useDispatch();
    useEffect(()=>
    {
      dispatch(GiaoHangNhanhApi.fetchGetProvinces())
    },[])
    const getDistricts =(e)=>
    {
        console.log({event:e.target.value})
        if(e.target.value == null)
        {
        
        }
        else
        {
          setGuessInfo({...GuessInfo,ProvinceID:e.target.value,ProvinceName:e.target.options[e.target.selectedIndex].text})
          dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
        }
    }
    const getWards =(e)=>
    {
      if(e.target.value == null)
      {
        
      }
      else
      {
        
        setGuessInfo({...GuessInfo,DistrictID:e.target.value,DistrictName:e.target.options[e.target.selectedIndex].text})
        dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))
      }
    }
    const CalFee =(e)=>
    {
      if(e.target.value == null)
      {
       
        return ;
      }
      else
      {
   
        setGuessInfo({...GuessInfo,WardId:e.target.value,WardName:e.target.options[e.target.selectedIndex].text})
        dispatch(GiaoHangNhanhApi.fetchPostCalFee({
          "from_district_id":1572,
          "service_type_id":2,
          "to_district_id":Wards.data[0].DistrictID,
          "to_ward_code":e.target.value,
          "height":50,
          "length":20,
          "weight":200,
          "width":20,
          "insurance_value":totalPrice,
          "coupon": null
        }))
        
      }
        
      
      
    }
    const handleOnChangeInfo=(e,key)=>
    {
      setGuessInfo({...GuessInfo,[key]:e});
    }

    const handleChangeDsc =(e)=>
    {
      setGuessInfo({...GuessInfo,AddressDsc:e})
    }
    const handlePost=()=>
    {

    }
  return (
   <div className="NoneUserInfo">
        <h1>THÔNG TIN GIAO HÀNG</h1>
        <div className="InfoGuessName" >
        <InputText maxLength={50} setWrong={setWrong} value={GuessInfo.Name} label="Tên"onChange={(e)=>handleOnChangeInfo(e,"Name")}></InputText>
        </div>
        <div  style={{margin:"0 -1rem"}}>
        <InputText onChange={(e)=>handleChangeDsc(e)} setWrong={setWrong}  value={GuessInfo.AddressDsc} label="Chi tiết địa chỉ (Số nhà, tên đường,...)"></InputText>
        <InputText setWrong={setWrong} maxLength={10} onChange={(e)=>handleOnChangeInfo(e,"Phone")} type="phone" value={GuessInfo.Phone}  label="Số điện thoại"></InputText>
        <InputText type="email" setWrong={setWrong} maxLength={50} onChange={(e)=>handleOnChangeInfo(e,"Email")}  value={GuessInfo.Email}  label="Email"></InputText>
        </div>
        <div  className="InfoAddress" >
        <SelectInput  loading={Loading.Provinces} name="province" defaultLabel="Tỉnh/Thành phố" onChange={e=>getDistricts(e)}>
        <option value={""}>Vui lòng chọn Tỉnh/Thành phố</option>
          {Provinces.data&&Provinces.data.map(item=>{
            return <option  key ={item.ProvinceID}value={item.ProvinceID}>{item.ProvinceName}</option>
          })}
        </SelectInput>
        <SelectInput loading={Loading.Districts} name="district" defaultLabel="Quận/Huyện" onChange={e=>getWards(e)}>
        <option value={""}>Vui lòng chọn Quận/Huyện</option>
          {Districts.data&& Districts?.data?.map(item=>{
            return <option key ={item.DistrictId} value={item.DistrictID}>{item.DistrictName}</option>
          })}
        </SelectInput>
        <SelectInput  loading={Loading.Wards} onChange={(e)=>CalFee(e)} defaultLabel="Xã/Phường" name="ward">
        <option value={""}>Vui lòng chọn Xã/Phường</option>
        {Wards.data&& Wards?.data?.map(item=>{
            return <option value={item.WardCode}>{item.WardName}</option>
          })}
        </SelectInput>
        {/* <InputText></InputText> */}
        </div>
   </div>
  )
}

export default NoneUserInfo