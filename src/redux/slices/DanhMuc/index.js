import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as request from "./DanhMucApi";
import { notification } from "antd";
import { v4 } from "uuid";
const initialState = {
  items: [],
  item: {},
  itemsArr: [],
  Category_Products:[],
  loading: false,
};
export const fetchCategoryAllUI = createAsyncThunk(
  "DanhMuc/fetchCategoryAllUI",
  async () => {
    const res = await request.GetAllDanhMucForUI();
    return res;
  }
);
export const fetchCategoryDelete = createAsyncThunk(
  "DanhMuc/fetchCategoryDelete",
  async (id) => {
    const res = await request.DeleteCategory(id);
    return res;
  }
);
export const fetchCategoryUpdate = createAsyncThunk(
  "DanhMuc/fetchCategoryUpdate",
  async (params) => {
    const { id, body } = params;
    console.log({ id, body });
    const res = await request.UpdateCategory(id, body);
    return res;
  }
);
export const fetchCategoryGetById = createAsyncThunk(
  "DanhMuc/fetchCategoryGetById",
  async (id) => {
    const res = await request.GetCatById(id);
    return res;
  }
);
export const fetchCategoryAdd = createAsyncThunk(
  "DanhMuc/fetchCategoryAdd",
  async (params) => {
    const res = await request.PostCategory(params);
    return res;
  }
);
export const fetchCategoryAll = createAsyncThunk(
  "DanhMuc/fetchCategoryAll",
  async (params) => {
    const res = await request.GetAllDanhMuc({params});
    return res;
  }
);
export const fetchGetCategoryByParentId = createAsyncThunk(
  "DanhMuc/fetchGetCategoryByParentId",
  async (params) => {
    const { id } = params;
    const res = await request.GetCategoryByParentId(id);
    return res;
  }
);
export const GetCategoryDetailByProduct =createAsyncThunk("DanhMuc/GetCategoryDetailByProduct",async(maSP)=>
{
  const res = await request.GetDanhMucByProduct(maSP)
  return res;
})
export const PostCategoryDetail=createAsyncThunk("DanhMuc/PostCategoryDetail",async(body)=>
{
  const res = await request.PostCategoryDetail(body);
  return res;
})
export const DeleteCategoryDetail = createAsyncThunk("DanhMuc/DeleteCategoryDetail",async(params)=>
{
  const {idDM,idSP} = params
  const res = await request.DeleteCategoryDetail(idDM,idSP);
  return res;
})
const DanhMucSlice = createSlice({
  name: "DanhMuc",
  initialState,
  extraReducers: (builder) => {
    //DeleteCategoryDetail
    builder.addCase(DeleteCategoryDetail.pending,(state,action)=>
    {
      state.loading=true;
    })
    builder.addCase(DeleteCategoryDetail.fulfilled,(state,action)=>
    {
      state.loading=true;
    })
    builder.addCase(DeleteCategoryDetail.rejected,(state,action)=>
    {
      state.loading=true;
    })
    //PostCategoryDetail
    builder.addCase(PostCategoryDetail.pending,(state,action)=>
    {
      state.loading=true;
    })
    builder.addCase(PostCategoryDetail.fulfilled,(state,action)=>
    {
      // state.Category_Products = action.payload;
      state.loading=false;
    })
    builder.addCase(PostCategoryDetail.rejected,(state,action)=>
    {
      state.loading=false;
    })
    //DeleteCategoryDetail
    //GetCategoryDetailByProduct
    builder.addCase(GetCategoryDetailByProduct.pending, (state, action) => {
      state.loading=true;
      });
      builder.addCase(GetCategoryDetailByProduct.fulfilled, (state, action) => {
        state.Category_Products = action.payload;
        state.loading=false;
        });
        builder.addCase(GetCategoryDetailByProduct.rejected, (state, action) => {
          
          state.loading=false;
          });
    //fetchCategoryAdd
    builder.addCase(fetchCategoryAdd.pending, (state, action) => {
    state.loading=true;
    });
    builder.addCase(fetchCategoryAdd.fulfilled, (state, action) => {
      const body = action.payload;
      console.log({body})
      if(body.parentCategoryID==-1)
      {
        state.items = [...state.items,action.payload]
      }
      
      notification.open({
        message: "Thêm thành công!",
        type: "success",
      });
      state.loading=false;
    });
    builder.addCase(fetchCategoryAdd.rejected, (state) => {
      notification.open({
        message: "Có lỗi xảy ra",
        type: "error",
      });
      state.loading=false;
    });
    builder.addCase(fetchCategoryGetById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryGetById.fulfilled, (state, action) => {
      state.loading = false;
      state.item = action.payload;
    });
    builder.addCase(fetchCategoryAll.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAll.fulfilled, (state, action) => {
      
      const arg = action.meta.arg;
      if(arg?.order&&arg.order=="most-view")
      {
        state.itemsArr = action.payload;
      }
      else
      {
        const cecurseUI=(arr,root)=>
        {
         
          return arr.filter(({parentCategoryID})=>parentCategoryID==root).map(parent=>
            {
              return{
  
                ...parent,
                key:v4(),
                children:cecurseUI(arr,parent.id)
              }
            })
        }
        state.items = cecurseUI([...action.payload],-1);
      }
 
      state.loading = false;
    });
    builder.addCase(fetchCategoryAll.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCategoryDelete.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCategoryDelete.fulfilled, (state, action) => {
      const body = action.payload;
      if(body.parentCategoryID==-1)
      {
        const category = state.items.find(x=>x.id==body.id);
        if(category)
        {
          const index = state.items.indexOf(category);
          if(index>-1)
          {
            let arr = [...state.items];
            arr.splice(index,1);
            state.items=[...arr];
          }
        }
      }
      else
      {
       
      }
      notification.open({
        message: "Xóa thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryDelete.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
        type: "error",
      });
    });
    //fetchCategoryUpdate
    builder.addCase(fetchCategoryUpdate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryUpdate.fulfilled, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchCategoryUpdate.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thất bại!",
        type: "error",
      });
    });
    //fetchGetCategoryByParentId
    builder.addCase(fetchGetCategoryByParentId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetCategoryByParentId.fulfilled, (state, action) => {
      state.loading = false;
      state.itemsArr = action.payload;
    });
  },
});
export default DanhMucSlice;
