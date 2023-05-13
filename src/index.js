import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import "antd/dist/";
import GlobalStyle from "./components/GlobalStyles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-phone-input-2/lib/style.css";
import "swiper/css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import connection, { start } from "./components/utils/SignalR";
import Location from "./components/commomComponents/LocationSelect";
import { useEffect } from "react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStyle>
    <Provider store={store}>
      <App />
    </Provider>
  </GlobalStyle>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
