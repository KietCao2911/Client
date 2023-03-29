import React, { useState } from "react";
import { Drawer, Input, List } from "antd";
import { RollbackOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./SearchDrawer.scss";
import { Link } from "react-router-dom";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const SearchDrawer = ({ SearchDrawer, setSearchDrawer }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Drawer
      className="searchDrawer"
      open={SearchDrawer}
      onClose={() => setSearchDrawer(false)}
      closeIcon={<RollbackOutlined />}
      getContainer={false}
    >
      <div className="searchInputContainer">
        <input
          type="text"
          className="searchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Tìm kiếm"
        />
        <CloseCircleOutlined
          className="searchDrawerIcon"
          onClick={() => setSearchValue("")}
        />
      </div>
      <div className="searchDrawerResult">
        <List
          dataSource={data}
          itemLayout="horizontal"
          renderItem={(item) => {
            return (
              <List.Item.Meta
                style={{ margin: "1rem 0" }}
                title={<Link to="/">{item.title}</Link>}
              ></List.Item.Meta>
            );
          }}
        ></List>
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
