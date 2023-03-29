import { Button, Image, Table } from "antd";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { BASE_URL } from "~/const/index";
import { useDispatch, useSelector } from "react-redux";
import BSTSlice, { fetchAllBST, fetchDeleteBST } from "~/redux/slices/BoSuuTap";

const columns = (dispatch) => {
  const handleDelete = (record) => {
    dispatch(fetchDeleteBST({ id: record.id }));
  };
  return [
    {
      title: "Tên Bộ sưu tập",
      dataIndex: "tenBoSuuTap",
      key: uuidv4(),
    },
    {
      title: "Hình ảnh",
      dataIndex: "Img",
      key: uuidv4(),
      render: (_, e) => {
        return e.img == null ? (
          <p>Hãy cập nhật ảnh</p>
        ) : (
          <Image width={200} src={`${BASE_URL}res/BstImgs/${e.img}`} />
        );
      },
    },
    {
      title: "Hành động",
      key: uuidv4(),
      render: (_, value) => {
        return (
          <>
            {" "}
            <Link to={`${value.id}`}>
              {" "}
              <Button>Chi tiết</Button>
            </Link>
            <Button>
              <Link to={`${value.id}/chinh-sua`}>Chỉnh sửa</Link>
            </Button>
            <Button onClick={() => handleDelete(value)} type="primary" danger>
              Xóa
            </Button>
          </>
        );
      },
    },
  ];
};
const TrangChinh = () => {
  const dispatch = useDispatch();
  document.title = "Quản lý bộ sưu tập";
  const { boSuuTaps, boSuuTap, loading } = useSelector(
    (state) => state.BoSuuTap
  );
  console.log({ boSuuTaps, boSuuTap, loading });
  useEffect(() => {
    dispatch(fetchAllBST({}));
  }, []);
  return (
    <div>
      {" "}
      <Link to="tao-moi">
        <Button type="primary">Thêm bộ sưu tập</Button>
      </Link>
      <Table
        loading={loading}
        key={uuidv4()}
        rowKey={uuidv4()}
        columns={columns(dispatch)}
        dataSource={boSuuTaps}
      ></Table>
    </div>
  );
};

export default TrangChinh;
