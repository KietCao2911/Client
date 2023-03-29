import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputText from '~/components/commomComponents/InputText'
import ModalCustom from '~/components/commomComponents/ModalCustom'
import ItemSearchResult from './components/ItemSearchResult'
import * as SanPhamAPI from '~/redux/slices/SanPham'
import { Modal } from 'antd'
import { v4 } from 'uuid'
const  SearchResult = (props) => {
  const {setVisible,visible} = props;
  const [searchText,setSearchText] = useState('');
  const [wrong,setWrong] = useState(false)
  const dispatch = useDispatch();
  const {searchResult,loading} = useSelector(state=>state.SanPham);
  const {searchLoading} = loading;
  console.log({visible})
  const handleSearch =(e)=>
  {

    if(e)
    {
      dispatch(SanPhamAPI.SearchProducts({s:e.target.value}))
    }
    setSearchText(e.target.value);
  }
  return (
    <Modal okButtonProps={
      {style:{display:"none"}}
    } 
    cancelButtonProps={
      {style:{display:"none"}}
    }
    onCancel={()=>setVisible(false)}
    visible={visible}
    >
    <InputText  value={searchText} onChange={handleSearch} label="Tìm kiếm" loading={searchLoading}></InputText>
    <div className="SearchResult">
        {searchResult&&searchResult?.length>0&&searchResult.map(item=> <ItemSearchResult key={v4()} data={item}/>)}
  
    </div>
  </Modal>
  )
}

export default SearchResult