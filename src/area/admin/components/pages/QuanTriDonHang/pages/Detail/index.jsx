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
  const Detail = (props) => {
    const { isUpdated, isEdit, isCreated, isReadOnly ,isReturn} = props;
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const { hoadons, hoadon,loading } = useSelector((state) => state.HoaDon);
    const { sanPhamTrongKho } = useSelector((state) => state.KhoHang);
    const { phiShip,thanhTien } = useSelector((state) => state.GioHang);
    const { branchs } = useSelector((state) => state.Branch);
    const [productSearchText, setproductSearchText] = useState("");
    document.title = isUpdated
      ? "Quản lý đơn hàng - Chỉnh sửa"
      : isCreated
      ? "Quản lý đơn hàng - Tạo mới"
      : "Quản lý đơn hàng #" + hoadon?.id;
    const FormRef = useRef();
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const nav = useNavigate();
    const OrderForm = useFormik({
      initialValues: {
        diaChiNavigation: hoadon?.diaChiNavigation || {
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
        phuongThucThanhToan: hoadon?.phuongThucThanhToan || "COD",
        chiTietNhapXuats: hoadon?.chiTietNhapXuats || [],
        thanhTien: hoadon?.thanhTien || 0,
        loaiPhieu: "PHIEUXUAT",
        tongSoLuong: hoadon?.tongSoLuong || 0,
        phiship: hoadon?.phiShip || 0,
        maChiNhanh: "",
        chietKhau: hoadon?.chiKhau || 0,
        tongSoLuong: hoadon?.tongSoLuong || 0,
        daThanhToan: false || hoadon?.daThanhToan,
        daXuatKho: false || hoadon?.daXuatKho,
        daHoanTien: false || hoadon?.daHoanTien,
        steps: 0 || hoadon?.steps,
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
    useEffect(()=>
    {
      OrderForm.setValues({ ...hoadon });
    },[hoadon])
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
      startTransition(() => {
        setproductSearchText(e.target.value);
        dispatch(
          KhoHangAPI.fetchGetProducts({
            maChiNhanh: OrderForm.values?.maChiNhanh?.trim() || "",
            onlyVersion:true,
          })
        );
      });
    };
    useEffect(() => {
      dispatch(BranchAPI.fetchGetBranch());
      if (isUpdated || isReadOnly||isReturn) {
        dispatch(HoaDonApi.fetchGetOrderDetails({ id }));
      } else {
        OrderForm.setTouched({
          diaChiNavigation: {
            name: false,
            phone: false,
            provinceName: false,
            districtName: false,
            wardName: false,
            provinceID: false,
            districtID: false,
            wardID: false,
            addressDsc: false,
            email: false,
          },
          chiTietNhapXuats: false,
          thanhTien: false,
          loaiPhieu: false,
          tongSoLuong: false,
          chietKhau: false,
          maChiNhanh: false,
          daThanhToan: false,
          phuongThucThanhToan: "COD",
        });
        OrderForm.setValues({
          diaChiNavigation: {
            name: "",
            phone: "",
            ProvinceName: "",
            DistrictName: "",
            WardName: "",
            ProvinceID: null,
            DistrictID: null,
            wardID: null,
            addressDsc: "",
            email: "",
          },
          chiTietNhapXuats: [],
          thanhTien: 0,
          loaiPhieu: "PHIEUXUAT",
          tongSoLuong: 0,
          chietKhau: 0,
          maChiNhanh: "",
          phuongThucThanhToan: "COD",
          daThanhToan:false,
          daHoanTien:false,
          steps: 0 || hoadon?.steps,
        });
      }
    }, [id]);
    
    const recallFee =useMemo(()=>
    {
      OrderForm.setFieldValue("phiship",phiShip)
      OrderForm.setFieldValue("thanhTien",OrderForm.values.thanhTien+phiShip)
    },[thanhTien,phiShip])
    const handleSubmit = () => {
      if (Object.keys(OrderForm.errors).length <= 0) {
       
        const params = { ...OrderForm.values };
        if (isCreated) {
          console.log({params})
          // dispatch(ThanhToanAPI.fetchPostWithGuess(params));
        } else if (isUpdated) {
          console.log({params})
          dispatch(HoaDonApi.fetchPUTHoaDon({body:params}));
        } else {
        }
      } else {
        console.log({erros:OrderForm.errors})
        alert("Submit invalid");
      }
    };
    const handleOnChangeBranch = (e) => {
      const guess = OrderForm.values.diaChiNavigation;
      const phiship = OrderForm.values.phiship;
      OrderForm.setValues({
        diaChiNavigation: guess || {
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
        phiship: phiship || 0,
        chietKhau: 0,
        maChiNhanh: e,
        phuongThucThanhToan: "COD",
  
        daThanhToan: false || hoadon?.daThanhToan,
        daHoanTien: false || hoadon?.daHoanTien,
        steps: 0 || hoadon?.steps,
      });
      setproductSearchText("");
    };
    const handleXuatHangKhoiKho = () => {
      dispatch(HoaDonApi.fetchPutXuatKho({ body: OrderForm.values }));
    };
    const handleThanhToan = () => {
      dispatch(HoaDonApi.fetchThanhToan({ body: OrderForm.values }));
    };
    const handleHoanTien=()=>
    {
      dispatch( HoaDonApi.fetchPUTHoanTien({ body: OrderForm.values }))
    }
    const handleUpdate=()=>
    {
      dispatch(HoaDonApi.fetchPUTHoaDon({ body: OrderForm.values }))
    }
    const handleTraHang =()=>
    {
      dispatch(HoaDonApi.fetchPutTraHang({ body: OrderForm.values }))
  
    }
    const handleCancel = () => {
      const params = { ...OrderForm.values };
      dispatch(HoaDonApi.fetchCancelOrder({ body: params }));
    };
    console.log({gg:OrderForm.values.chiTietNhapXuats})
    return (
      <form ref={FormRef}>
        {loading&&<CustomSpin/>}
        <Row  gutter={[, 20]}>
          {/* HEADER */}
          <Col span={24}>
            <StickyActions ></StickyActions>
          </Col>
          <Col span={24}>
             <Row justify={"space-between"}>
             <Col >
                 <Link to="/admin/trang-quan-tri-don-hang">
                 <Row  align={"middle"} justify={"center"}>
                 <ArrowLeft/><p>Trở về trang đơn hàng</p>
                 </Row>
                 </Link>
              </Col>
              <Col >
              <Steps
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
                /></Col>
             </Row>
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
                          <Select.Option value={branch?.maChiNhanh.trim()}>
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
                 {isCreated && (
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
                  )}
                  <List onItemClick={(e) => console.log(e)}>
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
            { (
             <Card title="Địa chỉ">
                 <AddressForm
                isCreated={isCreated}
                isReadOnly={isReadOnly}
                isUpdated={isUpdated}
                orderForm={OrderForm}
              />
             </Card>
              )}
            {(isReadOnly||isReturn) && (
              <Card>
                <Descriptions layout="vertical">
                  <Descriptions.Item label="Tên khách hàng">
                    {OrderForm.values.diaChiNavigation?.name || "--"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {OrderForm.values.diaChiNavigation?.phone || "--"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email ">
                    {OrderForm.values.diaChiNavigation?.email || "--"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ giao hàng">
                    {`${OrderForm.values?.diaChiNavigation?.wardName || "--"} - ${
                      OrderForm.values?.diaChiNavigation?.districtName || "--"
                    } - ${
                      OrderForm.values?.diaChiNavigation?.provinceName || "--"
                    }`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ xuất hóa đơn">
                    {`${OrderForm.values?.diaChiNavigation?.wardName} - ${
                      OrderForm.values?.diaChiNavigation?.districtName
                    } - ${
                      OrderForm.values?.diaChiNavigation?.provinceName || "--"
                    }`}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}
          </Col>
             
            </Row>
          </Col>}
  
          {
            isCreated?<>
            <FloatButton.Group>
              <FloatButton tooltip={"Xác nhận tạo"} onClick={handleSubmit} icon={<File/>}></FloatButton>
            </FloatButton.Group>
  
            </>:null
          }
          {
            isUpdated?<>
            <Col md={24} xs={24}>
            {!OrderForm.values.daThanhToan&&!OrderForm.values.daHoanTien&&<Card title="Thanh toán" extra={<Button onClick={handleThanhToan}>Thanh toán</Button>}></Card>}
              {!OrderForm.values.daXuatKho&&<Card title="Xuất kho" extra={<Button onClick={handleXuatHangKhoiKho}>Xuất kho</Button>}></Card>}
            </Col>
             <FloatButton.Group>
              <FloatButton tooltip={"Xác nhận sửa"} onClick={handleUpdate} icon={<File/>}></FloatButton>
            </FloatButton.Group>
            </>:null
          }
          {
            isReadOnly&&OrderForm.values?.status!=-1&&<>
                      <Col md={24} xs={24}>
              {!OrderForm.values.daThanhToan&&<Card title="Thanh toán" extra={<Button onClick={handleThanhToan}>Thanh toán</Button>}></Card>}
              {!OrderForm.values.daXuatKho&&<Card title="Xuất kho" extra={<Button onClick={handleXuatHangKhoiKho}>Xuất kho</Button>}></Card>}
            </Col>
            </>
          }
                  {
            isReturn?<>
            <Col md={24} xs={24}>
              {OrderForm.values.status==-1&&OrderForm.values.daThanhToan&&!OrderForm.values?.daHoanTien&& <Card title="Hoàn tiền" extra={<Button onClick={handleHoanTien}>Hoàn tiền</Button>}></Card>}
            </Col>
            <FloatButton.Group>
                    <FloatButton tooltip={"Xác nhận trả hàng"}  onClick={handleTraHang}></FloatButton>
            </FloatButton.Group>
            </>:null
          }
          {isReadOnly&&OrderForm.values.steps<2&&OrderForm.values?.status!=-1&&<>
            <FloatButton.Group>
  {          <FloatButton tooltip={"Hủy đơn này"} icon={<X/>} onClick={handleCancel}></FloatButton>
  }                  <FloatButton tooltip={"Sửa đơn này"} icon={<Edit3 onClick={()=>nav("chinh-sua")}/>}   ></FloatButton>
            </FloatButton.Group>
          </>}
          {
            (OrderForm.values.daXuatKho&&!isReturn)&&<>
              <Col md={24}>
              
             {<Card title="Hoàn trả/hủy đơn" extra={<Link to={"tra-hang"}> <Button>Trả hàng/hủy đơn</Button> </Link>}></Card>}
            </Col>
            </>
          }
        </Row>
        {isUpdated&&OrderForm.values.steps<2&&<>
            <FloatButton.Group>
                    <FloatButton tooltip={"Hủy "} icon={<X/>}  onClick={()=>nav("../"+hoadon?.id)}></FloatButton>
                    <FloatButton tooltip={"Xác nhận sửa"} onClick={handleSubmit} icon={<Save />}   ></FloatButton>
            </FloatButton.Group>
          </>}
      </form>
    );
  };
  
  export default Detail;
  