import React, {useContext, useEffect, useMemo, useRef, useState} from "../_snowpack/pkg/react.js";
import {SERVERURL, PORT} from "./ServerURL.js";
import axios from "../_snowpack/pkg/axios.js";
import "./RecipeContents.css.proxy.js";
import {RecipeContext} from "./context/RecipeContext.js";
const RecipeContents = () => {
  const {dispatch, state} = useContext(RecipeContext);
  const [hoveredRecipe, setHoveredRecipe] = useState(null);
  const handleMouseHover = (data) => {
    setHoveredRecipe(data);
  };
  const handleMouseLeave = () => {
    setHoveredRecipe(null);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const recipeKeys = Object.keys(state.recipeData);
  const startIdx = (currentPage - 1) * recipesPerPage;
  const endIdx = startIdx + recipesPerPage;
  const recipesToShow = useMemo(() => recipeKeys.slice(startIdx, endIdx), [recipeKeys, startIdx, endIdx]);
  const recipeClickEvent = async (event) => {
    event.preventDefault();
    const targetElement = event.target;
    let recipeName = "";
    if (targetElement) {
      let readElement = targetElement.querySelector("h2");
      if (!readElement) {
        const closestElement = targetElement.closest(".menu");
        readElement = closestElement.querySelector("h2");
        recipeName = readElement.textContent;
      } else {
        recipeName = readElement.textContent;
      }
    }
    const response = await axios.get(`${SERVERURL}:${PORT}/recipe?recipeName=${recipeName}`);
    if (response.data.success) {
      dispatch({type: "set_Recipe_Data", payload: response.data.data.recipeData});
      dispatch({type: "set_Recipe_Photo_Data", payload: response.data.data.photoData});
      dispatch({type: "set_Display_Content", payload: "RecipeContent"});
    } else {
      console.error(response.data.error);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "menuDiv"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "menuTitle"
  }, /* @__PURE__ */ React.createElement("h4", null, "레시피 제목"), /* @__PURE__ */ React.createElement("h4", null, "레시피 작성일자")), recipesToShow.map((recipeName) => /* @__PURE__ */ React.createElement("div", {
    key: recipeName,
    className: "menu",
    onClick: recipeClickEvent,
    onMouseEnter: () => handleMouseHover(state.recipeData[recipeName].recipeDescription),
    onMouseLeave: handleMouseLeave
  }, /* @__PURE__ */ React.createElement("h2", null, state.recipeData[recipeName].recipeName), /* @__PURE__ */ React.createElement("p", null, state.recipeData[recipeName].recipeDate), /* @__PURE__ */ React.createElement("div", {
    className: "recipeDescriptionContent"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `fade-in-text ${hoveredRecipe === state.recipeData[recipeName].recipeDescription && hoveredRecipe !== "" ? "show" : ""}`
  }, /* @__PURE__ */ React.createElement("p", null, "음식소개"), state.recipeData[recipeName].recipeDescription.length > 30 ? state.recipeData[recipeName].recipeDescription.slice(0, 30) + "..." : state.recipeData[recipeName].recipeDescription)))), /* @__PURE__ */ React.createElement("div", {
    className: "pagination"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => setCurrentPage(currentPage - 1),
    disabled: currentPage === 1
  }, "이전 페이지"), /* @__PURE__ */ React.createElement("div", {
    className: "pageNumbers"
  }, Array.from({length: Math.ceil(Object.keys(state.recipeData).length / recipesPerPage)}, (_, index) => /* @__PURE__ */ React.createElement("button", {
    key: index + 1,
    onClick: () => setCurrentPage(index + 1),
    className: currentPage === index + 1 ? "active" : ""
  }, index + 1))), /* @__PURE__ */ React.createElement("button", {
    onClick: () => setCurrentPage(currentPage + 1),
    disabled: endIdx >= Object.keys(state.recipeData).length
  }, "다음 페이지")));
};
export default RecipeContents;
