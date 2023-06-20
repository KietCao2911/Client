import { Button, Cascader, Col, Modal, Row, Space, Tabs, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCcw, Trash } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import MyButton from "~/components/commomComponents/Button";
import * as DanhMucAPI from "~/redux/slices/DanhMuc";
const Add=({setFieldValue})=>
{
    const { items, itemsArr } = useSelector((state) => state.DanhMuc);
    const { product } = useSelector((state) => state.SanPham);
    const [category,setCategory] = useState([])
    const dispatch= useDispatch()
    const handleSubmit=()=>
    {
        let arr =[]
        category.forEach(cat=>
            {
                 arr.push(...cat)   
            })
            let uniqueObjects = [];

// Lặp qua từng đối tượng trong mảng ban đầu
for (let i = 0; i < arr.length; i++) {
  let isDuplicate = false;

  // Kiểm tra xem đối tượng đã tồn tại trong mảng mới hay chưa
  for (let j = 0; j < uniqueObjects.length; j++) {
    if (arr[i].danhMucId === uniqueObjects[j].danhMucId) {
      isDuplicate = true;
      break;
    }
  }

  // Nếu đối tượng chưa tồn tại, thêm vào mảng mới
  if (!isDuplicate) {
    uniqueObjects.push(arr[i]);
  }
}
if(uniqueObjects.length>0)
{
        dispatch(DanhMucAPI.PostCategoryDetail(uniqueObjects))
}
    }
    const handleCascader = useCallback((arr) => {
        return arr?.map((item) => {
          return {
            label: item.tenDanhMuc,
            value: item.id,
            children: handleCascader(item.children.length > 0 ? item.children : []),
        };
        });
      },[]);
    const handleAddCategory =()=>
    {
      let params =[]
      setCategory([...category,params])
    }
    const handleChangeCascader =(e,index)=>
    {
      const temp = e.map(item=>
          {
              return {
                  danhMucId: item,
                  maSanPham: product.maSanPham,
              }
          })
          category[index] = [...temp]        
    }
    return<>
        <Row gutter={[10,10]}>
        {category.map((cat,index)=> <Col span={24}>

<Cascader
                
                onChange={(e) => handleChangeCascader(e,index)}
                options={handleCascader([...items] || [])}
                ></Cascader>
</Col>)}
<Space>
<MyButton onClick={handleAddCategory}>Gắn thêm danh mục</MyButton>
<MyButton onClick={handleSubmit}>Xác nhận</MyButton>
</Space>
<span className="error">Lưu ý: không thể chọn trùng danh mục, vui lòng xóa danh mục và chọn lại nếu chọn sai hoặc cần cập nhật lại</span>
        </Row>
    </>
}
const List=()=>
{
    const { Category_Products ,items, itemsArr} = useSelector((state) => state.DanhMuc);
    const { product} = useSelector((state) => state.SanPham);
    const dispatch=useDispatch();
    const handleCascader = useCallback((arr) => {
        return arr?.map((item) => {
          return {
            label: item.tenDanhMuc,
            value: item.id,
            children: handleCascader(item.children.length > 0 ? item.children : []),
        };
        });
      },[]);
    const handleRenderDefaultCascader=(root)=>
    {
        return Category_Products.filter(({ idDanhMucNavigation})=> idDanhMucNavigation.parentCategoryID==root).map(parent=>
          {
              return{

              ...parent,
              key:v4(),
              children:handleRenderDefaultCascader(parent.danhMucId)
            }
          })
      
    }
    const handleDelete=(DanhMucID,MaSP)=>
    {
      console.log({DanhMucID,MaSP})
      dispatch(DanhMucAPI.DeleteCategoryDetail({idDM:DanhMucID,idSP:MaSP}))
    }
   return <Row gutter={[10,10]}>
    <RefreshCcw className="icon" onClick={()=>dispatch(DanhMucAPI.GetCategoryDetailByProduct(product.maSanPham))}/>
    {handleRenderDefaultCascader(-1).map((cat,index)=>
        {
            return  cat.children.map(child=>
                {
                    return         <Col span={24}>

                  <Space>
                  <Cascader
                    disabled
                                    defaultValue={
                                      [cat?.danhMucId??null,child?.danhMucId??null,child?.children[0]?.danhMucId??null]
                                    }
                                    // onChange={(e) => handleChangeCascader(e,index)}
                                    options={handleCascader([...items] || [])}
                                    ></Cascader>
                  <Trash onClick={()=>handleDelete(cat?.danhMucId,product.maSanPham)} className="icon"/>
                  </Space>
                    </Col>
                })
            
        })}
</Row>
}
const AddCategoryDetail =(props)=>
{
    const { items, itemsArr } = useSelector((state) => state.DanhMuc);
    const { product } = useSelector((state) => state.SanPham);
    const { Category_Products } = useSelector((state) => state.DanhMuc);
    const [category,setCategory] = useState([]);
    const {setFieldValue,isEdit} = props;
    const [openModal,setOpenModal] = useState(false);
    const dispatch =useDispatch();
    const handleCascader = useCallback((arr) => {
        return arr?.map((item) => {
          return {
            label: item.tenDanhMuc,
            value: item.id,
            children: handleCascader(item.children.length > 0 ? item.children : []),
        };
        });
      },[]);
      const handleChangeCascader =(e,index)=>
      {
        const temp = e.map(item=>
            {
                return {
                    danhMucId: item,
                    maSanPham: product.maSanPham,
                }
            })
            category[index] = [...temp]        
      }
      const handleAddCategory =()=>
      {
        let params =[]
        setCategory([...category,params])
      }
      useEffect(()=>
      {
        dispatch(DanhMucAPI.GetCategoryDetailByProduct(product.maSanPham))
      },[])
      const handleRenderDefaultCascader=(root)=>
      {
          return Category_Products.filter(({ idDanhMucNavigation})=> idDanhMucNavigation.parentCategoryID==root).map(parent=>
            {
                console.log({parent})
                return{
  
                ...parent,
                key:v4(),
                children:handleRenderDefaultCascader(parent.danhMucId)
              }
            })
        
      }
      const reCallCate=useMemo(()=>
      {
        setCategory(handleRenderDefaultCascader(-1))
      },[Category_Products])
    
return<>
<Button disabled={isEdit?false:true} onClick={()=>setOpenModal(true)} >Quản lý danh mục</Button>
<Modal  open={openModal} onCancel={()=>setOpenModal(false)}>
      <Tabs items={[ {
    key: v4(),
    label: `Danh sách danh mục`,
    children: <List/>,
  },
  {
    key: v4(),
    label: `Thêm danh mục`,
    children: <Add setFieldValue={setFieldValue}/>,
  }]}></Tabs>
  </Modal>
</>
}

export default AddCategoryDetail