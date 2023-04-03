import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { adminRoute } from "~/area/admin/components/routes";
import { publicRoute, privateRoute } from "~/components/routes";
import { DefaultLayout, AdminLayout } from "~/components/layout";
import { Suspense, useEffect, useLayoutEffect } from "react";
import CustomSpin from "~/components/CustomSpin";
import SwiperCore, { Autoplay } from "swiper";
import XacThucSlice, * as XacThucAPi from "./redux/slices/XacThuc";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import NotFound from "./components/commomComponents/NotFound";
import Location from "./components/commomComponents/LocationSelect";
import SelectCustom from "./components/commomComponents/SelectCustom";
function App() {
  SwiperCore.use([Autoplay]);
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

            return (
              <Route
                key={v4()}
                element={
                  // user.role == "1" && user ? (
                  //   <AdminLayout>
                  //     <Suspense fallback={<CustomSpin />}>
                  //       <Page />
                  //     </Suspense>
                  //   </AdminLayout>
                  // ) : (
                  //  <NotFound/>
                  // )
                  <AdminLayout>
                    <Suspense fallback={<CustomSpin />}>
                      <Page />
                    </Suspense>
                  </AdminLayout>
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
                  <Layout>
                    <Location />
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
                  user?.role == 0 || (user?.role == 1 && user) ? (
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
