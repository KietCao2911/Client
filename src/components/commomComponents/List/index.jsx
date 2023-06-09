import convertVND from "~/components/utils/ConvertVND";
import "./List.scss";
const ItemAdd = (props) => {
  const { icon, text } = props;
  return (
    <div className="ItemAdd" {...props}>
      <div className="icon">{icon}</div>
      <p>{text || ""}</p>
    </div>
  );
};

const List = (props) => {
  const { items, onItemClick, AddNewField, labelProps, children } = props;
  const { icon, text, onClick } = AddNewField || {};
  return (
    <div {...props} className="List">
      {AddNewField && <ItemAdd icon={icon} text={text} onClick={onClick} />}
      <div className="ListChildren">
      {children}
      </div>
    </div>
  );
};
export default List;
