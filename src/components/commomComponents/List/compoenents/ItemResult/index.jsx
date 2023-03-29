import convertVND from "~/components/utils/ConvertVND";
import "./ItemResult.scss"
export const ItemResult=(props)=>
{
    const {value,onItemClick,labelProps} = props;
    const {name,qty,price,code,img} = labelProps;
    console.log({img})
  return <div className="itemResult" onClick={()=>onItemClick(value)}>
    
    <div className="productInfo" >
      <img src={`${img?img:"https://cdn-icons-png.flaticon.com/512/190/190738.png?w=740&t=st=1676038148~exp=1676038748~hmac=c9f2774614d0db02e3915cdc07d069c603a606707367295f8f8f4436c5b7bdf3"}`} alt="" />
      <div className="info">
        <div className="tenSanPham">{name||""}</div>
        <div className="maSanPham">{code||""}</div>
      </div>
    </div>
    <div className="productQty">
      <div className="giaNhap"> {price?convertVND(price):null} </div>
      <div className="soLuongTon">{qty||0}</div>
    </div>
  </div>
}

export default ItemResult