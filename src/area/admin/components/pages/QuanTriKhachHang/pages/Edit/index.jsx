import { Form, Input, Space } from 'antd'
import React,{useEffect,useState} from 'react'
import { SelectInput } from '~/components/commomComponents/SelectInput'
import GioHangSlice,* as GiaoHangNhanhApi from '~/redux/slices/GioHang/GioHangSlice'
import * as KhachHangAPI from '~/redux/slices/KhachHang/KhachHangSlice'
import { useDispatch,useSelector } from 'react-redux'
import MyButton from '~/components/commomComponents/Button'
import { useParams } from 'react-router-dom'
import { useForm } from 'antd/lib/form/Form'
const EditKhacHang = () => {
    const [Guess,setGuess] = useState({})
    const {ghnAPI,totalPrice} = useSelector(state=>state.GioHang);
    const {Provinces,Districts,Wards,FeeInfo,DistrictID,Loading} = ghnAPI;
    const {item} = useSelector(state=>state.KhachHang)
    const {id} = useParams();
    const dispatch = useDispatch()
    const [form] = useForm()
    useEffect(()=>
    {
        const fetch=async()=>
        {
            const res = await  dispatch(KhachHangAPI.fetchGetKhachHang({id:id}));
            const {provinceID,districtID,wardID,name,phone,email} = res.payload
            form.setFieldsValue({name,phone,email})
            setGuess({...res.payload})
            if(provinceID&&districtID&&wardID)
            {
                console.log({provinceID,districtID,wardID} )
                dispatch(GiaoHangNhanhApi.fetchGetDistrict(provinceID))
                dispatch(GiaoHangNhanhApi.fetchGetWard(districtID))
            }
        }
        fetch()
      dispatch(GiaoHangNhanhApi.fetchGetProvinces())
    },[])
    const handleChangeProvince=(e)=>
    {
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuess({...Guess,provinceID:e.target.value,provinceName:e.target.options[e.target.selectedIndex].text})
        dispatch(GiaoHangNhanhApi.fetchGetDistrict(e.target.value))
      }
    }
    const handleChangeDistrict=(e)=>
    {
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuess({...Guess,districtID:e.target.value,districtName:e.target.options[e.target.selectedIndex].text})

        dispatch(GiaoHangNhanhApi.fetchGetWard(e.target.value))
      }
    }
    const handleChangeWard=(e)=>{
      if(e.target.value == null)
      {
        return;
      }
      else
      {
        setGuess({...Guess,wardID:e.target.value,wardName:e.target.options[e.target.selectedIndex].text})

        // setGuessInfo({...GuessInfo,WardId:e.target.value,WardName:e.target.options[e.target.selectedIndex].text})
      }
    }
    const handleSave=()=>
    {
        const name = form.getFieldValue("name")
        const phone = form.getFieldValue("phone")
        const email = form.getFieldValue("email")
        const address = Guess;
        address.name=name;
        address.phone=phone;
        address.email=email;

        dispatch(KhachHangAPI.fetchPutKhachHang({id:address.id,body:address}))

    }
  return (
    <Form  form={form}layout='vertical' >
      <Form.Item label="Tên khách hàng" name="name" >
        <Input  value={Guess.name}/>
      </Form.Item>
      <Form.Item label="Số điện thoại" name="phone">
        <Input/>
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input/>
      </Form.Item>
      <SelectInput value={Guess.provinceID}  name="province" defaultLabel="Tỉnh/Thành phố"  onChange={(e)=>handleChangeProvince(e)}>
        <option value={"province"}>Vui lòng chọn Tỉnh/Thành phố</option>
          {Provinces.data&&Provinces.data.map(item=>{
            return <option  key ={item.ProvinceID}value={item.ProvinceID}>{item.ProvinceName}</option>
          })}
        </SelectInput>
        <SelectInput value={Guess.districtID} name="district" defaultLabel="Quận/Huyện" onChange={(e)=>handleChangeDistrict(e)}>
        <option value={""}>Vui lòng chọn Quận/Huyện</option>
          {Districts.data&& Districts?.data?.map(item=>{
            return <option key ={item.DistrictId} value={item.DistrictID}>{item.DistrictName}</option>
          })}
        </SelectInput> 
         <SelectInput  onChange={(e)=>handleChangeWard(e)} value={Guess.wardID} defaultLabel="Xã/Phường" name="ward">
        <option value={""}>Vui lòng chọn Xã/Phường</option>
        {Wards.data&& Wards?.data?.map(item=>{
            return <option value={item.WardCode}>{item.WardName}</option>
          })}
        </SelectInput>
        <MyButton onClick={handleSave}>Lưu</MyButton>
    </Form>
  )
}

export default EditKhacHang