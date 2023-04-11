import { Outlet, Route, Routes } from "react-router-dom";
import OrderDetailForm from "./pages/OrderDetailForm";
import TrangChinh from "./pages/TrangChinh";

const QuanTriDonHang = () => {
  return (
    <div>
      <Outlet />
      <Routes>
        <Route element={<TrangChinh />} path=""></Route>
        <Route
          element={<OrderDetailForm isReadOnly={true} />}
          path=":id"
        ></Route>
        <Route
          element={<OrderDetailForm isUpdated={true} />}
          path=":id/chinh-sua"
        ></Route>
        <Route
          element={<OrderDetailForm isCreated={true} />}
          path=":tao-moi"
        ></Route>
                <Route
          element={<OrderDetailForm isReturn={true} />}
          path=":id/tra-hang"
        ></Route>
      </Routes>
    </div>
  );
};

export default QuanTriDonHang;
