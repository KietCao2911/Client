import {
  Button,
  Card,
  Cascader,
  Col,
  FloatButton,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useFormik } from "formik";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import InputText from "~/components/commomComponents/InputText";
import * as TypeAPI from "~/redux/slices/Type/TypeSlice";
import * as BranchAPI from "~/redux/slices/Branch/BranchSlice";
import * as BrandAPI from "~/redux/slices/Brand/BrandSlice";
import * as SanPhamAPI from "~/redux/slices/SanPham/index";
import {
  FileAddFilled,
  FileAddOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import MyButton from "~/components/commomComponents/Button";
import { setFieldValue } from "~/redux/slices/SanPham/index";
import { lazy } from "react";
import toSlug from "~/components/utils/ToSlug";
import * as DanhMucAPI from "~/redux/slices/DanhMuc";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCollapse from "~/components/commomComponents/Collapse";
import ShowMore from "~/components/commomComponents/ShowMore";
import { ArrowLeft, Delete, Edit, Plus, Save, Trash2, X } from "react-feather";
import StickyActions from "~/components/commomComponents/stickyActions";
import { v4 } from "uuid";
import AddChildProduct from "../../../ThemSanPham/components/AddChildProduct";
import AddCategoryDetail from "../AddCategoryDetail";
const VersionDetailPage = lazy(() => import("./pages/VersionDetailPage"));
const FooterTable = () => {
  return (
    <div style={{ cursor: "pointer" }}>
      <MyButton icon={<FileAddOutlined />}>Thêm phiên bản mới</MyButton>
    </div>
  );
};

const columns = [
  {
    title: "Tên phiên bản",
    render: (_, record) => {
      return (
        <div>
          <p>{record.tenSanPham}</p>
          <div
            className="qty"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <p>Tồn kho: {record.soLuongTon || 0}</p>
            <p>Có thể bán: {record.soLuongCoTheban || 0}</p>
          </div>
        </div>
      );
    },
  },
];

const WithChild = (props) => {
  const { items, itemsArr } = useSelector((state) => state.DanhMuc);
  const prams111 = useParams();
  const { branchs } = useSelector((state) => state.Branch);
  const { types } = useSelector((state) => state.Type);
  const { brands } = useSelector((state) => state.Brand);
  const { product, deleteState,loading } = useSelector((state) => state.SanPham);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [pending, startTransition] = useTransition();
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
    const maSP = prams111["*"].split("/")[1];
    return [maSP || null];
  });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [openModalAddChild,setOpenModalChild]= useState(false)
  const form = useFormik({
    initialValues: { ...product } || {},
  });
  const setInitForm = useMemo(() => {
    form.setValues({ ...product });
  }, [product]);
  const onSelectChange = (key) => {
    const keyFormat = key[0].trim();
    setSelectedRowKeys([keyFormat]);
    nav(`versions/` + keyFormat);
  };
  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (e) => onSelectChange(e),
  };
  const ChangeData = useMemo(() => {
    let temp =
      (product.sanPhams &&
        product?.sanPhams?.map((item) => {
          return {
            ...item,
            key: item?.maSanPham?.trim(),
            maSanPham: item?.maSanPham?.trim(),
          };
        })) ||
      [];
    setData([...temp]);
  }, [product.sanPhams]);
  useEffect(() => {
    dispatch(TypeAPI.fetchGetTypes());
    dispatch(BranchAPI.fetchGetBranch());
    dispatch(BrandAPI.fetchGetBrand());
    dispatch(DanhMucAPI.fetchCategoryAll());
  }, []);
  const handleCancel = () => {
    setIsEdit(false);
    form.setValues(product);
  };
  const callBackOnDeleteSuccess = useMemo(() => {
    if (deleteState) {
      nav("/admin/trang-quan-tri-san-pham");
    }
  }, [deleteState]);
  const handleSave = async () => {
    try {
      dispatch(SanPhamAPI.fetchPutProduct({ body: form.values }));
      setIsEdit(false);
    } catch (error) {}
  };
  const handleChange = (value, fieldName) => {
    form.setFieldValue(fieldName, value);
  };
  const handleChangeName = (value) => {
    let newName = form.values.sanPhams.map((product) => {
      return {
        ...product,
        tenSanPham: `${value}-${product.idSize.trim()}-${product.idColor.trim()}`,
        slug: toSlug(
          `${value} ${product.idSize.trim()} ${product.idColor.trim()}`
        ),
      };
    });
    form.setFieldValue("tenSanPham", value);
    form.setFieldValue("slug", toSlug(value));
    startTransition(() => {
      form.setFieldValue("sanPhams", newName);
    });
  };
  const handleDeleteProduct = () => {
    try {
      dispatch(SanPhamAPI.fetchDeleteProduct({ id: product.maSanPham.trim() }));
    } catch (error) {}
  };
  const catchingRoute = useMemo(() => {
    return (
      <Routes>
        {form.values.sanPhams?.map((e) => (
          <Route
          key={v4()}
            path={`versions/${e?.maSanPham?.trim()}`}
            element={
              <VersionDetailPage form={form} version={e} isEdit={isEdit} />
            }
          />
        ))}
      </Routes>
    );
  }, [form.values?.sanPhams, isEdit]);
  const handleOpenModalDelete = () => {
    setModalDeleteProduct(true);
  };
  const handleCascader = (arr) => {
    return arr?.map((item) => {
      return {
        label: item.tenDanhMuc,
        value: item.id,
        children: handleCascader(item.children.length > 0 ? item.children : []),
      };
    });
    // return <Cascader options={t}></Cascader>
  };
  const handleChangeCascader = (e) => {
    const temp = e.map((item) => {
      return {
        danhMucId: item,
        maSanPham: product.maSanPham,
      };
    });
    form.setFieldValue("danhMucDetails", temp);
  };
  const Actionsbtn=(
    <>
    {
      isEdit&&<Space>
      <Button loading={loading} onClick={handleSave} type="primary">
          Lưu
        </Button>   
      <Button onClick={handleCancel}>
          Hủy
        </Button>   
    </Space>
    }
    {
      !isEdit&&<Space>
      <Button loading={loading} onClick={()=>setIsEdit(true)}>
          Sửa
        </Button>   
      <Button danger loading={loading} onClick={handleDeleteProduct}>
          Xóa
        </Button>   
    </Space>
    }
    </>
    
)
const handleDeleteProductChild=()=>
{
  const maSP = selectedRowKeys[0];
  if(maSP)
  {
    dispatch(SanPhamAPI.DeleteChildSanPham(maSP))
  }
}
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <StickyActions link="/admin/trang-quan-tri-san-pham/" label="Trở về trang sản phẩm" Actionsbtn={Actionsbtn} IconBack={<></>}/>
        </Col>

        <Col span={24}>
          <Card title="Thông tin sản phẩm">
            <Space>
              <Space direction={isEdit ? "horizontal" : "vertical"}>
                <Space>
                  <Space>
                    <i>Tên sản phẩm:</i>
                  </Space>
                  {isEdit ? (
                    <Space>
                      <Input
                        label="Tên sản phẩm"
                        name={"tenSanPham"}
                        value={form.values.tenSanPham}
                        onChange={(e) => handleChangeName(e.target.value)}
                        placeHolder="Tên sản phâm"
                      />
                    </Space>
                  ) : (
                    <Space>{form.values?.tenSanPham}</Space>
                  )}
                </Space>
                <Space>
                  <Space>
                    <i>Nhãn hiệu:</i>
                  </Space>
                  {isEdit ? (
                    <Space>
                      <Select
                        defaultValue={form.values.IDBrand || null}
                        fieldNames={"idBrand"}
                        value={form?.values?.idBrand}
                        onChange={(e) => handleChange(e, "idBrand")}
                      >
                        <Select.Option value={null}>
                          Chọn nhãn hiệu
                        </Select.Option>
                        {brands &&
                          brands.map((brand) => (
                            <Select.Option value={brand?.id}>
                              {brand?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Space>
                  ) : (
                    <Space>
                      <Select
                        disabled
                        defaultValue={form.values.IDBrand || null}
                        fieldNames={"idBrand"}
                        value={form?.values?.idBrand}
                        onChange={(e) => handleChange(e, "idBrand")}
                      >
                        <Select.Option value={null}>
                          Chọn nhãn hiệu
                        </Select.Option>
                        {brands &&
                          brands.map((brand) => (
                            <Select.Option value={brand?.id}>
                              {brand?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Space>
                  )}
                </Space>
                <Space>
                  <Space>
                    <i>Phân loại:</i>
                  </Space>
                  {isEdit ? (
                    <Space>
                      <Select
                        defaultValue={form.values.IDType || null}
                        fieldNames={"idType"}
                        value={form?.values?.idType}
                        onChange={(e) => handleChange(e, "idType")}
                      >
                        <Select.Option value={null}>
                          Chọn loại hàng
                        </Select.Option>
                        {types &&
                          types.map((type) => (
                            <Select.Option value={type?.id}>
                              {type?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Space>
                  ) : (
                    <Space>
                      <Select
                        disabled
                        defaultValue={form.values.IDType || null}
                        fieldNames={"idType"}
                        value={form?.values?.idType}
                        onChange={(e) => handleChange(e, "idType")}
                      >
                        <Select.Option value={null}>
                          Chọn loại hàng
                        </Select.Option>
                        {types &&
                          types.map((type) => (
                            <Select.Option value={type?.id}>
                              {type?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </Space>
                  )}
                </Space>
                          <span>Danh mục:</span>  <AddCategoryDetail isEdit={isEdit} setFieldValue={form.setFieldValue}></AddCategoryDetail>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col span={24}>
          <MyCollapse label="Mô tả">
            <CKEditor
              disabled={isEdit ? false : true}
              data={product?.mota}
              onChange={(e, editor) =>
                form.setFieldValue("mota", editor.getData())
              }
              editor={ClassicEditor}
            ></CKEditor>
          </MyCollapse>
        </Col>
        <Col span={24}>
          <MyCollapse label="Mô tả chi tiết">
            <CKEditor
              disabled={isEdit ? false : true}
              data={product?.motaChiTiet || ""}
              onChange={(e, editor) =>
                form.setFieldValue("motaChiTiet", editor.getData())
              }
              editor={ClassicEditor}
            ></CKEditor>
          </MyCollapse>
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24} xl={10}>
              <Card
                title="Phiên bản"
                extra={
                  <Space style={{ width: "100%" }} defaultValue={null}>
                   <Plus className="icon" onClick={()=>setOpenModalChild(true)}/>
                   <Trash2 className="icon" onClick={handleDeleteProductChild}/>
                    
                  </Space>
                }
              >
                <ShowMore height={"50rem"}>
                  <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={data}
                   
                  ></Table>
                </ShowMore>
              </Card>
            </Col>
            {catchingRoute}
            <Outlet />
          </Row>
        </Col>
      </Row>
      <Modal
        onOk={() => handleDeleteProduct()}
        onCancel={() => setModalDeleteProduct(false)}
        okText="Xóa"
        cancelText="Hủy"
        open={modalDeleteProduct}
        okButtonProps={{
          style: {
            backgroundColor: "#cf000f",
          },
        }}
      >
        Bạn có chắc muốn xóa? Tác vụ này không thể khôi phục.
      </Modal>
        <AddChildProduct openModalAddChild={openModalAddChild} setOpenModalChild={setOpenModalChild}/>
    </>
  );
};

export default WithChild;
