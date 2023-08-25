import React, {useEffect, useReducer} from "../_snowpack/pkg/react.js";
import {Route, Routes} from "../_snowpack/pkg/react-router-dom.js";
import Nav from "./Nav.js";
import "./App.css.proxy.js";
import RecipePage from "./RecipePage.js";
import RecipeUpload from "./RecipeUpload.js";
import {RecipeContext} from "./context/RecipeContext.js";
import {recipeRefresh} from "./RecipeRefresh.js";
const initialState = {
  recipeData: "",
  displayContent: "",
  recipePhotoData: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "set_Recipe_Data":
      return {...state, recipeData: action.payload};
    case "set_Display_Content":
      return {...state, displayContent: action.payload};
    case "set_Recipe_Photo_Data":
      return {...state, recipePhotoData: action.payload};
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        recipeRefresh(dispatch);
      } catch (error) {
        const data = {error};
        dispatch({type: "set_Recipe_Data", payload: data});
        alert(error);
      }
    }
    ;
    fetchData();
  }, []);
  return /* @__PURE__ */ React.createElement(RecipeContext.Provider, {
    value: {dispatch, state}
  }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement(Nav, null), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/recipeRead",
    element: /* @__PURE__ */ React.createElement(RecipePage, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/recipeUploadForm",
    element: /* @__PURE__ */ React.createElement(RecipeUpload, null)
  }))));
};
export default App;
