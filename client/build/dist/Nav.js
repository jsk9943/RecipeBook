import React, {useContext} from "../_snowpack/pkg/react.js";
import {useNavigate} from "../_snowpack/pkg/react-router-dom.js";
import {RecipeContext} from "./context/RecipeContext.js";
import {recipeRefresh} from "./RecipeRefresh.js";
import "./Nav.css.proxy.js";
const Nav = () => {
  const {dispatch} = useContext(RecipeContext);
  const navigate = useNavigate();
  const recipeReadPage = () => {
    recipeRefresh(dispatch);
    navigate("/recipeRead");
  };
  const recipeUploadFormPage = () => {
    navigate("/recipeUploadForm");
  };
  return /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", {
    onClick: () => {
      recipeReadPage();
    }
  }, "레시피 보기"), /* @__PURE__ */ React.createElement("li", {
    onClick: () => {
      recipeUploadFormPage();
    }
  }, "레시피 등록")));
};
export default Nav;
