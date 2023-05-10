import { Input, Space, Table } from "antd";
import { useState, useTransition } from "react";
import { Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import List from "~/components/commomComponents/List";
import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
import { BASE_URL } from "~/const";
import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
const BuyXGiveX=(props)=>
{
    const {CouponForm,index} = props;
    const [searchTextX,setSearchTextX] = useState("");
    const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
    const [isPending, startTransition] = useTransition();   
    const dispatch = useDispatch();
    let columnsX=[{
        title:"Mã sản phẩm",
        render:(_,record)=>
        {
            return <p>{record?.maSanPhamX}</p>
        }
    },
    {
        title:"Tên sản phẩm",
        render:(_,record)=>
        {
            return <p>{record?.tenSanPham}</p>
        }
    },
    {
        render:(_,record)=>
        {
            return <img style={{width:"10rem",height:"10rem"}} src={record?.imgX} alt="" />
        }
    },
    {
        render:(_,record)=>
        {
            return <Trash2 onClick={()=>onClickDeleteX(record?.maSanPhamX)} className="icon deleteHover"/>
        }
    }
]
    const onChangeSearchX =(e)=>
{
    startTransition(() => {
        setSearchTextX(e.target.value);
        dispatch(
          KhoHangAPI.fetchGetProducts({
            maChiNhanh:CouponForm.values?.maChiNhanh,
             s: e.target.value ,
             onlyVersion:true,
          })
        );
      });
}
    const onClickDeleteX =(maSanPhamX)=>
    {
        let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
        const obj = chiTietCoupon.find(x=>x.maSanPhamX.trim()==maSanPhamX.trim());
        chiTietCoupon[index].maSanPhamX=""
        chiTietCoupon[index].maSanPhamY=""
        CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
    }
    const onClickProductX=(product,urlImg)=>{
        let chiTietCoupon = [...CouponForm.values.chiTietCoupons]
        let check  =(chiTietCoupon.length>0? chiTietCoupon?.some(x=>x.maSanPhamX.trim()==product.maSanPham.trim()):false)
        if(product.soLuongTon<=0)
        {
          alert("Sản phẩm này đã hết hàng")
          return ;
        }
        if(check)
        {
          alert("Sản phẩm này đã được thêm")
          return ;

        }
        const params = 
        {imgY:urlImg,maSanPhamY:product.maSanPham,imgX:urlImg,maSanPhamX:product.maSanPham,tenSanPham:product?.sanPhamNavigation?.tenSanPham}
        chiTietCoupon[index] = {...params};
        CouponForm.setFieldValue("chiTietCoupons",chiTietCoupon);
}
    return <Space style={{width:"100%"}} direction="vertical">
    <Input 
     value={searchTextX}
     onChange={(e) => onChangeSearchX(e)}
    placeholder="Tìm kiểm sản phẩm tặng"/>
    <List>
    {searchTextX &&
                  sanPhamTrongKho.length > 0 &&
                  sanPhamTrongKho.map((item) => {
                    const productInfo = item.sanPhamNavigation;
                    const url =
                      BASE_URL +
                        "wwwroot/res/SanPhamRes/Imgs/" +
                        productInfo?.parentID?.trim() +
                        "/" +
                        productInfo?.idColor?.trim() +
                        "/" +
                        productInfo?.chiTietHinhAnhs[0]?.idHinhAnhNavigation?.fileName?.trim() ||
                      "";
                    return (
                      <ItemResult
                        value={productInfo}
                        onItemClick={(productInfo) =>
                          onClickProductX(item,url)
                        }
                        labelProps={{
                          img: url,
                          name: productInfo.tenSanPham,
                          code: productInfo.maSanPham,
                          price: productInfo.giaNhap,
                          qty: item.soLuongTon,
                        }}
                      />
                    );
                  })}
    </List>
    {CouponForm.values.chiTietCoupons[index].maSanPhamX && <Table columns={columnsX} dataSource={[CouponForm.values.chiTietCoupons[index]]}/>}
</Space>
}

export default BuyXGiveX