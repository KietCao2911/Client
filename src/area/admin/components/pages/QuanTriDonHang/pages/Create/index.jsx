import {
    Button,
    Card,
    Col,
    Descriptions,
    FloatButton,
    Input,
    Menu,
    Popover,
    Row,
    Space,
    Steps,
    Table,
  } from "antd";
  import { useFormik } from "formik";
  import React, {
    Fragment,
    useEffect,
    useMemo,
    useRef,
    useState,
    useTransition,
  } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import MyCollapse from "~/components/commomComponents/Collapse";
  import InputText from "~/components/commomComponents/InputText";
  import List from "~/components/commomComponents/List";
  import * as HoaDonApi from "~/redux/slices/HoaDon/HoaDonSlice";
import AddressForm from "../OrderDetailForm/Form/AddressForm";
  import * as Yup from "yup";
  import { BASE_URL } from "~/const";
  import * as KhoHangAPI from "~/redux/slices/KhoHang/KhoHangSlice";
  import ItemResult from "~/components/commomComponents/List/compoenents/ItemResult";
  import ProductsTable from "../../../QuanTriNhapHang/pages/TrangTaoDonNhap/components/ProductsTable";
  import convertVND from "~/components/utils/ConvertVND";
  import { ArrowLeft, Edit3, File, Plus, Save, Settings, X } from "react-feather";
  import { message, Select } from "antd/es";
  import * as BranchAPI from "~/redux/slices/Branch/BranchSlice";
  import { v4 } from "uuid";
  import * as ThanhToanAPI from "~/redux/slices/ThanhToanSlice";
  import CustomSpin from "~/components/CustomSpin";
  import StickyActions from "~/components/commomComponents/stickyActions";
  const Create = (props) => {
    const { isUpdated, isEdit, isCreated, isReadOnly ,isReturn} = props;
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const { hoadons, hoadon,loading } = useSelector((state) => state.HoaDon);
    const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
    const { phiShip,thanhTien } = useSelector((state) => state.GioHang);
    const { branchs } = useSelector((state) => state.Branch);
    const [productSearchText, setproductSearchText] = useState("");
    document.title ="Quản lý đơn hàng - Tạo mới"
    const FormRef = useRef();
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const nav = useNavigate();
    const OrderForm = useFormik({
      initialValues: {
        diaChiNavigation: {
          name: "",
          phone: "",
          ProvinceName: "",
          DistrictName: "",
          WardName: "",
          ProvinceID: null,
          DistrictID: null,
          WardID: null,
          addressDsc: "",
          email: "",
        },
        phuongThucThanhToan:  "COD",
        chiTietNhapXuats:  [],
        thanhTien:  0,
        loaiPhieu: "PHIEUXUAT",
        tongSoLuong: 0,
        phiship:  0,
        maChiNhanh: "",
        chietKhau: 0,
        tongSoLuong: 0,
        daThanhToan: false ,
        daXuatKho: false ,
        daHoanTien: false ,
        steps: 0 ,
      },
      validationSchema: Yup.object().shape({
        diaChiNavigation: Yup.object().shape({
          phone: Yup.string()
            .required("Phải nhập trường này")
            .matches(phoneRegExp, "Định dạng số điện thoại không đúng")
            .min(10, "Số điện thoại phải hơn 10 chữ số")
            .max(10, "Số điện thoại không quá 10 chữ số"),
          name: Yup.string().required("Phải nhập trường này"),
          email: Yup.string()
            ?.trim()
            .required("Phải nhập trường này")
            .matches(emailRegex, "Định dạng email không đúng"),
          ProvinceID: Yup.number()
            .nullable(true)
            .required("Phải chọn trường này"),
          DistrictID: Yup.number()
            .nullable(true)
            .required("Phải chọn trường này"),
          WardID: Yup.number().nullable(true).required("Phải chọn trường này"),
        }),
        phuongThucThanhToan: Yup.string().required("Phải chọn trường này"),
        chiTietNhapXuats: Yup.array().min(1, "Chọn ít nhất một sản phẩm"),
      }),
      onSubmit: (values) => {
        alert("SUBMIT");
      },
    });
    const handleApplyCoupon = (value) => {
      OrderForm.setFieldValue("chietKhau", Number(value));
      const totalPrices = OrderForm.values.chiTietNhapXuats.reduce((x, y) => {
        return x + y.thanhTien;
      }, 0);
      if (value == 0) {
        OrderForm.setFieldValue("thanhTien", totalPrices);
      } else {
        OrderForm.setFieldValue("thanhTien", totalPrices * (1 - value / 100));
      }
    };
 
    const onClickProduct = (p,url) => {
      const isAny =
        OrderForm.values.chiTietNhapXuats &&
        OrderForm.values.chiTietNhapXuats.length > 0 &&
        OrderForm.values.chiTietNhapXuats.some(
          (x) => x.maSanPham.trim() == p.maSanPham.trim()
        );
      if ((p?.soLuongCoTheban <= 0 && p?.soLuongTon <= 0) || isAny) {
        if (isAny) {
          message.open({
            content: "Sản phẩm này đã được chọn",
            type: "error",
          });
        } else {
          message.open({
            content: "Sản phẩm này hiện đã hết hàng, vui lòng nhập thêm sản phẩm",
            type: "error",
          });
        }
      } else {
        const params = {
          img:url,
          sanPhamNavigation: { ...p.sanPhamNavigation },
          soLuong: 1,
          donGia: p?.sanPhamNavigation?.giaBanLe || 0,
          thanhTien: parseFloat(p?.sanPhamNavigation?.giaBanLe) * 1,
          maSanPham: p?.sanPhamNavigation?.maSanPham || "",
        };
  
        let temp = OrderForm.values.chiTietNhapXuats
          ? [...OrderForm.values.chiTietNhapXuats]
          : [];
        temp.push({ ...params });
        OrderForm.setFieldValue(
          "thanhTien",
          OrderForm.values?.thanhTien +
            parseFloat(params.thanhTien) +
            (OrderForm.values?.phiship || 0)
        );
        OrderForm.setFieldValue("tongSoLuong", OrderForm.values.tongSoLuong + 1);
        OrderForm.setFieldValue("chiTietNhapXuats", temp);
      }
    };
  
    const handleChangeProductSearchText = (e) => {
      if(!OrderForm.values.maChiNhanh)
      {
        message.open({
          content:"Vui lòng chọn nhà cung cấp",
          type:"error"
        })
        return ;
      }
      setproductSearchText(e.target.value);
      startTransition(() => {
        dispatch(
          KhoHangAPI.fetchGetProducts({
            maChiNhanh: OrderForm.values?.maChiNhanh?.trim() || "",
            onlyVersion:true,
          })
        );
      });
    };
   
    
    const recallFee =useMemo(()=>
    {
      OrderForm.setFieldValue("phiship",phiShip)
      OrderForm.setFieldValue("thanhTien",OrderForm.values.thanhTien+phiShip)
    },[thanhTien,phiShip])
    const handleSubmit = () => {
      if (Object.keys(OrderForm.errors).length <= 0) {
       
        const params = { ...OrderForm.values };
        dispatch(ThanhToanAPI.OrderWithCOD(params));
      } else {
        console.log({erros:OrderForm.errors})
        alert("Submit invalid");
      }
    };

    const handleOnChangeBranch = (e) => {
   
      OrderForm.setValues({
        diaChiNavigation: {
          name: "",
          phone: "",
          provinceName: "",
          districtName: "",
          wardName: "",
          provinceID: null,
          districtID: null,
          wardID: null,
          addressDsc: "",
          email: "",
        },
        chiTietNhapXuats: [],
        thanhTien: 0,
        loaiPhieu: "PHIEUXUAT",
        tongSoLuong: 0,
        phiship:  0,
        chietKhau: 0,
        maChiNhanh: e,
        phuongThucThanhToan: "COD",
  
        daThanhToan: false ,
        daHoanTien: false ,
        steps: 0 ,
      });
      setproductSearchText("");
    };
    useEffect(()=>
    {
        dispatch(BranchAPI.fetchGetBranch());
    },[])
    return (
      <form ref={FormRef}>
        {loading&&<CustomSpin/>}
        <Row  gutter={[, 20]}>
          {/* HEADER */}
          <Col span={24}>
            <StickyActions link="/admin/trang-quan-tri-don-hang" label="Trở về trang đơn hàng" Actionsbtn={(<Button onClick={handleSubmit} type="primary"> Xác nhận</Button>)} ></StickyActions>
          </Col>
          <Col span={24}>
            <StickyActions IconBack={<Fragment/>} Actionsbtn={              <Steps
                responsive={true}
                  current={
                    hoadon?.daThanhToan && hoadon?.daNhapHang
                      ? 4
                      : hoadon?.steps || 0
                  }
                  items={[
                    {
                      title: "Đặt hàng",
                    },
                    {
                      title: "Duyệt",
                    },
                    {
                      title: "Xuất kho",
                    },
                    {
                      title: "Hoàn thành",
                    },
                  ]}
                />}>

            </StickyActions>
          </Col>
          <Col span={24}> 
              {/* BRANCH SELECTED  */}
                <Card title="Chi nhánh xuất hàng">
                  <Select
                    disabled={isUpdated || isReadOnly ? true : false}
                    value={OrderForm.values?.maChiNhanh?.trim()}
                    onChange={(e) => handleOnChangeBranch(e)}
                    style={{ width: "100%" }}
                  >
                     <Select.Option value={""}>
                            Chọn chi nhánh
                          </Select.Option>
                    {branchs &&
                      branchs.map((branch) => {
                        return (
                          <Select.Option key={v4()} value={branch?.maChiNhanh.trim()}>
                            {branch?.tenChiNhanh}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Card>
              </Col>
  
         { <Col span={24}>
            <Row gutter={[20, 20]}>
    
              <Col md={12} xs={24}>
                <Card title="Sản phẩm">
                 <Space direction="vertical" style={{width:"100%"}}>
     
                    <InputText
                      value={productSearchText}
                      label="Tìm kiếm sản phẩm"
                      className={`${
                        OrderForm.touched?.chiTietNhapXuats &&
                        OrderForm.errors.chiTietNhapXuats &&
                        "error"
                      }`}
                      onChange={(e) => handleChangeProductSearchText(e)}
                    />

                  <List >
                    {productSearchText &&
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
                            value={item}
                            onItemClick={(productInfo) =>
                              onClickProduct(productInfo,url)
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
                  <List></List>
                  <ProductsTable
                    isEdit={isCreated ? true : false}
                    Form={OrderForm}
                  />
                  <span
                    className={`${OrderForm.errors?.chiTietNhapXuats && "error"}`}
                  >
                    {" "}
                    {OrderForm.touched?.chiTietNhapXuats &&
                      OrderForm.errors.chiTietNhapXuats}
                  </span>
                  <Space
                    align="end"
                    style={{ width: "100%" }}
                    direction="vertical"
                  >
                    <Space className="summaryItem">
                      <div>Số lượng:</div>
                      <div>{OrderForm?.values?.tongSoLuong}</div>
                    </Space>
                    <Space className="summaryItem">
                      <div>Thành tiền:</div>
                      <div>
                        {" "}
                        {convertVND(
                          OrderForm.values?.chiTietNhapXuats?.reduce(
                            (x, y) => x + y.thanhTien,
                            0
                          )
                        ) || 0}
                      </div>
                    </Space>
                    <Space className="summaryItem">
                      <div>phí giao hàng:</div>
                      <div> {convertVND(OrderForm.values?.phiship) || 0}</div>
                    </Space>
                    <Space style={{ width: "100%" }} className="summaryItem">
                      <InputText
                        disabled={OrderForm.values.steps < 2 ? false : true}
                        label="Nhập mã khuyến mãi "
                      ></InputText>
                    </Space>
                    <Space className="summaryItem">
                      <div>
                        <b>Tiền cần trả:</b>
                      </div>
                      <div> {convertVND(OrderForm.values?.thanhTien)}</div>
                    </Space>
                  </Space>
                 </Space>
                </Card>
              </Col>
                      {/* ADDRESS */}
          <Col md={12} xs={24}>
          <Card title="Địa chỉ">
                 <AddressForm
                isCreated={isCreated}
                orderForm={OrderForm}
              />
             </Card>

          </Col>
             
            </Row>
          </Col>}
  
        
        


        </Row>
       
      </form>
    );
  };
  
  export default Create;
  