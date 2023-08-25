import React from "../_snowpack/pkg/react.js";
import "./Header.css.proxy.js";
import {useNavigate} from "../_snowpack/pkg/react-router-dom.js";
const Header = () => {
  const navigate = useNavigate();
  const handleSpanClick = () => {
    navigate("/page");
  };
  return /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("style", null, "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", {
    onClick: handleSpanClick
  }, "Recipe Book")));
};
export default Header;
