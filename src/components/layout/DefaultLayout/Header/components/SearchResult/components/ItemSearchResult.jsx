import React from 'react'
import { Link } from 'react-router-dom'
import convertVND from '~/components/utils/ConvertVND'
import "./ItemSearchResult.scss"
const ItemSearchResult = (props) => {
  const {key,data} = props;
  const {maSanPham,tenSanPham,giaBan,color,boSuuTap,slug} = data;
  return (
    <Link to={`/san-pham/${slug}`} className='ItemSearchResult' key={key}>
      <div className="Item">
        <img src={`${color[0]?.hinhAnhInfo[0]?.url||''}`} alt="" />
          <div className="content">
            <div className="bts">{boSuuTap.value&&boSuuTap.value}</div>
            <div className="name">{tenSanPham}</div>
            <div className="price">{convertVND(giaBan)}</div>
          </div>
      </div>
    </Link>
  )
}

export default ItemSearchResult