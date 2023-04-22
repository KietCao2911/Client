import { Button, FloatButton, Image, Table } from "antd";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "~/const/index";
import { useDispatch, useSelector } from "react-redux";
import BSTSlice, { fetchAllBST, fetchDeleteBST } from "~/redux/slices/BoSuuTap";
import { Plus } from "react-feather";

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
            <Link to={`${value.id}/chinh-sua`}>
            <Button>
            Chỉnh sửa
            </Button>
            </Link>
            
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
  const nav = useNavigate();
  const { boSuuTaps, boSuuTap, loading } = useSelector(
    (state) => state.BoSuuTap
  );
  console.log({ boSuuTaps, boSuuTap, loading });
  useEffect(() => {
    dispatch(fetchAllBST({}));
  }, []);
  return (
    <div>
      <FloatButton icon={<Plus/>} tooltip="Thêm bộ sưu tập" onClick={()=>nav("tao-moi")}></FloatButton>
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
