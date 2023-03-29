import React from "react";
import { Button, Collapse, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as DanhMucApiThunk from "~/redux/slices/DanhMuc/index";
const { Panel } = Collapse;
const ChildrenComponent = (props) => {
  const distpatch = useDispatch();
  const { value } = props;
  const [openEdit, setEdit] = useState({
    state: false,
    tenDanhMuc: "",
    id: null,
    parentCategoryID: null,
  });
  const handleDeleteCategory = (id) => {
    distpatch(DanhMucApiThunk.fetchCategoryDelete(id));
  };
  const handleUpdateCategory = (obj) => {
    const { id, body } = obj;
    console.log({ obj });
    distpatch(DanhMucApiThunk.fetchCategoryUpdate({ id, body }));
  };
  return (
    <div>
      <Collapse>
        <Panel
          header={value.info.tenDanhMuc}
          extra={
            <>
              <Button
                danger
                onClick={() => handleDeleteCategory(value.info.id)}
              >
                Xóa
              </Button>
              <Button
                onClick={() =>
                  setEdit({
                    id: value.info.id,
                    tenDanhMuc: value.info.tenDanhMuc,
                    state: true,
                    parentCategoryId: value.info.parentCategoryID,
                  })
                }
              >
                Sửa tên danh mục
              </Button>
            </>
          }
        >
          {value.children &&
            value.children.map((item) => (
              <Collapse key={item.info.id}>
                <Panel
                  showArrow={item.children.length > 0 ? true : false}
                  header={item.info.tenDanhMuc}
                  extra={
                    <>
                      <Button
                        danger
                        onClick={() => handleDeleteCategory(item.info.id)}
                      >
                        Xóa
                      </Button>
                      <Button
                        onClick={() =>
                          setEdit({
                            id: item.info.id,
                            tenDanhMuc: item.info.tenDanhMuc,
                            parentCategoryId: item.info.parentCategoryID,
                            state: true,
                          })
                        }
                      >
                        Sửa tên danh mục
                      </Button>
                    </>
                  }
                >
                  {item.children.length > 0 && (
                    <ChildrenComponent value={item} />
                  )}
                </Panel>
              </Collapse>
            ))}
        </Panel>
      </Collapse>
      <Modal
        visible={openEdit.state}
        onCancel={() => setEdit({ state: false })}
        onOk={() =>
          handleUpdateCategory({
            id: openEdit?.id,
            body: {
              TenDanhMuc: openEdit?.tenDanhMuc,
              Id: openEdit?.id,
              ParentCategoryID: openEdit?.parentCategoryId,
            },
          })
        }
      >
        <Input
          value={openEdit.tenDanhMuc}
          onChange={(e) => setEdit({ ...openEdit, tenDanhMuc: e.target.value })}
        />
      </Modal>
    </div>
  );
};

export default ChildrenComponent;
