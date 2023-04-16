import {
  Button,
  Card,
  Cascader,
  Col,
  FloatButton,
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
import { Delete, Edit, Save, Trash2, X } from "react-feather";
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
  const { product, deleteState } = useSelector((state) => state.SanPham);
  const [modalDeleteProduct, setModalDeleteProduct] = useState(false);
  const [pending, startTransition] = useTransition();
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
    const maSP = prams111["*"].split("/")[1];
    // const init = product.sanPhams[0]?.maSanPham?.trim();
    // return [maSP?.trim() ? maSP.trim() : init];
    return [maSP || null];
  });
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  console.log({ childParams: prams111 });
  const nav = useNavigate();
  const dispatch = useDispatch();
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
            key: item.maSanPham.trim(),
            maSanPham: item.maSanPham.trim(),
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
      console.log({ body: form.values });
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
            path={`versions/${e.maSanPham.trim()}`}
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
  return (
    <>
    {isEdit&&<FloatButton.Group>
      <FloatButton icon={<Save/>}  onClick={handleSave} tooltip="Lưu"></FloatButton>
      <FloatButton icon={<X/>}  onClick={handleCancel} tooltip="Hủy"></FloatButton>
    </FloatButton.Group>}
    {!isEdit&&<FloatButton.Group>
      <FloatButton icon={<Edit/>} onClick={()=>setIsEdit(true)} tooltip="Sửa"></FloatButton>
      <FloatButton icon={<Trash2/>} onClick={handleDeleteProduct} tooltip="Xóa"></FloatButton>
    </FloatButton.Group>}
      <div className="headerActions">
        <div className="backToList">
          {" "}
          <LeftOutlined />{" "}
          <Link to="/admin/trang-quan-tri-san-pham">Trở lại danh sách</Link>
        </div>
        <div className="actions">

        </div>
      </div>
      <Row gutter={[20, 20]}>
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
                      <InputText
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
                {isEdit ? (
                  <Space>
                    <Space>Danh mục:</Space>
                    <Space>
                      <Cascader
                        defaultValue={
                          form.values.danhMucDetails &&
                          form.values.danhMucDetails.map((item) => {
                            return item.danhMucId;
                          })
                        }
                        onChange={(e) => handleChangeCascader(e)}
                        options={handleCascader([...items] || [])}
                      ></Cascader>
                    </Space>
                  </Space>
                ) : (
                  <Space>
                    <Space>Danh mục:</Space>
                    <Cascader
                      value={
                        form.values.danhMucDetails &&
                        form.values.danhMucDetails.map((item) => {
                          return item.danhMucId;
                        })
                      }
                      options={handleCascader([...items] || [])}
                      disabled={true}
                    ></Cascader>
                  </Space>
                )}
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
                  <Select style={{ width: "100%" }} defaultValue={null}>
                    <Select.Option value={null}>Hành động</Select.Option>
                    <Select.Option value="1">In mã vạch</Select.Option>
                    <Select.Option value="2">Xóa phiên bản này</Select.Option>
                  </Select>
                }
              >
                <ShowMore height={"50rem"}>
                  <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={data}
                    footer={() => (
                      <>
                        <FooterTable />
                      </>
                    )}
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
    </>
  );
};

export default WithChild;
