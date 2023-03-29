import React,{useState} from 'react'
import "./Search.scss"
import { EditOutlined,DeleteOutlined, SaveOutlined, CheckCircleFilled, CheckCircleOutlined, SearchOutlined, FileAddOutlined, AndroidFilled, FileAddFilled } from '@ant-design/icons'
import * as PhieuNhapAPI from '~/redux/slices/PhieuNhap/PhieuNhap'
import { useDispatch,useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { BASE_URL } from '~/const'
import MyButton from '~/components/commomComponents/Button'
const Item=(props)=>
{
  const dispatch = useDispatch();
    const {item,maPN} = props;
    const handlePushItem = ()=>
    {
      console.log({item})
        const PN  = maPN.split("N");
      dispatch(PhieuNhapAPI.fetchPostCTPN({body:{maSP:item.maSanPham,IDPN:PN[1]}}))
    }
return  (<div className="ResultItem" key={v4()}>
            {item!=null?(  <> <div className="content">
   <img src={`${BASE_URL}\wwwroot\\res\\SanPhamRes\\Imgs\\${item.maSanPham.trim()}\\${item.chiTietHinhAnhs[0].idMaMau.trim()}\\${item.chiTietHinhAnhs[0].idHinhAnhNavigation.fileName.trim()}`} alt="" />
   <div className="tenSanPham">{`${"#"+item.maSanPham} ${item.tenSanPham}`}</div>
   </div>
   <div className="actions">
      <MyButton> <FileAddFilled onClick={handlePushItem}/></MyButton>
   </div></>):null}
 </div>)
}

const SearchProducts = ({maPN}) => {
    const [searchText,setSearchText] = useState('')
    const {searchItems} = useSelector(state=>state.PhieuNhap)
    const dispatch = useDispatch()
    const handleSearch=(e)=>
    {
        dispatch(PhieuNhapAPI.fetchSearch({s:e.target.value}))
        setSearchText(e.target.value)
    }
  
  return (
    <div className="searchProduct">
          <input value={searchText} type="text" placeholder='Nhập tên sản phẩm hoặc mã sản phẩm' onChange={(e)=>handleSearch(e)}/>
          <div className="GroupIcons">
          <SearchOutlined className='SearchIcon' onClick={handleSearch}/>
          <FileAddOutlined className='FileAddIcon' />
          </div>
          <div className="SearchResult">
            {searchItems.length>0?searchItems.map(item=><Item item={item} maPN={maPN}/>):null}
          </div>
        </div>
  )
}

export default SearchProducts