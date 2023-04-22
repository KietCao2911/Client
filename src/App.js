import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { adminRoute } from "~/area/admin/components/routes";
import { publicRoute, privateRoute } from "~/components/routes";
import { DefaultLayout, AdminLayout } from "~/components/layout";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import CustomSpin from "~/components/CustomSpin";
import SwiperCore, { Autoplay } from "swiper";
import XacThucSlice, * as XacThucAPi from "./redux/slices/XacThuc";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import NotFound from "./components/commomComponents/NotFound";
import Location from "./components/commomComponents/LocationSelect";
import SelectCustom from "./components/commomComponents/SelectCustom";
import AdminAuthLayout from "./components/layout/AdminAuthLayout";
import DangNhap from "./area/admin/components/pages/AuthPage/pages/DangNhap/DangNhap";
import AuthPage from "./area/admin/components/pages/AuthPage";
function App() {
  SwiperCore.use([Autoplay]);
  const [visiabe, setVisiable] = useState(() => {
    const location = window.localStorage.getItem("location");

    return location ? false : true;
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  useLayoutEffect(() => {
    dispatch(XacThucAPi.fetchGetCurrentUser());
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<NotFound />} path={"*"}></Route>
          {adminRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route?.layout || AdminLayout;
            return (
              <Route
                key={v4()}
                element={
                  //  user&&Object.keys(user).length>0 ? (
                  //   <Layout>
                  //     <Suspense fallback={<CustomSpin />}>
                  //       {
                  //         user&&user.role?.some(x=>route?.role?.includes(x?.roleCode?.trim()))?  <Page />:<NotFound/>
                  //       }
                      
                  //     </Suspense>
                  //   </Layout>
                  // ) : (
                  // <NotFound/>
                  // )
                  <Layout>
                    <Suspense fallback={<CustomSpin />}>
                     <Page/>
                    </Suspense>
                  </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
          {publicRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={v4()}
                element={
                  <Layout >
                    <Location visiabe={visiabe}/>
                    <Page />
                  </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
          {privateRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route.layout || DefaultLayout;
            return (
              <Route
                key={v4()}
                element={
                  Object.keys(user).length>0&& user?.role.some(x=>x.roleCode=="USER") ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <NotFound />
                  )
                }
                path={route.path}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
