import React, { useEffect, useState } from "react";
import DanhMucSlice, * as Api from "~/redux/slices/DanhMuc";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { Form, Table, Select, Button, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import * as Method from "~/axiosRequest/request";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import ChildrenComponent from "./components/ChildrenComponent";
import ThemDanhMuc from "./components/ThemDanhMuc";
const { Option, OptGroup } = Select;

const column = (params) => {
  const { dispatch, sexOptions } = params;
  const handleDelete = (id) => {
    dispatch(Api.fetchCategoryDelete(id));
  };
  return [
    {
      title: "Tên danh mục",
      key: uuidv4(),
      render: (_, value) => {
        console.log({ value });
        return <p>{value.info.tenDanhMuc}</p>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, value) => {
        return (
          <>
            <Button type="primary" key={uuidv4()}>
              <Link
                to={`/admin/trang-quan-tri-danh-muc/chinh-sua/${value.info.id}`}
              >
                Cập nhật
              </Link>
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(value.id)}
              key={uuidv4()}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
};
const QuanTriDanhMuc = () => {
  const { items, item, loading } = useSelector((state) => state.DanhMuc);
  const [sexOptions, setSexOptions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [categoryOtp, setCategoryOpt] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Api.fetchCategoryAll());
  }, []);

  return (
    <>
      <Button type="primary" onClick={() => setOpenModalAdd(true)}>
        Thêm danh mục
      </Button>
      {/* <Table
        expandable={{
          showExpandColumn: false,
        }}
        loading={loading}
        columns={column({ dispatch, sexOptions, loading })}
        dataSource={items.menu}
        rowKey={uuidv4()}
      ></Table> */}
      {items.menu?.map(
        (item) => (
          console.log({ item }),
          (
            <div>
              <ChildrenComponent value={item} />
            </div>
          )
        )
      )}
      <Modal visible={openModalAdd} onCancel={() => setOpenModalAdd(false)}>
        <ThemDanhMuc />
      </Modal>
    </>
  );
};

export default QuanTriDanhMuc;
