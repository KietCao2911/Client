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
import { BASE_URL } from "./const";
function App() {
  SwiperCore.use([Autoplay]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.XacThuc);
  useEffect(() => {
    const access__token = window.localStorage.getItem("access__token")
    if(access__token)
    {

      dispatch(XacThucAPi.fetchGetCurrentUser());
    }
  }, []);
  useEffect(()=>
{
  const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;

const url = protocol + '//' + hostname + (port ? ':' + port : '');
  const baseAuthHref= url+"/admin/auth/dang-nhap"
  const defaultHref = window.location.href;
  const isLocationChange = baseAuthHref == defaultHref
  if(!isLocationChange)
  {
    window.addEventListener("resize", function() {
      if (window.outerWidth - window.innerWidth > 0) {
        this.window.location.replace("/admin/auth/dang-nhap")
      }
    });
  
  }
},[])

  return (
    <Suspense fallback={<CustomSpin/>}>
       <Router>
      <div className="App">
        <Routes>
          <Route element={<NotFound />} path={"*"}>
          </Route>
          {adminRoute.map((route, index) => {
            const Page = route.element;
            const Layout = route?.layout || AdminLayout;
            return (
              <Route
                key={v4()}
                element={
                   user&&Object.keys(user).length>0&&(user.roleGroup?.trim()=="ADMIN"||user.roleGroup?.trim()=="MANAGER") ? (
                    <Layout>
                      <Suspense fallback={<CustomSpin />}>
                        {
                          user&&user.role?.some(x=>route?.role?.includes(x?.roleCode?.trim())||route?.role[0]=="COMMONS")?  <Page  key={route.key}/>:<NotFound/>
                        }
                      
                      </Suspense>
                    </Layout>
                  ) : (
                  <NotFound/>
                  )
                  // <Layout>
                  //   <Suspense fallback={<CustomSpin />}>
                  //    <Page/>
                  //   </Suspense>
                  // </Layout>
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
                  Object.keys(user).length>0&& user?.roleGroup?.trim()=="USER" ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <NotFound />
                  )
                //   <Layout>
                //   <Page />
                // </Layout>
                }
                path={route.path}
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
    </Suspense>
  );
}

export default App;
