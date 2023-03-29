import Item from "antd/lib/list/Item";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Api from "~/redux/slices/DanhMuc";
import "./Menu.scss";
import { v4 as uuidv4 } from "uuid";
const ItemMenu = (params) => {
  const { item, items } = params;
  return (
    <div className="Item">
      <h3 className="Label">
        <Link to={`/category/${item.slug}`}>
          {item.tenDanhMuc.toUpperCase()}
        </Link>
      </h3>
      <div className="Dropdown">
        {items.map((item) => {
          return (
            <div className="DropdownGroup" key={uuidv4()}>
              <ul className="Dropdown__Item">
                <h4>
                  {" "}
                  <Link to={`/category/${item?.slug}`}>
                    {item.tenDanhMuc.toUpperCase()}
                  </Link>
                </h4>
              </ul>
              <ul className="Element">
                {item.children.length > 0 &&
                  item.children.map((child) => {
                    return (
                      <li key={uuidv4()}>
                        <Link to={`/category/${child.slug.trim()}`}>
                          {child.tenDanhMuc}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export const MenuComponent = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.DanhMuc);
  useEffect(() => {
    dispatch(Api.fetchCategoryAll());
  }, []);

  return (
    <div className="MenuComponent">
      {items?.map((item) => {
        return (
          <ItemMenu
            key={uuidv4()}
            item={item}
            items={item?.children}
          ></ItemMenu>
        );
      })}
    </div>
  );
};
export default MenuComponent;
