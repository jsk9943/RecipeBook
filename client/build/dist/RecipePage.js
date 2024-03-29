import React, {useContext, useState} from "../_snowpack/pkg/react.js";
import {SERVERURL, PORT} from "./ServerURL.js";
import RecipeContents from "./RecipeContents.js";
import RecipeContent from "./RecipeContent.js";
import axios from "../_snowpack/pkg/axios.js";
import "./RecipePage.css.proxy.js";
import topButton from "./icon/topbutton.png.proxy.js";
import {RecipeContext} from "./context/RecipeContext.js";
import {recipeRefresh} from "./RecipeRefresh.js";
const RecipePage = () => {
  const {dispatch, state} = useContext(RecipeContext);
  const [recipeSearchWord, setRecipeSearchWord] = useState();
  const [clicked, setClicked] = useState(false);
  const searchButtonClickEvent = async (event) => {
    event.preventDefault();
    if (recipeSearchWord) {
      try {
        const response = await axios.get(`${SERVERURL}:${PORT}/recipe/search?recipeWord=${recipeSearchWord}`);
        if (Object.keys(response.data).length !== 0) {
          dispatch({type: "set_Recipe_Data", payload: response.data});
          dispatch({type: "set_Display_Content", payload: "RecipeContents"});
        } else {
          alert(`찾을 수 없는 메뉴입니다`);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      recipeRefresh(dispatch);
    }
  };
  const scrollTop = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 300);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("form", {
    onSubmit: searchButtonClickEvent
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "음식이름",
    onChange: (event) => {
      setRecipeSearchWord(event.target.value);
    }
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "검색"
  }), /* @__PURE__ */ React.createElement("input", {
    type: "button",
    value: "전체보기",
    onClick: () => {
      recipeRefresh(dispatch);
    }
  })), state.displayContent === "RecipeContents" ? /* @__PURE__ */ React.createElement(RecipeContents, null) : /* @__PURE__ */ React.createElement(RecipeContent, null), /* @__PURE__ */ React.createElement("div", {
    id: "topButton"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: scrollTop,
    className: clicked ? "clicked-button" : ""
  }, /* @__PURE__ */ React.createElement("img", {
    src: topButton,
    alt: "화면 상단으로"
  }))));
};
export default RecipePage;
