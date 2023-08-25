import React from "../_snowpack/pkg/react.js";
import {BrowserRouter as Router, Route, Routes} from "../_snowpack/pkg/react-router-dom.js";
import ReactDOM from "../_snowpack/pkg/react-dom/client.js";
import App from "./App.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
const root = ReactDOM.createRoot(document.getElementById("recipeNav"));
const Apps = () => {
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/*",
    element: /* @__PURE__ */ React.createElement(App, null)
  })), /* @__PURE__ */ React.createElement(Footer, null));
};
root.render(/* @__PURE__ */ React.createElement(Apps, null));
