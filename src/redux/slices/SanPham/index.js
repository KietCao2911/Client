import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import convertVND from "~/components/utils/ConvertVND";
import * as Api from "./SanPhamApi";
import * as UserSanPhamAPI from "./Users/SanPhamAPI";
import handleUserProduct from "./Users/index";
import {
  fetchGetAllProductsUser,
  fetchGetProductUser,
  fetchQTY,
} from "./Users/index";
import { BASE_URL } from "~/const";
import GroupBy from "~/components/utils/GroupBy";
import URLConvert from "~/components/utils/URLConvert";
const initialState = {
  ctnxs:[],
  qtyInfo: {},
  products: [],
  deleteState: false,
  UpdateState: false,
  product: {},
  searchResult: [],
  productsHot: [],
  productsLatest: [],
  trendingsProduct: [],
  loading: false,
  saleProducts:[],
  totalRow: 0,
  state: -1,
};

///ADMIN
export const fetchGetCTNXs = createAsyncThunk(
  "fetchGetCTNXs",
  async (props) => {
    const { maSanPham } = props;
    const res = await Api.GetCTNXs(maSanPham);
    return res;
  }
);

export const fetchGetAllProducts = createAsyncThunk(
  "fetchGetAllProducts",
  async (props) => {
    const { params } = props;
    const res = await Api.GetAllProducts(props);
    return res;
  }
);
export const fetchGetProduct = createAsyncThunk(
  "fetchGetProduct",
  async (params) => {
    const { maSanPham } = params;
    const res = await Api.GetProductById(maSanPham);
    return res;
  }
);
export const fetchPostProduct = createAsyncThunk(
  "fetchPostProduct",
  async (params, { rejectWithValue }) => {
    const { body } = params;
    try {
      const res = await Api.PostProduct(body);
      return res;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchPutProduct = createAsyncThunk(
  "fetchPutProduct",
  async (params) => {
    const { body } = params;
    const res = await Api.PutProduct(body);
    return res;
  }
);
export const fetchDeleteProduct = createAsyncThunk(
  "fetchDeleteProduct",
  async (params) => {
    const { id } = params;
    const res = await Api.DeleteProduct(id);
    return res;
  }
);
export const fetchGetLatestProducts = createAsyncThunk(
  "fetchGetLatestProducts",
  async () => {
    const res = await Api.GetAllLatestProducts();
    return res;
  }
);
export const fetchPostAddQty = createAsyncThunk(
  "fetchPostUpdateQty",
  async (params) => {
    const { body } = params;
    const res = await Api.PostAddQty(body);
    return res;
  }
);
export const fetchDeleteAddQty = createAsyncThunk(
  "fetchDeleteAddQty",
  async (params) => {
    const { id } = params;
    const res = await Api.DeleteQty(id);
    return res;
  }
);
export const UploadFile = createAsyncThunk("UploadFile", async (params) => {
  const { maSP, maMau, body, config } = params;

  const res = await Api.Uploads(maSP, maMau, body, config);
  return res;
});
export const DeleteFile = createAsyncThunk("DeleteFile", async (params) => {
  const { fileName, _id, maSP, maMau } = params;
  const res = await Api.DeleteImg(fileName, _id, maSP, maMau);
  return res;
});
export const UpdateCategory = createAsyncThunk(
  "UpdateCategory",
  async (params) => {
    const { maSP, body } = params;
    const res = await Api.PutCategoryProduct(maSP, body);
    return res;
  }
);
export const GetHotProducts = createAsyncThunk("GetHotProducts", async () => {
  const res = await Api.HotProducts();
  return res;
});
export const SearchProducts = createAsyncThunk(
  "SearchProducts",
  async (params) => {
    const res = await Api.SearchProducts({ ...params });
    return res;
  }
);
export const PostChildProduct=createAsyncThunk("PostChildProduct",async(body)=>
{
  const res = await Api.PostChildProduct(body)
  return res;
})
export const DeleteChildSanPham = createAsyncThunk("DeleteChildSanPham",async(id)=>
{
  const res=  await Api.DeleteChildSanPham(id)
  return res;
})
const SanPhamSlice = createSlice({
  initialState,
  name: "SanPham",
  reducers: {
    setFieldValue: (state, action) => {
      const { key, value } = action.payload;
      let tempValue = state.product[key];
      tempValue = value;
      state.product[key] = tempValue;
    },
    getImgs: (state, action) => {
      state.loading = true;
      const colorPayload = action.payload.colorID.trim();
      let product = current(state.product);
      let sanPham =
        product.sanPhamNavigation.colorGrouped &&
        product.sanPhamNavigation.colorGrouped.find((x) => {
          const colorID = x[0].idColor;
          return colorID.trim() == colorPayload;
        });
      state.product.productInfoByColor = [...sanPham];
      state.product.sanPhamNavigation.imgsDisplay = [
        ...sanPham[0].chiTietHinhAnhs,
      ];
      state.loading = false;
      state.product.productCurrent = {};
    },
    sizeSelected: (state, action) => {
      const sizePayload = action.payload.size;
      let sizes = current(state.product.productInfoByColor);
      let size = sizes?.find((x) => x.idSize.trim() == sizePayload.trim());
      console.log({ size });
      state.product.productCurrent = { ...size };
    },
  },
  extraReducers: (builder) => {
    //USER HANDLER
    //fetchGetAllProductsUser
    builder.addCase(fetchGetAllProductsUser.pending, (state) => {
      state.products = [];
      state.totalRow = 0;
      state.loading = true;
    });
    builder.addCase(fetchGetAllProductsUser.fulfilled, (state, action) => {
      const props = action.meta.arg;

      state.loading = false;
      const { products, totalRow } = action.payload;
      const productsTemp = [...products];
      productsTemp.forEach((product) => {
        product.sanPhamNavigation.colorGrouped = Object.values(
          GroupBy(product?.sanPhamNavigation?.sanPhams, "idColor")
        );
        const sanPhamConvert =
          Object.values(
            GroupBy(product?.sanPhamNavigation?.sanPhams, "idColor")
          ) || [];
        const URL =
          sanPhamConvert &&
          sanPhamConvert.length > 0 &&
          URLConvert(
            sanPhamConvert[0][0]?.sanPhamNavigation?.chiTietHinhAnhs || [],
            product.maSanPham
          );
        product.sanPhamNavigation.imgsDisplay = URL || [];
      });
      if (props?.params.sort && props?.params.sort == "popular") {
        state.productsHot = [...productsTemp];
      } else if (props?.params.sort && props?.params.sort == "most-view") {
        state.trendingsProduct = state.productsHot = [...productsTemp];
      }
      else if(props?.params.sort && props?.params.sort == "sale")
      {
        state.saleProducts =  [...productsTemp]
      }
      else
      {
        state.productsLatest =  [...productsTemp];
      }
      state.products = [...productsTemp];
      state.totalRow = totalRow;
    });
    //fetchGETQTYUSER
    builder.addCase(fetchQTY.pending, (state) => {
      state.loading = true;
      state.qtyInfo = {};
    });
    builder.addCase(fetchQTY.fulfilled, (state, action) => {
      state.loading = true;
      state.qtyInfo = action.payload;
    });
    //fetchGetProductUser
    builder.addCase(fetchGetProductUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetProductUser.fulfilled, (state, action) => {
      state.product = action.payload.sanPham;

      let productsTemp = [...action.payload.related];
      productsTemp.forEach((product) => {
        product.colorGrouped =
          product?.sanPhams && product?.sanPhams.length > 0
            ? Object.values(GroupBy(product?.sanPhams || [], "idColor"))
            : [];
        const sanPhamConvert =
          Object.values(GroupBy(product.sanPhams, "idColor")) || [];
        const URL =
          sanPhamConvert &&
          sanPhamConvert.length > 0 &&
          URLConvert(
            sanPhamConvert[0][0]?.chiTietHinhAnhs || [],
            product.maSanPham
          );
        product.imgsDisplay = URL || [];
      });
      let Prices = state.product.sanPhamNavigation?.sanPhams.sort(
        (a, b) => a.giaBanLe - b.giaBanLe
      );
      let giaBanDisplay = 0;
      if (Prices[0]?.giaBanLe != (Prices[Prices.length - 1]?.giaBanLe || 0)) {
        giaBanDisplay =
          Prices[Prices.length - 1]?.giaBanLe - Prices[0]?.giaBanLe;
      } else {
        giaBanDisplay = Prices[0]?.giaBanLe || 0;
      }
      const groupedArray = Object.values(
        GroupBy(state.product.sanPhamNavigation.sanPhams, "idColor")
      );
      state.product.related = [...productsTemp];
      state.product.productInfoByColor = groupedArray.length > 0 && [
        ...groupedArray[0],
      ];
      state.product.sanPhamNavigation.colorGrouped = groupedArray.length >
        0 && [...groupedArray];
      state.product.sanPhamNavigation.imgsDisplay = groupedArray.length > 0 && [
        ...(groupedArray[0][0].chiTietHinhAnhs || []),
      ];
      state.product.sanPhamNavigation.giaBanDisplay = giaBanDisplay;
      state.loading = false;
    });
    builder.addCase(fetchGetProductUser.rejected, (state) => {
      state.loading = false;
    });
    //PostChildProduct
    builder.addCase(PostChildProduct.pending,(state)=>
    {
state.loading = true;
    })
    builder.addCase(PostChildProduct.fulfilled,(state,action)=>
    {
      state.product.sanPhams = [...state.product.sanPhams,...action.payload]
      state.loading=false
      window.location.reload();
    })
    builder.addCase(PostChildProduct.rejected,(state)=>
    {
      state.loading=false
    })
    //DeleteChildSanPham
    builder.addCase(DeleteChildSanPham.pending,(state)=>
    {
state.loading = true;
    })
    builder.addCase(DeleteChildSanPham.fulfilled,(state,action)=>
    {
      let SanPhamChild = [...state.product.sanPhams];
      const maSParg = action.meta.arg
      var obj =SanPhamChild.find(x=>x.maSanPham.trim()==maSParg.trim())
      if(obj)
      {
        const index = SanPhamChild.indexOf(obj)
        if(index>-1)
        {
          SanPhamChild.splice(index,1);
          state.product.sanPhams = [...SanPhamChild]
        }
      }
      message.open({
        content:"Đã xóa",
        type:"success"
      })
state.loading = false;
    })
    builder.addCase(DeleteChildSanPham.rejected,(state)=>
    {
state.loading = false;
    })
    //GetCPNXs 
    builder.addCase(fetchGetCTNXs.pending,(state,action)=>{
      state.loading=true;
      state.ctnxs = [];
    })
    builder.addCase(fetchGetCTNXs.fulfilled,(state,action)=>{
      state.ctnxs = action.payload;
      state.loading=false;
    })
    builder.addCase(fetchGetCTNXs.rejected,(state,action)=>{
      state.loading=false;
    })
    //SearchProducts
    builder.addCase(SearchProducts.pending, (state, action) => {
      state.loading.searchLoading = true;
    });
    builder.addCase(SearchProducts.fulfilled, (state, action) => {
      state.loading.searchLoading = false;
      state.searchResult = action.payload.products;
    });
    //GetHotProducts
    builder.addCase(GetHotProducts.fulfilled, (state, action) => {
      state.productsHot = action.payload;
    });
    //DeleteFile
    builder.addCase(DeleteFile.fulfilled, (state, action) => {
      const { fileName, _id, maSP, maMau } = action.meta.arg;
      let product = { ...current(state.product) };

      let ArrayObj = product.colorGrouped.find(
        (x) => x[0]?.idColor?.trim() == maMau?.trim()
      );
      if (ArrayObj) {
        const Arrindex = product.colorGrouped.indexOf(ArrayObj);
        const ObjImg = product.colorGrouped[Arrindex][0].chiTietHinhAnhs.find(
          (x) => x.name.trim() == fileName
        );
        if (ObjImg) {
          const indexImg =
            product.colorGrouped[Arrindex][0].chiTietHinhAnhs?.indexOf(ObjImg);

          let colorGroupedClone = [...product.colorGrouped];
          let colorGroupedIndex = [...product.colorGrouped[Arrindex]];
          let colorGroupedIndexFirstObj = { ...colorGroupedIndex[0] };
          let CTHAsClone = [...colorGroupedIndexFirstObj.chiTietHinhAnhs];
          CTHAsClone.splice(indexImg, 1);
          colorGroupedIndexFirstObj.chiTietHinhAnhs = [...CTHAsClone];
          colorGroupedIndex[0] = { ...colorGroupedIndexFirstObj };
          colorGroupedClone[0] = [...colorGroupedIndex];
          // colorGroupedIndex[0].chiTietHinhAnhs = [...CTHAsClone];
          // product.colorGrouped[Arrindex][0]= [...colorGroupedClone];
          product.colorGrouped = [...colorGroupedClone];
          state.product = { ...product };
        }
      } else {
        state.product.hinhAnhs = [...state.product.hinhAnhs, []];
      }
    });
    //UploadFile
    builder.addCase(UploadFile.fulfilled, (state, action) => {
      const { maSanPham, maMau } = action.meta.arg;
      const temps = { ...current(state.product) };
      let array = temps.colorGrouped.find((x) => x[0].idColor.trim() == maMau);
      console.log({ pl: action.payload });
      if (array) {
        var gg = array.map((item) => {
          return {
            ...item,
            chiTietHinhAnhs: [...item.chiTietHinhAnhs, action.payload],
          };
        });
      }
      const index = temps.colorGrouped.indexOf(array);
      if (index > -1) {
        let t = [...temps.colorGrouped];
        t[index] = [...gg];
        temps.colorGrouped = t;
        state.product = { ...temps };
      }
    });
    builder.addCase(UploadFile.rejected, (state, action) => {
      message.open({
        content: action?.error?.message,
        type: "error",
      });
    });

    //fetchGetLatestProducts
    builder.addCase(fetchGetLatestProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetLatestProducts.fulfilled, (state, action) => {
      state.loading = false;
      const productsTemp = [...action.payload];
      productsTemp.forEach((product) => {
        product.colorGrouped = Object.values(
          GroupBy(product.sanPhams, "idColor")
        );
        // product.imgsDisplay = URLConvert(
        //   Object.values(GroupBy(product.sanPhams, "idColor"))[0][0]
        //     .chiTietHinhAnhs || [],
        //   product.maSanPham.trim()
        // );
      });

      state.productsLatest = action.payload;
      state.colorGrouped = [...productsTemp];
    });
    //fetchGetAllProducts
    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      const { products, totalRow } = action.payload;
      state.products = products;
      state.totalRow = totalRow;
    });
    builder.addCase(fetchGetAllProducts.rejected, (state) => {
      state.loading = false;
    });

    //fetchGetProduct
    builder.addCase(fetchGetProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      const groupedArray = Object.values(
        GroupBy(state.product.sanPhams, "idColor")
      );
      groupedArray.forEach((temp) => {
        temp.forEach((child) => {
          child.chiTietHinhAnhs = URLConvert(
            child.chiTietHinhAnhs || [],
            state.product.maSanPham
          );
        });
      });
      state.product.colorGrouped = [...groupedArray];
      state.loading = false;
    });
    builder.addCase(fetchGetProduct.rejected, (state) => {
      // window.location.replace("/");
      state.loading = false;
    });
    //fetchPostProduct
    builder.addCase(fetchPostProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostProduct.fulfilled, (state, action) => {
      notification.open({
        message: "Thêm thành công",
        type: "success",
      });
      window.location.replace(
        `/admin/trang-quan-tri-san-pham/${action.payload?.maSanPham}/versions/${action.payload?.sanPhams[0]?.maSanPham}`
        );
        state.loading = false;
    });
    builder.addCase(fetchPostProduct.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchPutProduct
    builder.addCase(fetchPutProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPutProduct.fulfilled, (state, action) => {
      // state.product = [];
      message.open({
        content: "Cập nhật thành công!",
        type: "success",
      });
      state.loading = false;
      state.state = 1;
    });
    builder.addCase(fetchPutProduct.rejected, (state, action) => {
      state.loading = false;
      state.state = 0;
      message.open({
        content: action.error.message,
        type: "error",
      });
    });
    //fetchDeleteProduct
    builder.addCase(fetchDeleteProduct.pending, (state) => {
      state.loading = true;
      state.deleteState = false;
    });
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      var temp = [...state.products];
      var obj = temp.find((x) => x.maSanPham == action.meta.arg.id);
      var index = temp.indexOf(obj);
      if (index > -1) {
        temp.splice(index, 1);
        state.products = temp;
      }
      message.open({
        content: "Xóa thành công",
        type: "success",
      });
      state.deleteState = true;
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {
      state.loading = false;
      message.open({
        message: action.error.message,
        type: "error",
      });
    });
  },
});
export const { getImgs, sizeSelected, setFieldValue } = SanPhamSlice.actions;
export default SanPhamSlice;
