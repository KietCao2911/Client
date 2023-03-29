import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getALLSize,getGetQty } from "./KichCoApi";
const initialState = {
  sizes: [],
  loading: false,
  sizeChecked: null,
  Qty:{}
};

export const fetchALLSize = createAsyncThunk("fetchALLSize", async () => {
  const res = await getALLSize();
  return res;
});
export const fetchGetQty = createAsyncThunk("fetchGetQty", async (params) => {
  const {maSanPham,maMau,idSize} = params
  const res = await getGetQty(maSanPham,maMau,idSize);
  return res;
});
const KichCoSlice = createSlice({
  name: "KichCo",
  initialState,
  reducers: {
    checkedSize: (state, action) => {
      let temp = [...state.sizes];
      state.sizeChecked = action.payload;
    },
    fillSizes: (state, action) => {
      state.sizes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchALLSize.fulfilled, (state, action) => {
      state.sizes = action.payload;
    });
    builder.addCase(fetchGetQty.fulfilled,(state,action)=>
    {
      state.Qty = action.payload
    })
  },
});
export const { checkedSize, fillSizes } = KichCoSlice.actions;
export default KichCoSlice;
