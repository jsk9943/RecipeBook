import React, {useContext} from "../_snowpack/pkg/react.js";
import {SERVERURL, PORT} from "./ServerURL.js";
import axios from "../_snowpack/pkg/axios.js";
import {RecipeContext} from "./context/RecipeContext.js";
import "./RecipeContent.css.proxy.js";
import Comment from "./Comment.js";
import {recipeRefresh} from "./RecipeRefresh.js";
const RecipeContent = () => {
  const {dispatch, state} = useContext(RecipeContext);
  const recipeDelete = async (props) => {
    const recipeName = props.recipeData.recipeName;
    const deleteConfirm = window.confirm(`${recipeName} 래시피를 삭제하시겠습니까?`);
    if (!deleteConfirm) {
      return;
    }
    try {
      const recipePassword = window.prompt("삭제하실 레시피의 비밀번호를 입력해주세요");
      const response = await axios.post(`${SERVERURL}:${PORT}/recipe/delete`, {recipeName, recipePassword});
      if (!response.data) {
        alert("패스워드가 불일치 합니다");
        return;
      }
      const deleteResult = await axios.delete(`${SERVERURL}:${PORT}/recipe/delete/${recipeName}`);
      alert(`${deleteResult.data}`);
      recipeRefresh(dispatch);
    } catch (error) {
      alert(`삭제 도중 ${error}가 발생하여 실패`);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "menuDiv"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "menuDetail"
  }, /* @__PURE__ */ React.createElement("div", {
    id: "recipePhotoSize"
  }, /* @__PURE__ */ React.createElement("h2", null, state.recipeData.recipeName), state.recipePhotoData && /* @__PURE__ */ React.createElement("img", {
    src: `data:image/jpeg;base64,${state.recipePhotoData}`,
    alt: state.recipeData.recipeName
  })), /* @__PURE__ */ React.createElement("ol", null, state.recipeData.recipeContents.map((content, index) => /* @__PURE__ */ React.createElement("li", {
    key: index
  }, content))), /* @__PURE__ */ React.createElement("p", null, "작성일자 ", "[", " ", state.recipeData.recipeDate, " ", state.recipeData.recipeTime, " ", "]"), /* @__PURE__ */ React.createElement("input", {
    type: "button",
    value: "삭제",
    onClick: () => {
      recipeDelete(state);
    }
  }), /* @__PURE__ */ React.createElement(Comment, {
    recipeName: state.recipeData.recipeName
  })));
};
export default RecipeContent;
